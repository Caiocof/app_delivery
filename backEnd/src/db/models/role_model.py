from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class RoleModel(Base):
    __tablename__ = "roles"

    id_role = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    name = Column(String(30), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
