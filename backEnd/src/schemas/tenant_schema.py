from pydantic import BaseModel


class TenantColors(BaseModel):
    primary: str
    secondary: str


class TenantBase(BaseModel):
    name: str
    mainColor: {TenantColors}
    status: bool
    email: str
    password: str

    class Config:
        orm_mode = True


class TenantResponse(BaseModel):
    name: str
    mainColor: {TenantColors}
    status: bool
    email: str

    class Config:
        orm_mode = True
