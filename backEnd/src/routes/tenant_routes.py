from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from typing import List

from src.db.settings.config import get_db
from src.schemas.tenant_schema import (
    TenantBase,
    TenantResponse
)
from src.controllers.customer_controller import CustomerController

customer_router = APIRouter(prefix='/customer')


@customer_router.get('/', response_model=List[CustomerListResponse])
def handle_get_all_customers(db: Session = Depends(get_db)):
    """
    Return all customers from database
    """
    return CustomerController().handle_list(db)


@customer_router.get('/{customer_id}', response_model=CustomerResponse)
def handle_get_customer(customer_id: str, db: Session = Depends(get_db)):
    """
    This route return the customer data by the custumer's UUID.
    """
    return CustomerController().handle_get(db, customer_id)


@customer_router.post('/', response_model=CustomerBase, status_code=201)
def handle_create_customer(data: CustomerCreate, db: Session = Depends(get_db)):
    """
    This route is used do create a new customer
    """
    return CustomerController().handle_create(db, data)


@customer_router.delete(
    '/{customer_id}',
    status_code=204,
    response_class=Response
)
def handle_delete_customer(customer_id: str, db: Session = Depends(get_db)):
    """
    Delete a customer by ID
    """
    return CustomerController().handle_delete(db, customer_id)


@customer_router.patch(
    '/{customer_id}',
    status_code=204,
    response_class=Response
)
def handle_patch_customer(
    data: CustomerCreate,
    customer_id: str,
    db: Session = Depends(get_db)
):
    """
    Update values from a customer
    """
    return CustomerController().handle_patch(db, customer_id, data)
