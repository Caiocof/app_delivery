from uuid import uuid4
from sqlalchemy import Column, ForeignKey, String, TIMESTAMP
from sqlalchemy.sql import func

from src.db.settings.config import Base, GUID


class UserAddressModel(Base):
    __tablename__ = "user_addresses"

    id_address = Column(GUID(), primary_key=True, unique=True, default=uuid4, index=True)
    id_user = Column(GUID(),
                     ForeignKey('users.id', name='fk_user_address'),
                     nullable=False)
    id_district = Column(GUID(),
                         ForeignKey('districts.id', name='fk_district_address'),
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
