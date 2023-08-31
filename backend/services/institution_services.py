import traceback
import uuid
from models.institution_master import InstitutionMaster
from database import session
from utils import encrypt, decrypt, obj_to_dict


class InstitutionService:
    def __init__(self):
        pass

    def register_institution(self, data):
        data["password_hash"] = encrypt(data["password"])
        data.pop("password")
        institution = InstitutionMaster(**data)
        session.add(institution)
        session.commit()
        institution_dic = obj_to_dict(institution)
        return institution_dic

    def update_institution(self, institution_id, update_data):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            for key, value in update_data.items():
                setattr(institution, key, value)  
            session.commit()
        institution_dic = obj_to_dict(institution)
        return institution_dic
    
    def list_institutions(self):
        institutions = session.query(InstitutionMaster).all()
        if institutions:
            return institutions
        else:
            return []


    def delete_institution(self, institution_id):
        institution = session.query(InstitutionMaster).get(institution_id)
        
        if institution:
            session.delete(institution)
            session.commit()
            return True
        else:
            return False