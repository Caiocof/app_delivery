import enum
from uuid import uuid4
from sqlalchemy import Column, String, Float, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from src.db.settings.config import Base


class StateOrderEnum(enum.Enum):
    PREPARING = 'preparing'
    CANCELED = 'canceled'
    SEND = 'send'
    DELIVERED = 'delivered'


class OrdersModel(Base):
    __tablename__ = "orders"

    id_order = Column(UUID(as_uuid=True),
                      primary_key=True,
                      unique=True,
                      default=uuid4,
                      index=True)
    user = Column(UUID(as_uuid=True),
                  ForeignKey('users.id_user', name='fk_user_orders'),
                  nullable=False)
    tenant = Column(UUID(as_uuid=True),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_orders'),
                    nullable=False)
    address = Column(UUID(as_uuid=True),
                     ForeignKey('user_addresses.id_address', name='fk_address_orders'),
                     nullable=False)
    status = Column(Enum(StateOrderEnum), nullable=False)
    payment_method = Column(String(6), nullable=False)
    payment_money_return = Column(Float, nullable=True)
    delivery_price = Column(Float, nullable=False)
    subtotal = Column(Float, nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
