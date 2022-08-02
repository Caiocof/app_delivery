from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from src.db.settings.config import Base


class ProductCategoriesModel(Base):
    __tablename__ = "product_categories"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                unique=True,
                default=uuid4,
                index=True)
    tenant = Column(UUID(as_uuid=True),
                    ForeignKey('tenants.id', name='fk_tenant_product_categories'),
                    nullable=False)
    name = Column(String(150), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
