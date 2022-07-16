from uuid import uuid4
from sqlalchemy import Column, Boolean, String, TIMESTAMP
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class TenantModel(Base):
    __tablename__ = "tenants"

    id_tenant = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    name = Column(String(150), nullable=False)
    main_color = Column(String(255), nullable=False)
    status = Column(Boolean, default=True)
    email = Column(String(100), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
