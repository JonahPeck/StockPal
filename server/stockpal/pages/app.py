# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

# Standard imports/boilerplate setup (We added session)
from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, User, StockList, Portfolio
from services import app,bcrypt,db
from dotenv import load_dotenv

import os
# Load the env file
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)
CORS(app)


# app.secret_key = os.environ.get("secretkey")
app.secret_key = 'BAD_SECRET_KEY'
# python -c 'import os; print(os.urandom(16))'

# Storing user specific data
# session['data'] will be different per cookie
# session.get('data') to get the data 
# How can use this for user login?

# Lets create a login route that will check if the user exist and
# Save it to session

# Create a logout route now! set session to None

# Use @app.before_request!

class AllStocks(Resource):
    def get(self):
        all_stocks = StockList.query.all()
        dict_stocks = []
        for stock in all_stocks:
            dict_stocks.append(stock.to_dict())
        return make_response(dict_stocks, 200)
api.add_resource(AllStocks, '/stocks')

class Login(Resource):
    def post(self):
        try:
            jsoned_request = request.get_json()
            user = User.query.filter(User.username == jsoned_request["username"]).first()
            print(user)
            if user.authenticate(jsoned_request["password"]):
                session['user_id'] = user.id
                res = make_response(jsonify(user.to_dict()),200)
                return res
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)

        
api.add_resource(Login, '/login')

class check_login(Resource):
    def get(self):
        user_id = session.get('user_id')
        
        if user_id:
            user = User.query.filter(User.id == session["user_id"]).first()
            res = make_response(jsonify(user.to_dict()),200)
            return res

api.add_resource(check_login, '/checklogin')

class AddAccount(Resource):
    def post(self):
        try:
            input = request.get_json()
            new_user = User(
                username=input['username'], email=input['email'], password_hash=input['password'])
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)


api.add_resource(AddAccount, '/new_account')

class logout(Resource):
    def delete(self):
        session['user_id'] = None
        res = make_response(jsonify({ "login" : "Logged out"}),200)
        return res
# Create a logout route now! set session to None
api.add_resource(logout, '/logout')

class get_type(Resource):
    def get(self):
        if session.get("valid"):
            user = User.query.filter(User.id == session["user_id"]).first() 
            res = make_response(jsonify({ "user_type" : user.user_type}),200)
            return res
        else:
            res = make_response(jsonify({ "login" : "invalid user"}),400)
            return res
# Create a logout route now! set session to None
api.add_resource(get_type, '/get_type')

if __name__ == '__main__':
    app.run(port=5555)