from typing import Optional
from pydantic import BaseModel


class ExampleBase(BaseModel):
    id: int
    name: str
    description: Optional[str] = None

    class Config:
        orm_mode = True
