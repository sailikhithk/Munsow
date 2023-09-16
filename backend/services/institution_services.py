import traceback
import uuid
import pandas as pd
from datetime import datetime
from sqlalchemy import asc, desc


from models import InstitutionMaster, Country, Role, UserMaster, Branch, Department
from database import session
from utils import encrypt, decrypt, obj_to_dict, obj_to_list
from flask_jwt_extended import create_access_token

class InstitutionService:
    def __init__(self):
        pass

    def get_institution_by_id(self, id):
        return session.query(InstitutionMaster).filter_by(id = id).first()        
        
    def get_institution_by_email(self, email):
        return session.query(InstitutionMaster).filter_by(email = email).first()        
        
    def login_institution(self, data):
        email = data["email"]
        password = data["password"]
        institution = self.get_institution_by_email(email)
        if not institution:
            return {"message": "Invalid username or password", "status": False}

        hashpwd = institution.password_hash
        db_password = decrypt(hashpwd)
        
        if db_password == password:
            institution_data = obj_to_dict(institution)
            role_name = "Admin"
            role = session.query(Role).filter_by(name = role_name).first()
            role_id = role.id
            institution_data["role_id"] = role_id
            institution_data["role_name"] = role_name
            access_token = create_access_token(identity=institution_data)
            return {"message": "", "status": True, "access_token": access_token, "data": institution_data}
        else:
            return {"message": "Invalid username or password", "status": False}
    
    def country_list(self):
        countrys = session.query(Country).all()    
        return obj_to_list(countrys)
    
    def branch_list(self):
        branchs = session.query(Branch).all()    
        return obj_to_list(branchs)
    
    def department_list(self):
        departments = session.query(Department).all()    
        return obj_to_list(departments)
        
    def reset_password(self, data):
        password = data["new_password"]
        email = data["email"]
        hashed_password = encrypt(password)
        
        institution = self.get_institution_by_email(email)
        if not institution:
            return {"message": "Invalid creds", "status": False}        
        institution.password_hash = hashed_password
        institution.password_modified_date = datetime.now()
        session.commit()
        return {"message": "Password updated, relogin again", "status": True}
    
    def update_password(self, data, institution_id):
        password = data["new_password"]
        hashed_password = encrypt(password)
        
        institution = self.get_institution_by_id(institution_id)
        if not institution:
            return {"message": "Invalid creds", "status": False}        
        institution.password_hash = hashed_password
        institution.password_modified_date = datetime.now()
        session.commit()
        return {"message": "Password updated, relogin again", "status": True}

    def register_institution(self, data):
        try:
            data["password_hash"] = encrypt(data["password"])
            data.pop("password")
            email = data["email"]
            existing_institution = self.get_institution_by_email(email)
            if existing_institution:
                return {"status": False, "message": "Institution with same email exists"}
            
            institution = InstitutionMaster(**data)
            session.add(institution)
            session.commit()
            institution_dic = obj_to_dict(institution)
            institution_dic.pop("password_hash", None)
            if institution_dic:
                return {"status": True, "message": "Institution Created", "data":institution_dic} 
            else:
                return {"status": False, "message": "Institution not created"} 
        
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"status": False, "message": "error", "error": str(e)}

    def update_institution(self, institution_id, update_data):
        try:
            institution = session.query(InstitutionMaster).get(institution_id)
            
            if institution:
                for key, value in update_data.items():
                    setattr(institution, key, value)  
                session.commit()
            institution_dic = obj_to_dict(institution)
            institution_dic.pop("password_hash", None)
            if institution_dic:
                return {"status": True, "message": "Institution Updated", "data":institution_dic}
            else:
                return {"status": False, "message": "Institution not updated"}
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"status": False, "message": "error", "error": str(e)}

    def list_institutions(self, page=1, per_page=20, sort_by=None, sort_order='asc', ):
        try:
            sort_order = sort_order.lower()
            if sort_order not in ['asc', 'desc']:
                sort_order = 'asc'

            if sort_by not in ['institution_name', 'contact_name', 'email', 'created_date']:
                sort_by = 'institution_name'

            institutions_query = session.query(InstitutionMaster)

            if sort_order == 'asc':
                institutions_query = institutions_query.order_by(asc(sort_by))
            else:
                institutions_query = institutions_query.order_by(desc(sort_by))

            total_count = institutions_query.count()

            total_pages = (total_count + per_page - 1) // per_page

            page = min(max(1, page), total_pages)

            next_page_number = None if page >= total_pages else page + 1
            prev_page_number = None if page <= 1 else page - 1

            institutions = institutions_query.limit(per_page).offset((page - 1) * per_page).all()

            institutions_list = obj_to_list(institutions)

            meta_data = {
                "total": total_count,
                "page": page,
                "per_page": per_page,
                "total_pages": total_pages,
                "sort_by": sort_by,
                "sort_order": sort_order,
                "next_page_number": next_page_number,
                "prev_page_number": prev_page_number
            }

            response = {
                "data": institutions_list,
                "meta_data": meta_data,
                "status": True
            }

            return response
        except Exception as e:
            session.rollback()
            traceback.print_exc()
            return {"status": False, "message": "error", "error": str(e)}

    def delete_institution(self, institution_id):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            session.delete(institution)
            session.commit()
            return {"status": True, "message": "Institution Deleted"} 
        else:
            return {"status": False, "message": "Institution not deleted"}
    
    def activate_institution(self, institution_id):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            institution.is_active = True
            session.commit()
            return {"status": True, "message": "Institution Activated"} 
        else:
            return {"status": False, "message": "Institution not Activated"}
    
    def deactive_institution(self, institution_id):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            institution.is_active = False
            session.commit()
            return {"status": True, "message": "Institution Deactivated"} 
        else:
            return {"status": False, "message": "Institution not Deactivated"}
        
    def management(self, institution_id):
        try:
            students_obj = session.query(UserMaster).join(Role).filter(UserMaster.institution_id == institution_id).filter(Role.name == 'Student').all()
            teachers_obj = session.query(UserMaster).join(Role).filter(UserMaster.institution_id == institution_id).filter(Role.name == 'Teacher').all()

            students = obj_to_list(students_obj)
            teachers = obj_to_list(teachers_obj)
            students_df = pd.DataFrame(students)
            teachers_df = pd.DataFrame(teachers)
            print("students_df", students_df)
            print("teachers_df", teachers_df)
            if len(students_df):
                unique_student_departments = students_df["department_id"].nunique()
                unique_student_branchs = students_df["branch_id"].nunique()
            else:
                unique_student_departments = 0
                unique_student_branchs = 0
            
            
            if len(teachers_df):
                unique_teacher_departments = teachers_df["department_id"].nunique()            
                unique_teacher_branchs = teachers_df["branch_id"].nunique()
            else:
                unique_teacher_departments = 0
                unique_teacher_branchs = 0
                        
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
            return {"status": False, "message": "error", "error": str(e)}

        