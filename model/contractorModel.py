from repository import database
from sqlalchemy import Column, String, Integer

class ContractorModel(database.Base):
    
    __tablename__="contractor"
    
    id: int = Column(Integer, primary_key=True,index=True, autoincrement=True)
    first_name: str = Column(String, index=True, nullable=False)
    last_name: str = Column(String, index=True, nullable=False)
    nin: str = Column(String, index=True, nullable=False, unique=True)
    email: str = Column(String,index=True,nullable=False, unique=True)
    
    class Config:
        orm_mode: True