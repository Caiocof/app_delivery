from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.db.models.models import Base
from src.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSession()
        yield db
    finally:
        db.close()


def get_first_object(client_test: TestClient, endpoint: str):
    response_all = client_test.get(endpoint)
    assert response_all.status_code == 200

    array = list(response_all.json())
    return array[0] if len(array) > 0 else None


client = TestClient(app)
