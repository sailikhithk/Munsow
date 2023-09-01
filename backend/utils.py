# Cryptography
from cryptography.fernet import Fernet

encrypt_key = "dHAphTsGijvUR6D0huM9bDqifYN3JPcI6WSLRkbj_EY="


def encrypt(data):
    data = data.encode()
    f = Fernet(encrypt_key)
    return f.encrypt(data).decode("utf-8")


def decrypt(data):
    data = data.encode()
    f = Fernet(encrypt_key)
    return f.decrypt(data).decode("utf-8")


def obj_to_list(data):
    list_dicts = []
    for obj in data:
        temp_dic = obj_to_dict(obj)
        temp_dic.pop("password_hash", None)
        list_dicts.append(temp_dic)        
    return list_dicts


def obj_to_dict(data):
    response = {}
    if data is None:
        return {}
    for c in data.__table__.columns:
        if c.name not in ["created_date", "updated_date", "password_modified_date", "last_login_date"]:
            response[c.name] = getattr(data, c.name)
        else:
            response[c.name] = str(getattr(data, c.name))
    return response
    
    
