from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class ProductCategoriesModel(Base):
    __tablename__ = "product_categories"

    id_product_categories = Column(GUID(),
                                   primary_key=True,
                                   unique=True,
                                   default=uuid4,
                                   index=True)
    tenant = Column(GUID(),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_product_categories'),
                    nullable=False)
    name = Column(String(150), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
