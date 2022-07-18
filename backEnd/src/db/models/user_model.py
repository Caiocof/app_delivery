from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class UserModel(Base):
    __tablename__ = "users"

    id_user = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    tenant = Column(GUID(),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_user'),
                    nullable=False)
    role = Column(GUID(),
                  ForeignKey('roles.id_role', name='fk_role_user'),
                  nullable=False)
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
