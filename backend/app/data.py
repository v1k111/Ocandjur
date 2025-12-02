from .models import Product

PRODUCTS = [
    Product(
        id=1,
        name="Свічка «Нічна Лаванда»",
        description="Глибокий розслаблюючий аромат лаванди з теплими дерев'яними нотами.",
        price=790.0,
        image="/src/assets/candle1.jpg",
        keywords=["лаванда", "ніч", "розслаблення", "ароматична свічка"],
    ),
    Product(
        id=2,
        name="Свічка «Ванільний Вогонь»",
        description="Солодка ваніль з легкою карамеллю та спеціями.",
        price=890.0,
        image="/src/assets/candle2.jpg",
        keywords=["ваніль", "солодкий", "затишок", "ароматична свічка"],
    ),
    Product(
        id=3,
        name="Свічка «Цитрусовий Світанок»",
        description="Свіжий цитрусовий аромат з нотами апельсина та бергамоту.",
        price=850.0,
        image="/src/assets/candle3.jpg",
        keywords=["цитрус", "апельсин", "свіжість", "ранок"],
    ),
]
