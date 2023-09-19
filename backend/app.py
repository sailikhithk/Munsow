# main.py
import os
import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import timedelta


# Registering the blueprints after initializing the app
from routes.user import user_router
from routes.institution import institution_router
from decorators import requires_role

# from routes.case_master import case_master as case_master_router
from flask_jwt_extended import decode_token, JWTManager, jwt_required, get_jwt_identity

from database import Base, engine

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "your-secret-key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
jwt = JWTManager(app)

# Apply CORS to app
# CORS(app, resources={r"*": {"origins": "*"}})


# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Registering the blueprints
# app.register_blueprint(auth, url_prefix="/auth")
# app.register_blueprint(case_master_router, url_prefix="/case_master")
app.register_blueprint(user_router, url_prefix="/user")
app.register_blueprint(institution_router, url_prefix="/institution")

@app.before_request
def before_request():
    print()
    print("Request Received:")
    print("URL:", request.url)
    print("Method:", request.method)
    # print("Headers:", request.headers)
    print("Query Params:", request.args)
    
    if request.method == "POST":
        if request.content_type.startswith('application/json'):
            print("Body (JSON):", request.get_json())
        elif request.content_type.startswith('multipart/form-data'):
            print("Form Data:")
            for key, value in request.form.items():
                if key != "file":
                    print(f"{key}: {value}")    
    else:
        print("Body: No request body")
    
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({"message": "Access token is missing", "status": False}), 401

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST")
    
    print()
    print("Response Sent:")
    print("Status Code:", response.status_code)
    print("Content Type:", response.content_type)
    
    if response.content_type == "application/json":
        print("Data:", response.get_json())
    elif response.content_type.startswith("image/") or response.content_type.startswith("application/"):
        print("File Response: Not Printing Binary Data")
    else:
        print("Data:", response.get_data(as_text=True))    
    return response


@app.cli.command('insert_dummy_data')
def insert_dummy_data():
    with app.app_context():
        from create_db import (
            create_dummy_roles,
            create_countries,
            create_branches,
            create_departments,
            create_courses,
            create_dummy_institution,
            create_dummy_teachers,
            create_dummy_students,

        )
    create_dummy_roles()
    create_countries()
    create_branches()
    create_courses()
    create_departments()
    create_dummy_institution()
    create_dummy_teachers()
    create_dummy_students()
        

if __name__ == "__main__":
    from models.branch import Branch
    from models.country import Country
    from models.department import Department
    from models.institution_master import InstitutionMaster
    from models.role import Role
    from models.user_master import UserMaster
    from models.course import Course
    
    Base.metadata.create_all(engine)

    app.run(debug=True)
