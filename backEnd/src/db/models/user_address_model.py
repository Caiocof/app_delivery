from uuid import uuid4
from sqlalchemy import Column, ForeignKey, String, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from src.db.settings.config import Base


class UserAddressModel(Base):
    __tablename__ = "user_addresses"

    id_address = Column(UUID(as_uuid=True),
                        primary_key=True,
                        unique=True,
                        default=uuid4,
                        index=True)
    user = Column(UUID(as_uuid=True),
                  ForeignKey('users.id_user', name='fk_user_address'),
                  nullable=False)
    district = Column(UUID(as_uuid=True),
                      ForeignKey('districts.id_district', name='fk_district_address'),
                      nullable=False)
    street = Column(String(150), nullable=False)
    street_number = Column(String(10), nullable=True)
    zipcode = Column(String(10), nullable=True)
    city = Column(String(120), nullable=False)
    state = Column(String(2), nullable=False)
    complement = Column(String(100), nullable=True)
    created_at = Column(TIMESTAMP,
                        server_default=func.now(),
                        onupdate=func.current_timestamp()
                        )
