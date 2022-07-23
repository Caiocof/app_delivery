from sqlalchemy.orm import Session

from src.db.cruds.base import BaseCRUD
from src.db.models.user_model import UserModel


class UserCRUD(BaseCRUD):

    def __init__(self):
        super().__init__(UserModel)

    def find_by_user_email(self, db: Session, email: str) -> UserModel:
        user = db.query(UserModel).filter_by(email=email).first()
        return user
