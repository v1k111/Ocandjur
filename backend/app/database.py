from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = "sqlite:///./ocandjur.db"

# echo=True чтобы видеть SQL в логах; можно поставить False в проде
engine = create_engine(DATABASE_URL, echo=True)


def init_db() -> None:
    """Создать все таблицы, если их ещё нет."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Зависимость FastAPI: выдаёт Session для каждого запроса."""
    with Session(engine) as session:
        yield session
