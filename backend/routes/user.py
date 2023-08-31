import logging
import traceback

from flask import Blueprint, request, jsonify
from jsonschema import validate
from services import UserService
from validation import LOGIN_SCHEMA, RESET_PASSWORD_SCHEMA
user = Blueprint("user", __name__)
logger = logging.getLogger("user")

user_service_obj = UserService()

@user.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        validate(data, LOGIN_SCHEMA)    
        response = user_service_obj.login_user(data)
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@user.route("/logout", methods=["POST"])
def logout():
    try:
        return True
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@user.route("/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        validate(data, RESET_PASSWORD_SCHEMA)
        response = user_service_obj.reset_password(data)
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500