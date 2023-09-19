import logging
import traceback

from flask import Blueprint, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from jsonschema import validate
from services import InstitutionService
from validation import INSTITUTION_REGISTER_SCHEMA, INSTITUTION_UPDATE_SCHEMA, LOGIN_SCHEMA, RESET_PASSWORD_SCHEMA, INSTITUTION_UPDATE_PASSWORD_SCHEMA, ANALYSIS_MODE_SCHEMA
from decorators import requires_role
institution_router = Blueprint("institution", __name__)
logger = logging.getLogger("institution")

institution_service_obj = InstitutionService()


@institution_router.route("/register", methods=["POST"])
def register_institution():
    try:
        data = request.get_json()
        validate(data, INSTITUTION_REGISTER_SCHEMA)    
        return jsonify(institution_service_obj.register_institution(data))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/login", methods=["POST"])
def login_institution():
    try:
        data = request.get_json()
        validate(data, LOGIN_SCHEMA)
        response = institution_service_obj.login_institution(data)
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

@institution_router.route("/branch_list", methods=["GET"])
def branch_list():
    try:
        response = institution_service_obj.branch_list()
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/department_list", methods=["GET"])
def department_list():
    try:
        response = institution_service_obj.department_list()
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/course_list", methods=["GET"])
def course_list():
    try:
        response = institution_service_obj.course_list()
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

@institution_router.route("/update_password", methods=["POST"])
@jwt_required()
def update_password():
    try:
        current_user = get_jwt_identity()
        user_id = current_user["id"]
        data = request.get_json()
        validate(data, INSTITUTION_UPDATE_PASSWORD_SCHEMA)
        response = institution_service_obj.update_password(data, user_id)
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@institution_router.route("/update", methods=["POST"])
@jwt_required()
def update_institution():
    try:
        institution_id = request.args.get('institution_id')
        data = request.get_json()
        validate(data, INSTITUTION_UPDATE_SCHEMA)    
        return jsonify(institution_service_obj.update_institution(institution_id, data))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@institution_router.route("/management", methods=["GET"])
@jwt_required()
def management():
    try:
        current_user = get_jwt_identity()
        institution_id = current_user["id"]
        records = institution_service_obj.management(institution_id)
        return jsonify(records)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/list", methods=["GET"])
@jwt_required()
@requires_role("super admin")
def list_institutions():
    try:
        institutions = institution_service_obj.list_institutions()
        return jsonify(institutions)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/delete", methods=["DELETE"])
@jwt_required()
@requires_role("super admin")
def delete_institution():
    try:
        institution_id = request.args.get('institution_id')
        return jsonify(institution_service_obj.delete_institution(institution_id))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@institution_router.route("/<int:institution_id>/activate", methods=["GET"])
@jwt_required()
@requires_role("super admin")
def activate_institution(institution_id):
    try:
        return jsonify(institution_service_obj.activate_institution(institution_id))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution_router.route("/<int:institution_id>/deactivate", methods=["GET"])
@jwt_required()
@requires_role("super admin")
def deactive_institution(institution_id):
    try:
        return jsonify(institution_service_obj.deactive_institution(institution_id))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@institution_router.route("/deep_analysis/<analysis_mode>", methods=["GET"])
@jwt_required()
@requires_role("admin")
def deep_analysis(analysis_mode):
    try:
        validate(analysis_mode, ANALYSIS_MODE_SCHEMA)
        return jsonify(institution_service_obj.deep_analysis(analysis_mode))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@institution_router.route("/statistics", methods=["GET"])
@jwt_required()
@requires_role("admin")
def institution_statistics():
    try:
        institution_id = request.args.get('institution_id')
        return jsonify(institution_service_obj.institution_statistics(institution_id))
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
