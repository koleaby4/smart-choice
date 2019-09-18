import pymongo
import os

DATABASE_NAME = 'smart_choice_db'
RULES_COLLECTION = 'rules'
COMPARISONS_COLLECTION = 'comparisons'


def get_mongo_client():
    try:
        client = pymongo.MongoClient(
            os.environ.get('MONGO_CONNECTION_STRING'))
        print('connected...')
        return client
    except pymongo.errors.ConnectionFailure as e:
        print(f'Failed connecting to database.\n{e}')
        raise

def get_mongo_db_handler():
    with get_mongo_client() as db_client:
        return db_client[DATABASE_NAME]

def get_rules():
    db = get_mongo_db_handler()
    rules = db[RULES_COLLECTION].find()
    return list(rules)

def insert_rule(data):
    db = get_mongo_db_handler()
    rules = db[RULES_COLLECTION]
    rules.insert_one(data)
