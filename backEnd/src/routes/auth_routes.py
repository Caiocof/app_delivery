from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from src.db.settings.config import get_db
from src.controllers.auth_controller import AuthController
from src.schemas.auth_schema import ResponseLogin, LoginData
from src.schemas.user_schema import UserResponse

auth_router = APIRouter()


@auth_router.post('/signin', status_code=status.HTTP_200_OK, response_model=ResponseLogin)
async def signin(user_name: LoginData, db: Session = Depends(get_db)):
    return AuthController().handle_login(db=db, user_data=user_name)


@auth_router.get("/user/me")
async def read_user_me(
    current_user: UserResponse = Depends(AuthController().get_current_user)
):
    return current_user
