import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float, JSON
from sqlalchemy.sql import func
from database import Base

class InstitutionMaster(Base):
    __tablename__ = "institution_master"

    id = Column(Integer, primary_key=True)
    institution_name = Column(String(255), index=True, unique=True)
    contact_name = Column(String(255))
    email = Column(String(255), unique=True)
    phone_number = Column(String(255))
    country_id = Column(Integer, ForeignKey("country.id"))
    city = Column(String(255))
    desiganation = Column(String(255))
    number_of_students = Column(Integer, default=0)
    number_of_departments = Column(Integer, default=0)
    registration_number = Column(String(255))
    domains = Column(String(255), default="")
    preference_days = Column(String(255), default="mon")
    preference_time = Column(String(255))
    password_hash = Column(String(255))
    is_active = Column(Boolean, default=True)

    created_date = Column(DateTime, default=func.now(), nullable=False)
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    password_modified_date = Column(DateTime)
    last_login_date = Column(DateTime)
