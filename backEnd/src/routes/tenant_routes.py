from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from src.db.settings.config import get_db
from src.schemas.tenant_schema import (
    TenantBase,
    TenantResponse
)
from src.controllers.tenant_controller import TenantController

tenant_router = APIRouter(prefix='/tenant', tags=['Tenants'])


@tenant_router.get('', response_model=List[TenantResponse])
def handle_get_all_tenants(db: Session = Depends(get_db)):
    """
    Return all tenants from database
    """
    return TenantController().handle_list(db=db)


@tenant_router.get('/{tenant_id}', response_model=TenantResponse)
def handle_get_tenant(tenant_id: UUID, db: Session = Depends(get_db)):
    """
    This route return the tenant data by UUID.
    """
    return TenantController().handle_get(db=db, object_id=tenant_id)


@tenant_router.post('', response_model=TenantBase, status_code=201)
def handle_create_tenant(tenant_data: TenantBase, db: Session = Depends(get_db)):
    """
    This route is used do create a new tenant.
    """
    return TenantController().handle_create(db=db, data=tenant_data)


@tenant_router.delete('/{tenant_id}', status_code=204, response_class=Response)
def handle_delete_tenant(tenant_id: UUID, db: Session = Depends(get_db)):
    """
    Delete a Tenant by ID
    """
    return TenantController().handle_delete(db=db, object_id=tenant_id)


@tenant_router.patch('/{tenant_id}', status_code=204, response_class=Response)
def handle_patch_tenant(tenant_data: TenantBase,
                        tenant_id: UUID,
                        db: Session = Depends(get_db)
                        ):
    """
    Update values from a Tenant
    """
    return TenantController().handle_patch(db=db, object_id=tenant_id, data=tenant_data)
