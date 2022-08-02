from typing import Any, Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID


class Colors(BaseModel):
    primary: str = '#FB9400'
    secondary: str = '#FFF9F2'


class TenantBase(BaseModel):
    name: str
    document: str
    main_color: Colors
    status: bool
    email: EmailStr
    password: str

    class Config:
        orm_mode = True


class TenantResponse(BaseModel):
    id: UUID
    name: str
    document: str
    main_color: Any
    status: bool
    email: EmailStr

    class Config:
        orm_mode = True


class TenantUpdate(BaseModel):
    name: Optional[str]
    document: Optional[str]
    main_color: Optional[Colors]
    status: Optional[bool]
    email: Optional[EmailStr]

    class Config:
        orm_mode = True
