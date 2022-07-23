from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session

from src.db.settings.config import get_db
from src.exceptions.excepetions import UnauthorizedException, BadRequestException
from src.settings.providers.hash_provider import verify_password
from src.settings.providers.token_provider import create_access_token, decode_token

from src.db.cruds.user_crud import UserCRUD
from src.controllers.base import BaseController
from src.schemas.auth_schema import LoginData, TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class AuthController(BaseController):

    def __init__(self):
        super(AuthController, self).__init__(UserCRUD)

    def handle_login(self, db: Session, login_data: LoginData):
        user = UserCRUD().find_by_user_email(db=db, email=login_data.email)
        if not user or not verify_password(login_data.password, user.password):
            raise BadRequestException(detail='email or password invalid!')
        token = create_access_token({'sub': user.email})

        return {'username': user.password, 'access_token': token}

    def get_current_user(self,
                         token: str = Depends(oauth2_scheme),
                         db: Session = Depends(get_db)
                         ):
        exception = UnauthorizedException(detail="Could not validate credentials")
        try:
            user_email: str = decode_token(token=token)

            if user_email is None:
                raise exception
            token_data = TokenData(username=user_email)
        except JWTError:
            raise exception
        user = UserCRUD().find_by_user_email(db=db, email=token_data.email)
        if user is None:
            raise exception
        return user
