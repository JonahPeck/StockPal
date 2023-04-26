# import requests
import json
# from cherrypicker import CherryPicker
from faker import Faker
import random
import csv
import pprint
from app import app
from models import db, User, StockList, Portfolio
faker = Faker()

with app.app_context():
    # User.query.delete()
    print("Deleting Users")

    new_user_1 = User(username="Jonah",email="J@gmail.com",_password_hash = "test")
    new_user_2 = User(username="Maile",email="M@gmail.com",_password_hash = "test")
    new_user_3 = User(username="Breck",email="B@gmail.com",_password_hash = "test")
    users_all = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users_all)
    db.session.commit()
    print("data in table")