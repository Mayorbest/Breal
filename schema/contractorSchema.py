from pydantic import BaseModel

class ContractorSchema(BaseModel):
    first_name: str
    last_name: str
    nin: str
    email: str