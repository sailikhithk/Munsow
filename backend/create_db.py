import requests

from models.role import Role
from models.country import Country
from database import session
from sqlalchemy import func
from meta_data import COUNTRIES, ROLES
def create_dummy_roles():
    
    query_result = (
        session.query(func.count(Role.id)).filter(Role.name.in_(ROLES)).scalar()
    )
    if query_result != 3:
        for role_name in ROLES:
            role = Role(name=role_name)
            session.add(role)
        session.commit()

def create_countries():
    query_result = (
        session.query(func.count(Country.id)).filter(Country.name.in_(COUNTRIES)).scalar()
    )
    if query_result != len(COUNTRIES):
        for country_name in COUNTRIES:
            country = Country(name=country_name)
            session.add(country)
        session.commit()

def create_dummy_institution():
    url = "http://localhost:5000/institution/register"
    institutions_data = [
        {
                "institution_name": "INV Test-1",
                "contact_name": "harnath",
                "email": "harnath@gmail.com",
                "phone_number": "9701185467",
                "country_id": 1,
                "city": "Ongole",
                "desiganation": "SSE",
                "number_of_students": 150,
                "number_of_departments": 10,
                "domains": "@gmail.com",
                "preference_days": "Mon, Tue",
                "preference_time": "10 AM to 6 PM",
                "password": "1234"
            },
            {
                "institution_name": "INV Test-1",
                "contact_name": "ramu",
                "email": "ramu@gmail.com",
                "phone_number": "9701185467",
                "country_id": 1,
                "city": "Ongole",
                "desiganation": "SSE",
                "number_of_students": 150,
                "number_of_departments": 10,
                "domains": "@gmail.com",
                "preference_days": "Mon, Tue",
                "preference_time": "10 AM to 6 PM",
                "password": "1234"
            },
            {
                "institution_name": "INV Test-1",
                "contact_name": "sai",
                "email": "sai@gmail.com",
                "phone_number": "9701185467",
                "country_id": 1,
                "city": "Ongole",
                "desiganation": "SSE",
                "number_of_students": 150,
                "number_of_departments": 10,
                "domains": "@gmail.com",
                "preference_days": "Mon, Tue",
                "preference_time": "10 AM to 6 PM",
                "password": "1234"
            },
            
        ]
    for i in institutions_data:
        headers = {
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=json.dumps(i))
        print(response.text)

def create_dummy_users():
    pass

