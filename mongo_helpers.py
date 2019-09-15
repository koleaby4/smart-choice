import pymongo
import os

DATABASE_NAME = 'smart_choice_db'
RULES_COLLECTION = 'rules'

def connect_to_mongo():
    # MONGO_URI = os.environ.get('MONGO_URI')
    #
    try:
        # print(f'connecting to: {MONGO_URI}')
        connection = pymongo.MongoClient(os.environ.get('MONGO_CONNECTION_STRING'))
        print('connected...')
        return connection
    except pymongo.errors.ConnectionFailure as e:
        print(e)

def get_rules():
    with connect_to_mongo() as connect:
        rules = connect[DATABASE_NAME][RULES_COLLECTION].find()
        [print(rule) for rule in rules]
        return