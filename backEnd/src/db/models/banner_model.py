from uuid import uuid4
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class BannerModel(Base):
    __tablename__ = "banners"

    id_banner = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    tenant = Column(GUID(),
                    ForeignKey('tenants.id_tenant', name='fk_tenant_banner'),
                    nullable=False)
    img = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
