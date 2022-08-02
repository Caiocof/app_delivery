from uuid import uuid4
from sqlalchemy import Column, Integer, Float, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from src.db.settings.config import Base


class OrderProductsModel(Base):
    __tablename__ = "order_products"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                unique=True,
                default=uuid4,
                index=True)
    order = Column(UUID(as_uuid=True),
                   ForeignKey('orders.id', name='fk_order_order_product'),
                   nullable=False)
    product = Column(UUID(as_uuid=True),
                     ForeignKey('products.id', name='fk_product_order_product'),
                     nullable=False)
    product_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
