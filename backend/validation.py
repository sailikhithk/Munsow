INSTITUTION_REGISTER_SCHEMA = {
    "type": "object",
    "properties": {
        "institution_name": {"type": "string"},
        "contact_name": {"type": "string"},
        "email": {"type": "string"},
        "phone_number": {"type": "string"},
        "country_id": {"type": "integer"},
        "city": {"type": "string"},
        "desiganation": {"type": "string"},
        "number_of_students": {"type": "integer"},
        "number_of_departments": {"type": "integer"},
        "domains": {"type": "string"},
        "preference_days": {"type": "string"},
        "preference_time": {"type": "string"},
        "password_hash": {"type": "string"},
    },
    "required": ["institution_name", "contact_name", "email", "phone_number", "country_id", "city", "desiganation", "number_of_students", "number_of_departments", "domains", "preference_days", "preference_time", "password_hash"]
}
INSTITUTION_UPDATE_SCHEMA = {
    "type": "object",
    "properties": {
        "institution_name": {"type": "string"},
        "contact_name": {"type": "string"},
        "email": {"type": "string"},
        "phone_number": {"type": "string"},
        "country_id": {"type": "integer"},
        "city": {"type": "string"},
        "desiganation": {"type": "string"},
        "number_of_students": {"type": "integer"},
        "number_of_departments": {"type": "integer"},
        "domains": {"type": "string"},
        "preference_days": {"type": "string"},
        "preference_time": {"type": "string"},
        "password_hash": {"type": "string"},
    }
}

LOGIN_SCHEMA = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "password": {"type": "string"},
        "user_mode": {"type": "string"}
    },
    "required": ["email", "password", "user_mode"]
}

RESET_PASSWORD_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "password": {"type": "string"},
        "user_mode": {"type": "string"}
    },
    "required": ["id", "password", "user_mode"]
}

USER_REGISTER_SCHEMA = {
    "type": "object",
    "properties": {
        "first_name": {"type": "string"},
        "last_name": {"type": "string"},
        "email": {"type": "string"},
        "phone_number": {"type": "string"},
        "branch_id": {"type": "integer"},
        "department_id": {"type": "integer"},
        "institution_id": {"type": "integer"},
        
        "preference": {"type": "string"},
        "is_ug": {"type": "integer"},
        "password_hash": {"type": "string"},
        "role_id": {"type": "string"},
    },
    "required": ["first_name", "last_name", "email", "phone_number", "branch_id", "department_id", "institution_id", "preference", "is_ug", "password_hash", "role_id"]
}
    
USER_UPDATE_SCHEMA = {
    "type": "object",
    "properties": {
        "first_name": {"type": "string"},
        "last_name": {"type": "string"},
        "email": {"type": "string"},
        "phone_number": {"type": "string"},
        "branch_id": {"type": "integer"},
        "department_id": {"type": "integer"},
        "institution_id": {"type": "integer"},
        
        "preference": {"type": "string"},
        "is_ug": {"type": "integer"},
        "password_hash": {"type": "string"},
        "role_id": {"type": "string"},
    }
}
    
ALLOWED_EXTENSIONS = {'xlsx'}