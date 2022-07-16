from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    email: str
    username: str
    password: str

    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    name: str
    email: str
    username: str

    class Config:
        orm_mode = True
