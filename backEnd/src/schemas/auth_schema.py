from typing import Optional
from pydantic import BaseModel


class TokenData(BaseModel):
    email: Optional[str] = None


class LoginData(BaseModel):
    email: str
    password: str


class ResponseLogin(BaseModel):
    email: str
    access_token: str
