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
    print("Deleting Users")

    new_user_1 = User(username="Jonah",email="J@gmail.com",password_hash = "test")
    new_user_2 = User(username="Maile",email="M@gmail.com",password_hash = "test")
    new_user_3 = User(username="Breck",email="B@gmail.com",password_hash = "test")
    users_all = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users_all)
    db.session.commit()
    print("data in table")

# import .venv/lib/config

# url = "https://alpha-vantage.p.rapidapi.com/query?interval=1min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact"

# # querystring = {"lat":"39.7392","lon":"-104.9903","per_page":"10","radius":"100"}

# headers = {
#         'content-type': 'application/octet-stream',
# 		'X-RapidAPI-Key': 'edb1bf48b1mshbd062dbf0793c2dp15ddf4jsndd1028a99649',
# 		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
# }

# response = requests.request("GET", url, headers=headers, params=querystring)

# data = response.text
# parse_json = json.loads(data)
# cleaned_data = json.dumps(parse_json, indent=4)

# print(cleaned_data)

# with open("sample.csv", "w") as outfile:
#     outfile.write(cleaned_data)

import pandas as pd
# df = pd.read_json (r'/Users/jonahpeck/Development/code/phase-5/StockPal/server/sample.json')
# df.to_csv (r'/Users/jonahpeck/Development/code/phase-5/StockPal/server/stocks.csv', index = None)


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
