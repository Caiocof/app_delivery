from typing import Any
from sqlalchemy import update
from sqlalchemy.orm import Session

from src.interfaces.crud_interface import BaseInterfaceCRUD


class BaseCRUD(BaseInterfaceCRUD):

    def __init__(self, model: Any):
        self.model = model

    def create(self, db: Session, data: Any, commit=True):
        db_object = self.model(**dict(data))
        db.add(db_object)
        if commit:
            db.commit()
            db.refresh(db_object)
        return db_object

    def get(self, db: Session, **data):
        db_customer = db.query(self.model).filter_by(**data).first()
        return db_customer

    def list(self, db: Session, skip: int = 0, limit: int = 10):
        records = db.query(self.model).offset(skip).limit(limit).all()
        return records

    def patch(self, db: Session, object_id: Any, data: Any, commit=True):
        db.execute(
            update(self.model).where(
                self.model.id == object_id
            ).values(**dict(data))
        )
        if commit:
            db.commit()
        return

    def delete(self, db: Session, object_id: Any, commit=True):
        object_instance = db.query(self.model).filter(
            self.model.id == object_id
        ).first()
        db.delete(object_instance)
        if commit:
            db.commit()
        return
