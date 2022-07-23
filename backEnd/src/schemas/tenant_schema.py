from pydantic import BaseModel


class Colors(BaseModel):
    primary: str
    secondary: str


class TenantBase(BaseModel):
    name: str
    document: str
    main_color: Colors
    status: bool
    email: str
    password: str

    class Config:
        orm_mode = True


class TenantResponse(BaseModel):
    name: str
    document: str
    main_color: str
    status: bool
    email: str

    class Config:
        orm_mode = True
