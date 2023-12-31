import traceback
import pandas as pd
from datetime import datetime

from flask_jwt_extended import create_access_token

from models import UserMaster, InstitutionMaster, Role, Branch, Department, Course
from meta_data import UPLOAD_USER_FILE_STUDENT_HEADERS, UPLOAD_USER_FILE_TEACHER_HEADERS 
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
        try:
            email = data["email"]
            password = data["password"]
            user = self.get_user_by_email(email)
            if not user:
                return {"message": "Invalid username or password", "status": False}

            hashpwd = user.password_hash
            db_password = decrypt(hashpwd)
            
            if db_password == password:
                user_data = obj_to_dict(user)
                role_id = user.role_id
                role = session.query(Role).filter_by(id = role_id).first()
                user_data["role_name"] = role.name
                access_token = create_access_token(identity=user_data)
                return {"message": "", "status": True, "access_token": access_token, "data": user_data}
            else:
                return {"message": "Invalid username or password", "status": False}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}

    def reset_password(self, data):
        try:
            password = data["new_password"]
            email = data["email"]
            hashed_password = encrypt(password)
            
            user = self.get_user_by_email(email)
            if not user:
                return {"message": "Invalid creds", "status": False}        
            
            user.password_hash = hashed_password
            user.password_modified_date = datetime.now()
            
            session.commit()
            return {"message": "Password updated, relogin again", "status": True}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}

    def update_password(self, data, user_id):
        try:
            password = data["new_password"]
            hashed_password = encrypt(password)
            
            user = self.get_user_by_id(user_id)
            if not user:
                return {"message": "Invalid creds", "status": False}        
            user.password_hash = hashed_password
            user.password_modified_date = datetime.now()
            session.commit()
            return {"message": "Password updated, relogin again", "status": True}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def register_user(self, data):
        try:
            data["password_hash"] = encrypt(data["password"])
            data.pop("password")
            data["initial_password_reset"] = True
            
            if "role_id" not in data:
                role = session.query(Role).filter_by(name = "Student").first()
                data["role_id"] = role.id
            
            if "course" not in data:
                course = session.query(Course).filter_by(name = data['course']).first()
                if course is not None:
                    data["course_id"] = course.id
                else:
                    course = session.query(Course).filter_by(name = "UG").first()
                    data["course_id"] = course.id
            data.pop("course", None)
                
            if "course_id" not in data:
                course = session.query(Course).filter_by(name = "UG").first()
                data["course_id"] = course.id
            
            
            user = UserMaster(**data)
            session.add(user)
            session.commit()
            user_dic = obj_to_dict(user)
            return user_dic
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}

    def admin_create_student(self, data):
        try:
            role_id = self.convert_name_to_id(session, Role, 'name', "Student")
            data["role_id"] = role_id        
            data["password_hash"] = encrypt(data["password"])
            data.pop("password")
            data["initial_password_reset"] = False
    
            user = self.get_user_by_email(data['email'])
            if user:
                print(f"User(Student) with email {data['email']} already exists")
                return {"status": False, "message": "Student with same email exists, new student not created"}
            
            user = UserMaster(**data)
            session.add(user)
            session.commit()
            
            return {"status": True, "message": "Student Created", "new_user_id":user.id}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def admin_create_teacher(self, data):
        try:
            role_id = self.convert_name_to_id(session, Role, 'name', "Teacher")
            data["role_id"] = role_id
            data["password_hash"] = encrypt(data["password"])
            data.pop("password")
            data["initial_password_reset"] = False

            user = self.get_user_by_email(data['email'])
            if user:
                print(f"User(Teacher) with email {data['email']} already exists")
                return {"status": False, "message": "Teacher with same email exists, new teacher not created"}
            
            user = UserMaster(**data)
            session.add(user)
            session.commit()
            return {"status": True, "message": "Teacher Created", "user_id":user.id}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def update_user(self, user_id, update_data):
        try:
            user = session.query(UserMaster).get(user_id)
            
            if user:
                for key, value in update_data.items():
                    setattr(user, key, value)  
                session.commit()
            user_dic = obj_to_dict(user)
            return user_dic
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
        
    def list_users(self, mode, column_name, order_by = 'ASC', page_number=1, limit=20):
        try:
            users = session.query(UserMaster, 
                                Branch.name.label("branch_name"), 
                                Department.name.label("department_name"),
                                InstitutionMaster.institution_name.label("institution_name"), 
                                Course.name.label("course_name")) \
                .join(Role, UserMaster.role_id == Role.id) \
                .join(Branch, UserMaster.branch_id == Branch.id) \
                .join(Department, UserMaster.department_id == Department.id) \
                .join(InstitutionMaster, UserMaster.institution_id == InstitutionMaster.id) \
                .join(Course, UserMaster.course_id == Course.id) \
                .filter(Role.name == mode)
            
            if order_by == 'DESC':
                users = users.order_by(desc(getattr(UserMaster, column_name))).all()
            else:
                users = users.order_by(asc(getattr(UserMaster, column_name))).all()
            
            users_list = [
                {
                    "id": user[0].id,
                    "first_name": user[0].first_name,
                    "last_name": user[0].last_name,
                    "phone_number": user[0].phone_number,
                    "address": user[0].address,
                    "email": user[0].email,
                    "branch_name": user.branch_name,
                    "department_name": user.department_name,
                    "institution_name": user.institution_name,
                    "course_name": user.course_name,
                    "created_date": str(user[0].created_date)
                }
                for user in users
            ]
            if users_list:
                total_records = len(users_list)
                total_pages = (total_records + limit - 1) // limit
                start_index = (page_number - 1) * limit
                end_index = start_index + limit
                users_list = users_list[start_index:end_index]

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
                    "data": users_list
                }

                return response
            else:
                return {
                    "metadata": {},
                    "data": []
                }
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def delete_user(self, user_id):
        try:
            user = session.query(UserMaster).get(user_id)
            
            if user:
                session.delete(user)
                session.commit()
                return True
            else:
                return False
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
        
    def activate_user(self, user_id):
        try:
            user = session.query(UserMaster).get(user_id)
            
            if user:
                user.is_active = True
                session.commit()
                return {"status": True, "message": "User Activated"} 
            else:
                return {"status": False, "message": "User not Activated"}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def deactivate_user(self, user_id):
        try:
            user = session.query(UserMaster).get(user_id)
            
            if user:
                user.is_active = False
                session.commit()
                return {"status": True, "message": "User Activated"} 
            else:
                return {"status": False, "message": "User not Activated"}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
    
    def management(self, institution_id):
        try:
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
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}

    def convert_name_to_id(self, session, model_class, name_col, name_value):
        entity = session.query(model_class).filter_by(name=name_value).first()
        if entity:
            return entity.id
        return None
    
    def upload_users(self, excel_file, institution_id, mode): 
        try:
            data_df = pd.read_excel(excel_file)
            df_columns = data_df.columns.tolist()
            df_new_columns = {k:str(k).lower().strip().replace(" ", "_") for k in df_columns}
            data_df.rename(columns=df_new_columns, inplace=True)
            df_columns = data_df.columns.tolist()
            
            if mode == 'student':
                # uploaded student file
                for column in df_columns:
                    if column not in UPLOAD_USER_FILE_STUDENT_HEADERS:
                        print("Missing", column)
                        return {"status": False, "message": "Invalid File"}    
                for index, row in data_df.iterrows():
                    user = self.get_user_by_email(row['email'])
                    if user:
                        print(f"User(Student) with email {row['email']} already exists")
                        continue
                    
                    branch_id = self.convert_name_to_id(session, Branch, 'name', row['branch'])
                    department_id = self.convert_name_to_id(session, Department, 'name', row['department'])
                    course_id = self.convert_name_to_id(session, Course, 'name', row['course'])
                    role_id = self.convert_name_to_id(session, Role, 'name', "Student")
                    
                    password = str(row["password"])
                    hashed_password = encrypt(password)

                    user = UserMaster(
                        first_name=row['first_name'],
                        last_name=row['last_name'],
                        phone_number=row['phone_number'],
                        email=row['email'],
                        branch_id=branch_id,
                        department_id=department_id,
                        institution_id=institution_id,
                        programme = row['programme'],
                        address = row.get('address', ""),
                        role_id=role_id,
                        course_id=course_id,
                        password_hash = hashed_password
                    )
                    session.add(user)
                session.commit()
                
                return {"status": True, "message": "User uploaded"}
            elif mode == 'teacher':
                # uploaded teacher file
                for column in df_columns:
                    if column not in UPLOAD_USER_FILE_TEACHER_HEADERS:
                        print("Missing", column)
                        return {"status": False, "message": "Invalid File"}    
            
                for index, row in data_df.iterrows():
                    user = self.get_user_by_email(row['email'])
                    if user:
                        print(f"User(Teacher) with email {row['email']} already exists")
                        continue
                    
                    branch_id = self.convert_name_to_id(session, Branch, 'name', row['branch'])
                    department_id = self.convert_name_to_id(session, Department, 'name', row['department'])
                    role_id = self.convert_name_to_id(session, Role, 'name', 'Teacher')

                    password = str(row["password"])
                    hashed_password = encrypt(password)

                    user = UserMaster(
                        first_name=row['first_name'],
                        phone_number=row['phone_number'],
                        email=row['email'],
                        branch_id=branch_id,
                        department_id=department_id,
                        institution_id=institution_id,
                        role_id=role_id,
                        address = row.get('address', ""),
                        password_hash = hashed_password
                    )
                    session.add(user)
                session.commit()
                
                return {"status": True, "message": "Teachers uploaded"}
            else:
                return {"status": False, "message": "Invalid File"}
        
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"error": str(e), "status": False}
        
    def download_create_users_file(self, mode, sample_data = False): 
        try:
            if str(mode).lower() == 'student':
                if sample_data:
                    file_name = "students_upload_with_sample_data.xlsx"
                else:
                    file_name = "students_upload.xlsx"
            else:
                if sample_data:
                    file_name = "teachers_upload_with_sample_data.xlsx"
                else:
                    file_name = "teachers_upload.xlsx"
        
            return file_name
        
        
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return ""
    


    def user_statistics(self, user_id):
        try:
            response = {
                "cards": [],
                "graphs": []
            }

            card_1 = {
                "name": "Improvement areas identified",
                "value": 5
            }
            card_2 = {
                "name": "Average Interview score",
                "value": "74/100"
            }
            card_3 = {
                "name": "Skill gap rate",
                "value": "23%"
            }

            graph_1 = {
                "name": "CRITICAL IMPROVEMENT AREAS",
                "data": [
                { "name": 'Team Work', "value": 50 },
                { "name": 'Excel', "value": 20 },
                { "name": 'Communication', "value": 30 }
            ]
            }
            response["cards"] = [card_1, card_2, card_3] 
            response["graphs"] = [graph_1]
            return {"status": True, "data": response}

        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"status": False, "message": "error", "error": str(e)}

            