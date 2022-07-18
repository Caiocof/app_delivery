from uuid import uuid4
from sqlalchemy import Column, ForeignKey, String, TIMESTAMP, Float
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class DistrictModel(Base):
    __tablename__ = "districts"

    id_district = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    tenant = Column(GUID(),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_district'),
                    nullable=False)
    name = Column(String(100), nullable=False)
    price_shipping = Column(Float, nullable=True)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
