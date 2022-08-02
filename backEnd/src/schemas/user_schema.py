from typing import Optional
from pydantic import BaseModel, EmailStr
from uuid import UUID


class UserBase(BaseModel):
    name: str
    email: EmailStr
    username: str
    password: str

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    username: Optional[str]

    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    username: str

    class Config:
        orm_mode = True
