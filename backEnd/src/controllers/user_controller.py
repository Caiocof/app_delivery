from src.controllers.base import BaseController
from src.db.cruds.user_crud import UserCRUD


class UserController(BaseController):

    def __init__(self):
        super(UserController, self).__init__(UserCRUD)
