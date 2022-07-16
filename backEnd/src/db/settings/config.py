import os
import uuid
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import TypeDecorator, CHAR

from src.settings.settings import BASE_DIR

load_dotenv(os.path.join(BASE_DIR, '../.env'))


def get_db_uri():
    _driver = os.getenv("DB_DRIVER")
    _user = os.getenv("POSTGRES_USER")
    _password = os.getenv("POSTGRES_PASSWORD")
    _host = os.getenv("POSTGRES_HOST")
    _database = os.getenv("POSTGRES_DB")
    return f'{_driver}://{_user}:{_password}@{_host}/{_database}'


DB_URI = get_db_uri()
engine = create_engine(DB_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class GUID(TypeDecorator):
    """Platform-independent GUID type.
    Uses PostgreSQL's UUID type, otherwise uses
    CHAR(32), storing as stringified hex values.
    """

    def process_literal_param(self, value, dialect):
        pass

    @property
    def python_type(self):
        pass

    impl = CHAR
    cache_ok = False

    def load_dialect_impl(self, dialect):
        if dialect.name == 'postgresql':
            return dialect.type_descriptor(UUID())
        else:
            return dialect.type_descriptor(CHAR(32))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == 'postgresql':
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return "%.32x" % uuid.UUID(value).int
            else:
                # hexstring
                return "%.32x" % value.int

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        else:
            if not isinstance(value, uuid.UUID):
                value = uuid.UUID(value)
            return value
