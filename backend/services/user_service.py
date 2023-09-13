import traceback
import pandas as pd
from datetime import datetime

from flask_jwt_extended import create_access_token

from models import UserMaster, InstitutionMaster, Role, Branch, Department

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
    
    def get_user_by_email(self, email):
        return session.query(UserMaster).filter_by(email = email).first()
    
    def login_user(self, data):
        email = data["email"]
        password = data["password"]
        user = self.get_user_by_email(email)
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
        user.password_modified_date = datetime.now()
        
        session.commit()
        return {"message": "Password updated, relogin again", "status": True}

    def register_user(self, data):
        data["password_hash"] = encrypt(data["password"])
        data.pop("password")
        data["initial_password_reset"] = True
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
        
    def active_user(self, user_id):
        user = session.query(UserMaster).get(user_id)
        
        if user:
            user.is_active = True
            session.commit()
            return {"status": True, "message": "User Activated"} 
        else:
            return {"status": False, "message": "User not Activated"}
    
    def deactive_user(self, user_id):
        user = session.query(UserMaster).get(user_id)
        
        if user:
            user.is_active = False
            session.commit()
            return {"status": True, "message": "User Activated"} 
        else:
            return {"status": False, "message": "User not Activated"}
    
    def management(self, institution_id):
        students_obj = session.query(UserMaster).join(Role).filter(UserMaster.institution_id == institution_id).filter(Role.name == 'Student').all()
        teachers_obj = session.query(UserMaster).join(Role).filter(UserMaster.institution_id == institution_id).filter(Role.name == 'Teacher').all()

        students = obj_to_list(students_obj)
        teachers = obj_to_list(teachers_obj)
        students_df = pd.DataFrame(students)
        teachers_df = pd.DataFrame(teachers)
        unique_student_departments = students_df["department_id"].nunique()
        unique_teacher_departments = teachers_df["department_id"].nunique()
        
        unique_student_branchs = students_df["branch_id"].nunique()
        unique_teacher_branchs = teachers_df["branch_id"].nunique()
        
        response = {
            "students": {
                "number_of_students": len(students),
                "number_of_departments": unique_student_departments,
                "number_of_branches": unique_student_branchs

            },
            "teachers": {
                "number_of_teachers": len(teachers),
                "number_of_departments": unique_teacher_departments,
                "number_of_branches": unique_teacher_branchs
            }
        }

        return response

    def convert_name_to_id(self, session, model_class, name_col, name_value):
        entity = session.query(model_class).filter_by(name=name_value).first()
        if entity:
            return entity.id
        return None
    
    def upload_users(self, excel_file, institution_id, mode): 
        data = pd.read_excel(excel_file)
        for index, row in data.iterrows():
            branch_id = self.convert_name_to_id(session, Branch, 'name', row['branch'])
            department_id = self.convert_name_to_id(session, Department, 'name', row['department'])
            role_id = self.convert_name_to_id(session, Role, 'name', mode)

            user = UserMaster(
                first_name=row['first_name'],
                last_name=row['last_name'],
                phone_number=row['phone_number'],
                email=row['email'],
                branch_id=branch_id,
                department_id=department_id,
                institution_id=institution_id,
                role_id=role_id,
                preference=row['preference'],
                is_ug=row['is_ug'],
            )
            session.add(user)

        session.commit()
        session.close()
        return True
    
    def download_users(self, institution_id, mode): 
        role_id = session.query(Role).filter_by(name=mode).first().id
        institution_name = session.query(InstitutionMaster).filter_by(id=institution_id).first().institution_name
            
        users = session.query(UserMaster).filter_by(role_id=role_id).filter_by(institution_id=institution_id).all()

        user_data = []
        for user in users:
            branch_name = session.query(Branch).filter_by(id=user.branch_id).first().name
            department_name = session.query(Department).filter_by(id=user.department_id).first().name
            
            user_data.append({
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone_number': user.phone_number,
                'email': user.email,
                'branch': branch_name,
                'department': department_name,
                'institution': institution_name,
                'role': mode,
                'preference': user.preference,
                'is_ug': user.is_ug
            })

        output_file = "" # need to look
        df = pd.DataFrame(user_data)
        df.to_excel(output_file, index=False)

        session.close()
        return output_file
    