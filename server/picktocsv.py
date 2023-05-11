from cherrypicker import CherryPicker
import json
import pandas as pd

with open('sample.json') as file:
    data = json.load(file)

picker = CherryPicker(data)
flat = picker['data'].flatten().get()
df = pd.DataFrame(flat)
print(df)
df.to_csv (r'/Users/jonahpeck/Development/code/phase-5/StockPal/server/stocks.csv', index = None)
