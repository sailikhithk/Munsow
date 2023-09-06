import logging
import traceback

from flask import Blueprint, request, jsonify
from jsonschema import validate
from services import InstitutionService
from validation import INSTITUTION_REGISTER_SCHEMA, INSTITUTION_UPDATE_SCHEMA, LOGIN_SCHEMA, RESET_PASSWORD_SCHEMA
institution_router = Blueprint("institution", __name__)
logger = logging.getLogger("institution")

institution_service_obj = InstitutionService()


@institution_router.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        validate(data, LOGIN_SCHEMA)    
        response = institution_service_obj.login_user(data)
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/country_list", methods=["GET"])
def country_list():
    try:
        response = institution_service_obj.country_list()
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        validate(data, RESET_PASSWORD_SCHEMA)
        response = institution_service_obj.reset_password(data)
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500





@institution_router.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        validate(data, INSTITUTION_REGISTER_SCHEMA)    
        return jsonify(institution_service_obj.register_institution(data))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@institution_router.route("/update", methods=["POST"])
def update():
    try:
        institution_id = request.args.get('institution_id')
        data = request.get_json()
        validate(data, INSTITUTION_UPDATE_SCHEMA)    
        return jsonify(institution_service_obj.update_institution(institution_id, data))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@institution_router.route("/list", methods=["GET"])
def list():
    try:
        institutions = institution_service_obj.list_institutions()
        return jsonify(institutions)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/delete", methods=["DELETE"])
def delete():
    try:
        institution_id = request.args.get('institution_id')
        return jsonify(institution_service_obj.delete_institution(institution_id))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
