import pymongo
import os
from bson.objectid import ObjectId

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


def mongo_db_handler():
    with get_mongo_client() as db_client:
        return db_client[DATABASE_NAME]


def get_rules():
    return list(rules_collection_handler().find())


def get_rule(id):
    return rules_collection_handler().find_one(objectid_filter(id))


def mongo_collection_handler(collection_name):
    return mongo_db_handler()[collection_name]


def rules_collection_handler():
    return mongo_collection_handler(RULES_COLLECTION)


def upsert_rule(data):
    filter = objectid_filter(data['_id']) if data.get(
        '_id') else {'_id': ObjectId()}
    print(filter)
    return rules_collection_handler().update(filter, data, upsert=True)


def delete_rule(id):
    outcome = rules_collection_handler().delete_one(objectid_filter(id))
    if outcome.deleted_count:
        return {'status': 200, "message": f'rule with id {id} was deleted'}
    else:
        raise pymongo.errors.OperationFailure(
            f'failed deleting rule with id {id}. Server response: {outcome}')


def objectid_filter(id):
    return {'_id': ObjectId(id)}
