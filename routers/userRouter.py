from fastapi import APIRouter, Depends, status
from service import userService
from schema import userSchema
from repository import database
from sqlalchemy.orm import Session

user_router = APIRouter()

@user_router.post('/auth/register', response_model=userSchema.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user_account(data: userSchema.UserSchema, db: Session = Depends(database.get_db)):
    return userService.register_user(data,db)

@user_router.post('/auth/login', response_model=userSchema.UserToken, status_code=status.HTTP_200_OK)
def login_into_account(data: userSchema.UserLogin, db: Session = Depends(database.get_db)):
    return userService.login(data,db)