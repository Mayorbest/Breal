from model import userModel
from fastapi import HTTPException, status
from security import securityConfig
from repository import database
from schema import userSchema

userModel.database.Base.metadata.create_all(database.engine)


def register_user(data,db):
    if data:
        accessLevel = None
        user = db.query(userModel.UserModel).filter(userModel.UserModel.email == data.email).first()
        if user:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='User account already exist')
        else:
            if data.role == "CLIENT" or data.role == "CONTRACTOR":
                accessLevel = "TEMPORARY"
            else:
                accessLevel = "FULL"
            user = userModel.UserModel(email=data.email,password=data.password, role=data.role, access_level=accessLevel)
            #hash password
            if user.password:
                user.password = securityConfig.hash_password(user.password)
            
            db.add(user)
            db.commit()
            db.refresh(user)
            
            print('user account created')
            user_data = userSchema.UserData(id=user.id, role=user.role, access_level=user.access_level)
            return userSchema.UserResponse(status="success", data=user_data)
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Invalid details')

def login(data,db):
    if data:
        user = db.query(userModel.UserModel).filter(userModel.UserModel.email == data.email).first()
        if user:
            if securityConfig.verify_password(data.password,user.password):
                return securityConfig.create_token(data)
            else:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid user email and password')
        else:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail='Invalid details')
            

