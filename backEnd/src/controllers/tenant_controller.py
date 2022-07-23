from sqlalchemy.orm import Session
from src.controllers.base import BaseController
from src.db.cruds.tenant_crud import TenantCRUD
from src.schemas.tenant_schema import TenantBase


class TenantController(BaseController):

    def __init__(self):
        super(TenantController, self).__init__(TenantCRUD)

    def handle_create(self, db: Session, data: TenantBase, commit=True):
        return self.crud_class().create(db, data, commit)
