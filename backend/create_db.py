from models.role import Role
from models.user_master import UserMaster
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




# def create_dummy_users():
#     roles = session.query(Role).all()
#     institutions = ["Institution 1", "Institution 2", "Institution 3"]
#     for i, role in enumerate(roles):
#         existing_user = session.query(User).filter_by(username=f"user{i+1}").first()
#         if not existing_user:
#             user = User(
#                 username=f"user{i+1}",
#                 password_hash=f"password{i+1}",
#                 email=f"user{i+1}@example.com",
#                 institution=institutions[i % len(institutions)],
#                 role_id=role.id,
#             )
#             session.add(user)
#     session.commit()