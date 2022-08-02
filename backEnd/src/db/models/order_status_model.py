import enum
from uuid import uuid4
from sqlalchemy import Column, TIMESTAMP, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from src.db.settings.config import Base


class StateOrderEnum(enum.Enum):
    PREPARING = 'preparing'
    CANCELED = 'canceled'
    SEND = 'send'
    DELIVERED = 'delivered'


class OrderStatusesModel(Base):
    __tablename__ = "order_statuses"

    id = Column(UUID(as_uuid=True),
                primary_key=True,
                unique=True,
                default=uuid4,
                index=True)
    order = Column(UUID(as_uuid=True),
                   ForeignKey('orders.id', name='fk_order_order_status'),
                   nullable=False)
    status = Column(Enum(StateOrderEnum), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
