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
        "password": {"type": "string"},
    },
    "required": ["institution_name", "contact_name", "email", "phone_number", "country_id", "city", "desiganation", "number_of_students", "number_of_departments", "domains", "preference_days", "preference_time", "password"]
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
        "password": {"type": "string"},
    }
}

LOGIN_SCHEMA = {
    "type": "object",
    "properties": {
        "email": {"type": "string"},
        "password": {"type": "string"}
    },
    "required": ["email", "password"]
}

RESET_PASSWORD_SCHEMA = {
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "password": {"type": "string"}
    },
    "required": ["id", "password"]
}