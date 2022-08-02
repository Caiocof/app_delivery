from src.db.cruds.base import BaseCRUD
from src.db.models.role_model import RoleModel


class RoleCRUD(BaseCRUD):

    def __init__(self):
        super().__init__(RoleModel)
