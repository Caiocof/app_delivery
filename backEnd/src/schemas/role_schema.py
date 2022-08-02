from pydantic import BaseModel, EmailStr
from uuid import UUID


class RoleBase(BaseModel):
    name: str

    class Config:
        orm_mode = True


class RoleResponse(BaseModel):
    id: UUID
    name: str

    class Config:
        orm_mode = True
