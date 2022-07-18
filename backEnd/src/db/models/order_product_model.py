from uuid import uuid4
from sqlalchemy import Column, Integer, Float, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class OrderProductsModel(Base):
    __tablename__ = "order_products"

    id_order_product = Column(GUID(),
                              primary_key=True,
                              unique=True,
                              default=uuid4,
                              index=True)
    order = Column(GUID(),
                   ForeignKey('orders.id_order', name='fk_order_order_product'),
                   nullable=False)
    product = Column(GUID(),
                     ForeignKey('products.id_product', name='fk_product_order_product'),
                     nullable=False)
    product_price = Column(Float, nullable=False)
    quantity = Column(Integer, nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
