from abc import ABC, abstractmethod

from typing import Any
from sqlalchemy.orm import Session


class BaseInterfaceCRUD(ABC):

    @abstractmethod
    def create(self, db: Session, data: Any):
        pass

    @abstractmethod
    def get(self, db: Session, **data):
        pass

    @abstractmethod
    def list(self, db: Session):
        pass

    @abstractmethod
    def patch(self, db: Session, id: Any, data: Any):
        pass

    @abstractmethod
    def delete(self, db: Session, data: Any):
        pass
