from uuid import uuid4
from sqlalchemy import Column, Boolean, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB

from src.db.settings.config import Base


class TenantModel(Base):
    __tablename__ = "tenants"

    id_tenant = Column(UUID(as_uuid=True), primary_key=True, unique=True, default=uuid4, index=True)
    name = Column(String(150), nullable=False)
    document = Column(String(15), unique=True, nullable=False)
    main_color = Column(JSONB, nullable=False)
    status = Column(Boolean, default=True)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
