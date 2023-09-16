# decorators.py
from functools import wraps
from flask_jwt_extended import decode_token, JWTManager, jwt_required, get_jwt_identity
from flask import request, jsonify

def requires_role(role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            access_token = request.headers.get("Authorization")
            if access_token is None:
                return jsonify({"message": "Access token is missing", "status": False}), 401
            current_user = get_jwt_identity()
            user_role_name = current_user.get("role_name")

            if user_role_name is None:
                return jsonify({"message": "Invalid access token", "status": False}), 401

            if str(user_role_name).lower() == str(role).lower():
                return func(*args, **kwargs)
            else:
                return jsonify({"message": "Access denied. Insufficient permissions.", "status": False}), 403
        return wrapper
    return decorator
