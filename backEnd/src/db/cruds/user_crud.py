from sqlalchemy.orm import Session

from src.db.cruds.base import BaseCRUD
from src.db.models.user_model import UserModel


class UserCRUD(BaseCRUD):

    def __init__(self):
        super().__init__(UserModel)

    def find_by_user_name(self, db: Session, user_name: str):
        # user = db.query(AuthModel).filter_by(username=user_name).first()
        # return user
        pass
