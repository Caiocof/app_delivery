from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from src.db.settings.config import get_db
from src.schemas.user_schema import (
    UserBase,
    UserResponse
)
from src.controllers.user_controller import UserController

user_router = APIRouter(prefix='/user', tags=['Users'])


@user_router.get('', response_model=List[UserResponse])
def handle_get_all_users(db: Session = Depends(get_db)):
    """
    Return all users from database
    """
    return UserController().handle_list(db)


@user_router.get('/{user_id}', response_model=UserResponse)
def handle_get_user(user_id: UUID, db: Session = Depends(get_db)):
    """
    This route return the user data by UUID.
    """
    return UserController().handle_get(db, user_id)


@user_router.post('', response_model=UserBase, status_code=201)
def handle_create_user(data: UserBase, db: Session = Depends(get_db)):
    """
    This route is used do create a new user.
    """
    return UserController().handle_create(db, data)


@user_router.delete('/{user_id}', status_code=204, response_class=Response)
def handle_delete_user(user_id: UUID, db: Session = Depends(get_db)):
    """
    Delete a User by ID
    """
    return UserController().handle_delete(db, user_id)


@user_router.patch('/{user_id}', status_code=204, response_class=Response)
def handle_patch_user(data: UserBase, user_id: UUID, db: Session = Depends(get_db)):
    """
    Update values from a User
    """
    return UserController().handle_patch(db, user_id, data)
