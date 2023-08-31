import logging
import traceback

from flask import Blueprint, request, jsonify, send_file
from jsonschema import validate
from services import UserService
from validation import LOGIN_SCHEMA, RESET_PASSWORD_SCHEMA, USER_REGISTER_SCHEMA, USER_UPDATE_SCHEMA, ALLOWED_EXTENSIONS
user_router = Blueprint("user", __name__)
logger = logging.getLogger("user")

user_service_obj = UserService()

@user_router.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        validate(data, LOGIN_SCHEMA)    
        response = user_service_obj.login_user(data)
        return jsonify(response)
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@user_router.route("/logout", methods=["POST"])
def logout():
    try:
        return True
    
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@user_router.route("/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        validate(data, RESET_PASSWORD_SCHEMA)
        response = user_service_obj.reset_password(data)
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@user_router.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        validate(data, USER_REGISTER_SCHEMA)    
        user = user_service_obj.register_user(data)
        if user:
            response = {"status": True, "message": "User Created", "data":user} 
        else:
            response = {"status": False, "message": "User not created"} 
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    

@user_router.route("/update", methods=["POST"])
def update():
    try:
        user_id = request.args.get('user_id')
        data = request.get_json()
        validate(data, USER_UPDATE_SCHEMA)    
        user = user_service_obj.update_user(user_id, data)
        if user:
            response = {"status": True, "message": "User Updated", "data":user} 
        else:
            response = {"status": False, "message": "User not updated"} 
        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500
    
@user_router.route("/list", methods=["GET"])
def list():
    try:
        institution_id = request.args.get('institution_id')
        mode = request.args.get('mode')
        users = user_service_obj.list_users(institution_id, mode)
        return jsonify(users)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@user_router.route("/delete", methods=["DELETE"])
def delete():
    try:
        user_id = request.args.get('user_id')
        status = user_service_obj.delete_user(user_id)
        if status:
            response = {"status": True, "message": "User Deleted"} 
        else:
            response = {"status": False, "message": "User not deleted"} 

        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@user_router.route("/upload", methods=["POST"])
def upload():
    try:
        institution_id = request.args.get('institution_id')
        mode = request.args.get('mode')
        
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        file = request.files['file']

        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        filename = file.filename
        if not '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            return jsonify({"error": "Invalid file type"}), 400
        
        status = user_service_obj.upload_users(institution_id, mode, file, filename)
        if status:
            response = {"status": True, "message": "User bulk upload successfully"} 
        else:
            response = {"status": False, "message": "User bulk upload failed"} 

        return jsonify(response)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@user_router.route('/download', methods=['GET'])
def download():
    try:
        institution_id = request.args.get('institution_id')
        mode = request.args.get('mode')
        file_path = user_service_obj.download_users(institution_id, mode)
        return send_file(file_path, as_attachment=True)
    except FileNotFoundError:
        return "File not found", 404