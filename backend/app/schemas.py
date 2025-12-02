from typing import List, Optional
from pydantic import BaseModel


# ---------- Админ ----------

class AdminLogin(BaseModel):
    password: str


# ---------- Товары ----------

class ProductBase(BaseModel):
    name_uk: str
    description_uk: str
    price: float
    image_url: str
    keywords: str          # ключові слова через кому
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductRead(ProductBase):
    id: int


class ProductUpdate(BaseModel):
    name_uk: Optional[str] = None
    description_uk: Optional[str] = None
    price: Optional[float] = None
    image_url: Optional[str] = None
    keywords: Optional[str] = None
    is_active: Optional[bool] = None


# ---------- Заказы ----------

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: str
    items: List[OrderItemCreate]


class OrderItemRead(BaseModel):
    product_id: int
    quantity: int
    price_at_time: float
    product_name: str


class OrderRead(BaseModel):
    id: int
    customer_name: str
    customer_phone: str
    customer_email: str
    status: str
    items: List[OrderItemRead]
