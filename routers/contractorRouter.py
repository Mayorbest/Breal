from fastapi import APIRouter, status
from schema import contractorSchema
from service import contractorService

contractor_router = APIRouter()

@contractor_router.post('/kyc/nin/verify', status_code=status.HTTP_201_CREATED)
def create_contractor(data: contractorSchema.ContractorSchema):
    contractorService.verifyContractor(data)