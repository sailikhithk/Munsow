import requests
import json

from models import Role, Country, Branch, Department, Course
from database import session
from sqlalchemy import func
from meta_data import COUNTRIES, ROLES, BRANCHS, DEPARTMENTS, COURSES
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

def create_courses():
    query_result = (
        session.query(func.count(Course.id)).filter(Course.name.in_(COURSES)).scalar()
    )
    if query_result != len(COURSES):
        for course_name in COURSES:
            course = Course(name=course_name)
            session.add(course)
        session.commit()

def create_dummy_institution():
    url = "http://localhost:5000/institution/register"
    institutions_data = [
        {
                "institution_name": "INV Test-10",
                "contact_name": "harnath",
                "email": "harnath-institution@gmail.com",
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
                "email": "ramu-institution@gmail.com",
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
                "email": "sai-institution@gmail.com",
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

def create_dummy_students():
    url = "http://localhost:5000/user/register"
    students_data = [
        {
            "first_name": "Harnath",
            "last_name": "Atmakuri-1",
            "email": "harnath.student1@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 1,
            "department_id": 1,
            "institution_id": 1,
            "address": "test address",
            "course": "UG",
            "password": "1234",
            "role_id": 3
        },
        {
            "first_name": "Harnath",
            "last_name": "Atmakuri-2",
            "email": "harnath.student2@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 1,
            "department_id": 1,
            "institution_id": 1,
            "address": "test address",
            "course": "UG",
            "password": "1234",
            "role_id": 3
        },
        {
            "first_name": "Ram",
            "last_name": "zzz 1",
            "email": "ram.student1@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 2,
            "department_id": 2,
            "institution_id": 2,
            "address": "test address",
            "course": "PG",
            "password": "1234",
            "role_id": 3
        },
        {
            "first_name": "Ram",
            "last_name": "zzz 2",
            "email": "ram.student2@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 2,
            "department_id": 2,
            "institution_id": 2,
            "address": "test address",
            "course": "UG",
            "password": "1234",
            "role_id": 3
        },
        {
            "first_name": "Sai",
            "last_name": "zzz 1",
            "email": "sai.student1@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 3,
            "department_id": 3,
            "institution_id": 3,
            "address": "test address",
            "course": "UG",
            "password": "1234",
            "role_id": 3
        },
        {
            "first_name": "sai",
            "last_name": "zzz 2",
            "email": "sai.student2@gmail.com",
            "phone_number": "9701185466",
            "branch_id": 1,
            "department_id": 1,
            "institution_id": 1,
            "address": "test address",
            "course": "UG",
            "password": "1234",
            "role_id": 3
        },
    ]


    for i in students_data:
        headers = {
        'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=json.dumps(i))
        print(response.text)

def create_dummy_teachers():
    url = "http://localhost:5000/institution/register"
    teachers_data = [
        {
                "first_name": "Harnath",
                "last_name": "harnath",
                "email": "harnath-institution@gmail.com",
                "phone_number": "9701185467",
                "branch_id": 1,
                "department_id": "Ongole",
                "institution_id": "SSE",
                "address": 150,
                "course": 10,
                "password": "@gmail.com",
                "role_id": "Mon, Tue"
            },
    ]
