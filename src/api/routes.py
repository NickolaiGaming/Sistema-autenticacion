"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, create_access_token,  get_jwt_identity, JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    
    if not email: 
        return jsonify({"msg":"Email is required!"}), 400
    if not password: 
        return jsonify({"msg":"Password is required!"}), 400
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({ "msg": "User/Password are incorrects!"}), 401
    
    if not check_password_hash(user.password, password):
        return jsonify({ "msg": "User/Password are incorrects!"}), 401
    
    expires = datetime.timedelta(days=1)
    access_token = create_access_token(identity=user.id, expires_delta=expires)
    
    data = {
        "success": "Login succesfully!",
        "access_token": access_token,
        "user": user.serialize()
    }
    
    return jsonify(data), 200


@api.route('/register', methods=['POST'])
def register():
    
    name = request.json.get('name', '')
    email = request.json.get('email')
    password = request.json.get('password')
    is_active = request.json.get('is_active', True)
    
    if not email: 
        return jsonify({"msg":"Email is required!"}), 400
    if not password: 
        return jsonify({"msg":"Password is required!"}), 400
    
    found = User.query.filter_by(email=email).first()
    if found:
        return jsonify({"msg": "Email already exists!"}), 400
    
    user = User()
    user.name = name
    user.email = email
    user.password = generate_password_hash(password)
    user.is_active = is_active
    
    #db.session.add(user)
    #db.session.commit()
    
    user.save()
    
    if not user:
        return jsonify({ "msg": "Error, please try again later"}), 400
    
    return jsonify({"success": "Register successfully, please log in!"}), 200

@api.route('/private')
@jwt_required()
def private_user():
    id = get_jwt_identity() # accedemos a la informacion guardada en el token    
    user = User.query.get(id) # buscamos el usuario por esa informacion
    return jsonify(user.serialize()), 200