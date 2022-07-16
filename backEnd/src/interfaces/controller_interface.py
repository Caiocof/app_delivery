from abc import ABC, abstractmethod

from sqlalchemy.orm import Session
from typing import Any


class BaseInterfaceController(ABC):

    @staticmethod
    @abstractmethod
    def handle_create(db: Session, data: Any):
        pass

    @staticmethod
    @abstractmethod
    def handle_get(db: Session, object_id: Any):
        pass

    @staticmethod
    @abstractmethod
    def handle_list(db: Session):
        pass

    @staticmethod
    @abstractmethod
    def handle_delete(db: Session, object_id: Any):
        pass

    @staticmethod
    @abstractmethod
    def handle_patch(db: Session, object_id: Any, data: Any):
        pass
