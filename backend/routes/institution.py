import logging
import traceback

from flask import Blueprint, request, jsonify
from jsonschema import validate
from services import InstitutionService
from validation import INSTITUTION_REGISTER_SCHEMA, INSTITUTION_UPDATE_SCHEMA
institution = Blueprint("institution", __name__)
logger = logging.getLogger("institution")

institution_service_obj = InstitutionService()

@institution.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        validate(data, INSTITUTION_REGISTER_SCHEMA)    
        institution = institution_service_obj.register_institution(data)
        if institution:
            response = {"status": True, "message": "Institution Created", "data":institution} 
        else:
            response = {"status": False, "message": "Institution not created"} 
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    

@institution.route("/update", methods=["POST"])
def update():
    try:
        institution_id = request.args.get('institution_id')
        data = request.get_json()
        validate(data, INSTITUTION_UPDATE_SCHEMA)    
        institution = institution_service_obj.update_institution(institution_id, data)
        if institution:
            response = {"status": True, "message": "Institution Updated", "data":institution} 
        else:
            response = {"status": False, "message": "Institution not updated"} 
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@institution.route("/list", methods=["GET"])
def list():
    try:
        institutions = institution_service_obj.list_institutions()
        return institutions
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@institution.route("/delete", methods=["DELETE"])
def delete():
    try:
        institution_id = request.args.get('institution_id')
        status = institution_service_obj.delete_institution(institution_id)
        if status:
            response = {"status": True, "message": "Institution Deleted", "data":institution} 
        else:
            response = {"status": False, "message": "Institution not deleted", "data":institution} 

        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
