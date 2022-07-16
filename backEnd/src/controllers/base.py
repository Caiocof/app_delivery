from fastapi import HTTPException
from sqlalchemy.orm import Session
from typing import Any

from src.interfaces.controller_interface import BaseInterfaceController


class BaseController(BaseInterfaceController):

    def __init__(self, crud_class: Any):
        self.crud_class = crud_class

    def handle_create(self, db: Session, data: Any, commit=True):
        return self.crud_class().create(db, data, commit)

    def handle_get(self, db: Session, object_id: Any):
        object_instance = self.crud_class().get(db, id=object_id)
        if object_instance is None:
            raise HTTPException(
                status_code=404,
                detail={'message': 'resource not found'}
            )
        return object_instance

    def handle_list(self, db: Session):
        return self.crud_class().list(db)

    def handle_delete(self, db: Session, object_id: Any, commit=True):
        db_customer = self.crud_class().get(db, id=object_id)

        if db_customer is None:
            raise HTTPException(
                status_code=404,
                detail={'message': 'resource not found'}
            )

        return self.crud_class().delete(db, object_id, commit)

    def handle_patch(self, db: Session, object_id: Any, data: Any, commit=True):
        db_customer = self.crud_class().get(db, id=object_id)

        if db_customer is None:
            raise HTTPException(
                status_code=404,
                detail={'message': 'resource not found'}
            )

        return self.crud_class().patch(db, object_id, data, commit)
