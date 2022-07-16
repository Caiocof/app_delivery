from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class UserModel(Base):
    __tablename__ = "users"

    id_user = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
