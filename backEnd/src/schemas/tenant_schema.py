from pydantic import BaseModel, EmailStr


class Colors(BaseModel):
    primary: str
    secondary: str


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
    name: str
    document: str
    main_color: str
    status: bool
    email: EmailStr

    class Config:
        orm_mode = True


class TenantUpdate(BaseModel):
    name: str
    document: str
    main_color: Colors
    status: bool
    email: EmailStr

    class Config:
        orm_mode = True
