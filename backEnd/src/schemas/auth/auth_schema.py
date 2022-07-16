from typing import Optional
from pydantic import BaseModel


class TokenData(BaseModel):
    username: Optional[str] = None


class LoginData(BaseModel):
    username: str
    password: str


class ResponseLogin(BaseModel):
    username: str
    access_token: str
