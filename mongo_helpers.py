import pymongo
import os
from bson.objectid import ObjectId
import json

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
    return list(rules_collection_handler().find().sort("timestamp", -1))


def get_rule(id):
    return rules_collection_handler().find_one(objectid_filter(id))


def get_comparison(id):
    return comparisons_collection_handler().find_one(objectid_filter(id))


def get_comparisons():
    return list(comparisons_collection_handler().find().sort("timestamp", -1))


def mongo_collection_handler(collection_name):
    return mongo_db_handler()[collection_name]


def rules_collection_handler():
    return mongo_collection_handler(RULES_COLLECTION)


def comparisons_collection_handler():
    return mongo_collection_handler(COMPARISONS_COLLECTION)


def upsert_rule(data, rule_id):
    filter = objectid_filter(rule_id) if rule_id else {'_id': ObjectId()}
    outcome = rules_collection_handler().replace_one(filter, data, upsert=True)

    # ToDo: move http responses into app.py?
    if outcome.acknowledged:
        return {'status': 200, "message": f'rule with id {filter["_id"]} was saved'}
    else:
        return {'status': 500, "message": f'Failed saving rule with payload:\n{json.dumps(data, indent=4)}'}


def save_comparison(data):
    outcome = comparisons_collection_handler().insert_one(data)

    # ToDo: move http responses into app.py?
    if outcome.acknowledged:
        return {'status': 201, "message": f'comparison with id {outcome.inserted_id} was created'}
    else:
        return {'status': 500, "message": f'Failed saving comparison with payload:\n{json.dumps(outcome, indent=4)}'}


def delete_rule(id):
    outcome = rules_collection_handler().delete_one(objectid_filter(id))
    if outcome.deleted_count:
        return {'status': 200, "message": f'rule with id {id} was deleted'}
    else:
        raise pymongo.errors.OperationFailure(
            f'failed deleting rule with id {id}. Server response: {outcome}')


def delete_comparison(id):
    outcome = comparisons_collection_handler().delete_one(objectid_filter(id))
    if outcome.deleted_count:
        return {'status': 200, "message": f'comparison with id {id} was deleted'}
    else:
        raise pymongo.errors.OperationFailure(
            f'failed deleting comparison with id {id}. Server response: {outcome}')


def objectid_filter(id):
    return {'_id': ObjectId(id)}
