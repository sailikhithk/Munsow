import traceback
import uuid
from models.institution_master import InstitutionMaster
from database import session
from utils import encrypt, decrypt, obj_to_dict, obj_to_list


class InstitutionService:
    def __init__(self):
        pass

    def get_institution_by_email(self, email):
        institution = session.query(InstitutionMaster).filter_by(email = email).first()
        
        return obj_to_dict(institution)
    
    def register_institution(self, data):
        try:
            data["password_hash"] = encrypt(data["password"])
            data.pop("password")
            email = data["email"]
            existing_institution = self.get_institution_by_email(email)
            if existing_institution:
                return {"status": False, "message": "Institution with this email exists"}
            
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

    def list_institutions(self):
        institutions = session.query(InstitutionMaster).all()
        institutions_list = obj_to_list(institutions)
        if institutions_list:
            return institutions_list
        else:
            return []

    def delete_institution(self, institution_id):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            session.delete(institution)
            session.commit()
            return {"status": True, "message": "Institution Deleted"} 
        else:
            return {"status": False, "message": "Institution not deleted"}