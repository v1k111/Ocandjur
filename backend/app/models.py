from typing import Optional, List

from sqlmodel import SQLModel, Field, Relationship


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str
    role: str = "admin"  # "admin" / "customer"


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    # українські поля для вітрини
    name_uk: str
    description_uk: str

    price: float
    image_url: str
    keywords: str  # ключові слова через кому
    is_active: bool = True

    order_items: List["OrderItem"] = Relationship(back_populates="product")


class Order(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    customer_name: str
    customer_phone: str
    customer_email: str
    status: str = "created"  # created | sent | paid

    items: List["OrderItem"] = Relationship(back_populates="order")


class OrderItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    order_id: int = Field(foreign_key="order.id")
    product_id: int = Field(foreign_key="product.id")
    quantity: int
    price_at_time: float

    order: Optional[Order] = Relationship(back_populates="items")
    product: Optional[Product] = Relationship(back_populates="order_items")
