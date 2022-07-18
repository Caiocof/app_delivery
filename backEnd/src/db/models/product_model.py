from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Text, Float
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class ProductModel(Base):
    __tablename__ = "products"

    id_product = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    tenant = Column(GUID(),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_product'),
                    nullable=False)
    category = Column(GUID(),
                      ForeignKey('product_categories.id_product_categories',
                                 name='fk_category_product'),
                      nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    img = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
