import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Float, JSON
from sqlalchemy.sql import func
from database import Base

class UserMaster(Base):
    __tablename__ = "user_master"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255), default="")
    phone_number = Column(String(255))
    address = Column(String(255))
    email = Column(String(255), unique=True)
    branch_id = Column(Integer, ForeignKey("branch.id"))
    department_id = Column(Integer, ForeignKey("department.id"))
    institution_id = Column(Integer, ForeignKey("institution_master.id"))
    programme = Column(String(255))
    
    course_id = Column(Integer)
    password_hash = Column(String(128))
    role_id = Column(Integer, ForeignKey("role.id"))
    number_of_interviews = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    
    created_date = Column(DateTime, default=func.now(), nullable=False)
    updated_date = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
    initial_password_reset = Column(Boolean, default=False)
    password_modified_date = Column(DateTime)
    last_login_date = Column(DateTime)