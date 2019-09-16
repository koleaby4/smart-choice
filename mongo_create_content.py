import pymongo
import mongo_helpers
import json


def connect_to_database(db_name):
    mongo_client = mongo_helpers.get_mongo_client()
    message = f'database "{db_name}" already exists. OK.' if db_name in mongo_client.list_database_names(
    ) else f'creating database: {db_name}'
    print(message)

    return mongo_client[db_name]


def create_collections(db, desired_collections):
    existing_collections = db.list_collection_names()

    for collection_name in desired_collections:
        if collection_name not in existing_collections:
            print(f'Creating collection: {collection_name}')
            db[collection_name]
        else:
            print(f'Collection "{collection_name}" already exists. OK.')


def create_default_rules(db, file_path, collection_name):
    file_content = json.loads(open(file_path).read())
    print(
        f'Importing documents from "{file_path}" into "{collection_name}" collection...')
    db[collection_name].insert_many(file_content)


if __name__ == '__main__':

    db = connect_to_database(mongo_helpers.DATABASE_NAME)

    create_collections(
        db, [mongo_helpers.RULES_COLLECTION, mongo_helpers.COMPARISONS_COLLECTION])

    create_default_rules(db, './mongo_default_rules.json',
                         mongo_helpers.RULES_COLLECTION)

    print('Done')
