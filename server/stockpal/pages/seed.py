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
    User.query.delete()
    Portfolio.query.delete()
    print("Deleting Users")
    print("Deleting portfolio")

    new_user_1 = User(username="Jonah",email="J@gmail.com",password_hash = "test")
    new_user_2 = User(username="Maile",email="M@gmail.com",password_hash = "test")
    new_user_3 = User(username="Breck",email="B@gmail.com",password_hash = "test")
    users_all = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users_all)
    db.session.commit()
    print("data in table")



import pandas as pd


lst = []
with open('test.csv', mode='r') as f:
    data = csv.DictReader(f)
    print(data)
    for row in data:
        lst.append(dict(row))
        
        print(row)
        break
pprint.pprint(lst[0]["Name"])   
# with app.app_context():
#     new_stock = StockList(
#         symbol = lst[0]['Symbol'],
#         name = lst[0]['Name'],
#         sector = lst[0]['Sector']
#     )

#     db.session.add(new_stock)
#     db.session.commit()
#     pprint.pprint(new_stock)
with app.app_context():
    fake = Faker()

    StockList.query.delete()
    # User.query.delete()
    # Comment.query.delete()
    # UserTrail.query.delete()
    lst = []
    with open('test.csv', mode='r') as f:
        data = csv.DictReader(f)
        for row in data:
            lst.append(dict(row))
            
    pprint.pprint(lst[0]['Symbol'])   
    stocks =[]
    for i in range(len(lst)):
        new_stock = StockList(
            symbol = lst[i]['Symbol'],
            name = lst[i]['Name'],
            sector = lst[i]['Sector'],
        )
        stocks.append(new_stock)
    pprint.pprint("hi")
    db.session.add_all(stocks)
    db.session.commit()
    print('stocks in table')
