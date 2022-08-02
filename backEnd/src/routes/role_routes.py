from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from src.db.settings.config import get_db
from src.schemas.role_schema import RoleResponse
from src.controllers.role_controller import RoleController

role_router = APIRouter(prefix='/roles', tags=['Roles'])


@role_router.get('', response_model=List[RoleResponse])
def handle_get_all_roles(db: Session = Depends(get_db)):
    """
    Return all roles from database
    """
    return RoleController().handle_list(db=db)


@role_router.get('/{role_id}', response_model=RoleResponse)
def handle_get_user(role_id: UUID, db: Session = Depends(get_db)):
    """
    This route return the role data by UUID.
    """
    return RoleController().handle_get(db=db, object_id=role_id)
