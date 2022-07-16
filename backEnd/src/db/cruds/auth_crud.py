from sqlalchemy.orm import Session

from src.db.cruds.base import BaseCRUD
from src.db.models.auth_model import AuthModel


class AuthCRUD(BaseCRUD):

    def __init__(self):
        super().__init__(AuthModel)

    def find_by_user_name(self, db: Session, user_name: str) -> AuthModel:
        user = db.query(AuthModel).filter_by(username=user_name).first()
        return user
