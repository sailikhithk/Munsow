import requests
import json

from models import Role, Country, Branch, Department
from database import session
from sqlalchemy import func
from meta_data import COUNTRIES, ROLES, BRANCHS, DEPARTMENTS
def create_dummy_roles():
    
    query_result = (
        session.query(func.count(Role.id)).filter(Role.name.in_(ROLES)).scalar()
    )
    if query_result != len(ROLES):
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

def create_branches():
    query_result = (
        session.query(func.count(Branch.id)).filter(Branch.name.in_(BRANCHS)).scalar()
    )
    if query_result != len(BRANCHS):
        for branch_name in BRANCHS:
            branch = Branch(name=branch_name)
            session.add(branch)
        session.commit()

def create_departments():
    query_result = (
        session.query(func.count(Department.id)).filter(Department.name.in_(DEPARTMENTS)).scalar()
    )
    if query_result != len(DEPARTMENTS):
        for department_name in DEPARTMENTS:
            department = Department(name=department_name)
            session.add(department)
        session.commit()

def create_dummy_institution():
    url = "http://localhost:5000/institution/register"
    institutions_data = [
        {
                "institution_name": "INV Test-10",
                "contact_name": "harnath",
                "email": "harnath-a@gmail.com",
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
                "institution_name": "INV Test-11",
                "contact_name": "ramu",
                "email": "ramu-a@gmail.com",
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
                "institution_name": "INV Test-12",
                "contact_name": "sai",
                "email": "sai-a@gmail.com",
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

