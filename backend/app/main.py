from typing import List

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select, Session

from .database import init_db, get_session
from .models import Product, Order, OrderItem
from .schemas import (
    ProductCreate,
    ProductRead,
    ProductUpdate,
    OrderCreate,
    OrderRead,
    OrderItemRead,
    AdminLogin,
)
from .deps import get_admin, ADMIN_TOKEN

app = FastAPI(title="Ocandjur API")

# создаём таблицы при старте приложения
init_db()

# CORS для фронта Vite
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


# ---------- Аутентификация администратора ----------

@app.post("/auth/admin-login")
def admin_login(payload: AdminLogin):
    # простой вариант: один жёстко заданный пароль и токен
    if payload.password != "ocandjur-admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Bad credentials",
        )
    return {"token": ADMIN_TOKEN}


# ---------- Публичные эндпоинты (витрина магазина) ----------

@app.get("/products", response_model=List[ProductRead])
def list_products(session: Session = Depends(get_session)):
    products = session.exec(
        select(Product).where(Product.is_active == True)  # noqa: E712
    ).all()
    return products


@app.get("/products/{product_id}", response_model=ProductRead)
def get_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product or not product.is_active:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/orders", response_model=OrderRead)
def create_order(payload: OrderCreate, session: Session = Depends(get_session)):
    # создаём сам заказ
    order = Order(
        customer_name=payload.customer_name,
        customer_phone=payload.customer_phone,
        customer_email=payload.customer_email,
        status="created",
    )
    session.add(order)
    session.commit()
    session.refresh(order)

    items_read: list[OrderItemRead] = []

    # добавляем позиции заказа
    for item in payload.items:
        product = session.get(Product, item.product_id)
        if not product or not product.is_active:
            raise HTTPException(
                status_code=400,
                detail=f"Bad product {item.product_id}",
            )
        oi = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            price_at_time=product.price,
        )
        session.add(oi)
        items_read.append(
            OrderItemRead(
                product_id=product.id,
                quantity=item.quantity,
                price_at_time=product.price,
                product_name=product.name_uk,
            )
        )

    session.commit()

    return OrderRead(
        id=order.id,
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        customer_email=order.customer_email,
        status=order.status,
        items=items_read,
    )


# ---------- Админские эндпоинты (требуют токен) ----------

@app.get("/admin/products", response_model=List[ProductRead])
def admin_list_products(
    session: Session = Depends(get_session),
    admin=Depends(get_admin),
):
    """Список всех свічок для адмін‑панелі."""
    products = session.exec(select(Product)).all()
    return products


@app.get("/admin/orders", response_model=List[OrderRead])
def admin_list_orders(
    status_filter: str | None = None,
    session: Session = Depends(get_session),
    admin=Depends(get_admin),
):
    query = select(Order)
    if status_filter:
        query = query.where(Order.status == status_filter)

    orders = session.exec(query).all()

    result: list[OrderRead] = []
    for o in orders:
        items = [
            OrderItemRead(
                product_id=oi.product_id,
                quantity=oi.quantity,
                price_at_time=oi.price_at_time,
                product_name=oi.product.name_uk if oi.product else "",
            )
            for oi in o.items
        ]
        result.append(
            OrderRead(
                id=o.id,
                customer_name=o.customer_name,
                customer_phone=o.customer_phone,
                customer_email=o.customer_email,
                status=o.status,
                items=items,
            )
        )
    return result


@app.patch("/admin/orders/{order_id}", response_model=OrderRead)
def admin_update_order_status(
    order_id: int,
    new_status: str,
    session: Session = Depends(get_session),
    admin=Depends(get_admin),
):
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = new_status
    session.add(order)
    session.commit()
    session.refresh(order)

    items = [
        OrderItemRead(
            product_id=oi.product_id,
            quantity=oi.quantity,
            price_at_time=oi.price_at_time,
            product_name=oi.product.name_uk if oi.product else "",
        )
        for oi in order.items
    ]

    return OrderRead(
        id=order.id,
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        customer_email=order.customer_email,
        status=order.status,
        items=items,
    )


@app.post("/admin/products", response_model=ProductRead)
def admin_create_product(
    payload: ProductCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_admin),
):
    product = Product(**payload.dict())
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@app.patch("/admin/products/{product_id}", response_model=ProductRead)
def admin_update_product(
    product_id: int,
    payload: ProductUpdate,
    session: Session = Depends(get_session),
    admin=Depends(get_admin),
):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    data = payload.dict(exclude_unset=True)
    for k, v in data.items():
        setattr(product, k, v)

    session.add(product)
    session.commit()
    session.refresh(product)
    return product
