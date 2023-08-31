import traceback
from flask_jwt_extended import create_access_token

# from models.user_master import UserMaster as User
from models.institution_master import InstitutionMaster 
# from models.role import Role
from utils import encrypt, decrypt, obj_to_dict
from database import session


class UserService:
    def __init__(self):
        pass

    # def get_all_users(self):
    #     return self.user_repository.get_all_users()

    def get_user_by_id(self, id):
        return session.query(InstitutionMaster).filter_by(id=id).first()

    def get_user_by_username(self, email):
        return session.query(InstitutionMaster).filter_by(email = email).first()
    
    def login_user(self, data):
        email = data["email"]
        password = data["password"]
        user = self.get_user_by_username(email)
        if not user:
            return {"message": "Invalid username or password", "status": False}

        hashpwd = user.password_hash
        db_password = decrypt(hashpwd)
        
        if db_password == password:
            user_data = obj_to_dict(user)
            access_token = create_access_token(identity=user_data)
            return {"message": "", "status": True, "access_token": access_token, "data": user_data}
        else:
            return {"message": "Invalid username or password", "status": False}


    def reset_password(self, data):
        password = data["password"]
        user_id = data["user_id"]

        hashed_password = encrypt(password)
        user = self.get_user_by_id(user_id)
        user.password_hash = hashed_password
        session.commit()
        return {"message": "Password updated, relogin again", "status": True}


