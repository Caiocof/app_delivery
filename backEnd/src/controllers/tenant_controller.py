from src.controllers.base import BaseController
from src.db.cruds.tenant_crud import TenantCRUD


class TenantController(BaseController):

    def __init__(self):
        super(TenantController, self).__init__(TenantCRUD)
