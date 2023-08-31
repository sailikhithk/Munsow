import traceback
from flask_jwt_extended import create_access_token

from models.user_master import UserMaster
from models.institution_master import InstitutionMaster
from models.role import Role  
from utils import encrypt, decrypt, obj_to_dict, obj_to_list
from database import session

from sqlalchemy.orm import load_only
from sqlalchemy import desc,asc

class UserService:
    def __init__(self):
        pass

    def get_user_by_id(self, id):
        return session.query(UserMaster).filter_by(id=id).first()

    def get_institution_by_id(self, id):
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
        
        if data['user_mode'] == 'user':
            user = self.get_user_by_id(user_id)
        else:
            user = self.get_institution_by_id(user_id)

        user.password_hash = hashed_password
        session.commit()
        return {"message": "Password updated, relogin again", "status": True}

    def register_user(self, data):
        data["password_hash"] = encrypt(data["password"])
        data.pop("password")
        user = UserMaster(**data)
        session.add(user)
        session.commit()
        user_dic = obj_to_dict(user)
        return user_dic

    def update_user(self, user_id, update_data):
        user = session.query(UserMaster).get(user_id)
        
        if user:
            for key, value in update_data.items():
                setattr(user, key, value)  
            session.commit()
        user_dic = obj_to_dict(user)
        return user_dic
    
        
    def list_users(self, mode, column_name, order_by = 'ASC', page_number=1, limit=20):
        users = session.query(UserMaster).join(Role).filter(Role.name == mode)
        
        if order_by == 'DESC':
            users = users.order_by(desc(getattr(UserMaster, column_name))).all()
        else:
            users = users.order_by(asc(getattr(UserMaster, column_name))).all()
        
        if users:
            total_records = len(users)
            total_pages = (total_records + limit - 1) // limit
            start_index = (page_number - 1) * limit
            end_index = start_index + limit
            users = users[start_index:end_index]

            metadata = {
                "total_records": total_records,
                "total_pages": total_pages,
                "current_page": page_number,
                "records_per_page": limit,
                "next_page": f"/users?mode={mode}&column_name={column_name}&order_by={order_by}&page_number={page_number + 1}&limit={limit}" if page_number < total_pages else None,
                "previous_page": f"/users?mode={mode}&column_name={column_name}&order_by={order_by}&page_number={page_number - 1}&limit={limit}" if page_number > 1 else None
            }

            
            response = {
                "metadata": metadata,
                "data": obj_to_list(users)
            }

            return response
        else:
            return {
                "metadata": {},
                "data": []
            }
        
    def delete_user(self, user_id):
        user = session.query(UserMaster).get(user_id)
        
        if user:
            session.delete(user)
            session.commit()
            return True
        else:
            return False
        
    def upload_users(self, institution_id, mode): 
        return
    
    def download_users(self, institution_id, mode): 
        return
    