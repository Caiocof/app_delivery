import re
from typing import Union
from uuid import UUID
from sqlalchemy.orm import Session

from src.shared.utils import UtilService
from src.shared.providers import hash_provider
from src.exceptions.excepetions import BadRequestException, NotFoundException

from src.controllers.base import BaseController
from src.db.cruds.user_crud import UserCRUD
from src.schemas.user_schema import UserBase, UserUpdate


class UserController(BaseController):

    def __init__(self):
        super(UserController, self).__init__(UserCRUD)

    # def __clean_form(self, data: Union[UserBase, UserUpdate]):
    #     new_form = UtilService.remove_none_in_form(data)
    #
    #
    #
    #     return new_form
    #
    # def handle_create(self, db: Session, data: UserBase, commit=True):
    #     new_data = UserController.__clean_form(self, data=data)
    #     new_data['password'] = hash_provider.get_password_hash(data.password)
    #     new_data['main_color'] = {
    #         'primary': data.main_color.primary,
    #         'secondary': data.main_color.secondary
    #     }
    #     return self.crud_class().create(db=db, data=new_data, commit=commit)
    #
    # def handle_patch(self, db: Session, object_id: UUID, data: UserUpdate, commit=True):
    #     tenant = self.crud_class().get(db=db, id=object_id)
    #
    #     if tenant is None:
    #         raise NotFoundException('Tenant not Found')
    #
    #     new_data = UserController.__clean_form(self, data=data)
    #
    #     return self.crud_class().patch(db=db, object_id=object_id, data=new_data, commit=commit)
