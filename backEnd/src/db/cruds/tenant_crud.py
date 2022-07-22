from src.db.cruds.base import BaseCRUD
from src.db.models.tenant_model import TenantModel


class TenantCRUD(BaseCRUD):
    def __init__(self):
        super(TenantCRUD, self).__init__(TenantModel)
