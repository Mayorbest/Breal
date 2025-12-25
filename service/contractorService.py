from fastapi import HTTPException, status
import requests
import dotenv
import os
from model import contractorModel
from repository import database

dotenv.load_dotenv()
NIN_BASE_URL = os.getenv("NIN_VERIFICATION_BASE_URL")
NIN_API_KEY = os.getenv("NIN_ACCESS_API_KEY")

contractorModel.database.Base.metadata.create_all(database.engine)

def addContractorToDatabase(data,db):
    contractor_data = db.query(contractorModel.ContractorModel).filter(contractorModel.ContractorModel.nin == data.nin).first()
    if contractor_data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Contractor already exists')
    else:
        contractor = contractorModel.ContractorModel(nin=data.nin, first_name=data.first_name, last_name=data.last_name)
        db.add(contractor)
        db.commit()
        db.refresh(contractor)

def verifyContractor(data,db):
    contractor_data = verifyNin(data)
    if(data.first_name == contractor_data.first_name and data.last_name == contractor_data.last_name):
        #add contractor details to database
        addContractorToDatabase(data,db)
        return {"verification_status": "VERIFIED"}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Invalid Contractor details')
        

def verifyNinTest(data):
    if len(data.nin) == 11:
        return data
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Invalid Contractor credentials')


def verifyNin(data):
    headers = {
        "Content-Type":"application/json",
        "x-api-key": NIN_API_KEY
    }
    payload = {
        "nin": data.nin,
        "consent":True
    }
    response = requests.post(NIN_BASE_URL+'/nin-verification',headers=headers,payload=payload)
    print(response)
    return response.data

def fetchContractor(email,db):
    contractor_data = db.query(contractorModel.ContractorModel).filter(contractorModel.ContractorModel.email == email).first()
    if contractor_data:
        return contractor_data
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Contractor data not found')
    
    
def fetchContractorByID(id,db):
    contractor_data = db.query(contractorModel.ContractorModel).filter(contractorModel.ContractorModel.id == id).first()
    if contractor_data:
        return contractor_data
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Contractor data not found')