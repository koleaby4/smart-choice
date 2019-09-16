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


def get_rules():
    with get_mongo_client() as client:
        rules = client[DATABASE_NAME][RULES_COLLECTION].find()
        return list(rules)


def insert_rule(data):
    with get_mongo_client() as client:
        rules = client[DATABASE_NAME][RULES_COLLECTION]
        rules.insert_one(data)
