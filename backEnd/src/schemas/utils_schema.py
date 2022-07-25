from pydantic import BaseModel


class ValidateDocs(BaseModel):
    type_doc: str
    number: str
