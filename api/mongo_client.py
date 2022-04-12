from pymongo import MongoClient
from dotenv import load_dotenv
import os

# sets up dotenv
load_dotenv(dotenv_path="./.env.local")

# Added in env variables

PORT = int(os.environ.get("MONGODB_PORT", 27017))
USER = os.environ.get("MONGODB_ADMINUSERNAME", "admin")
PASSWORD = os.environ.get("MONGODB_ADMINPASSWORD", "pass")
DB_HOST = os.environ.get("MONGODB_HOST", "mongo")

# create a connection to the client
client = MongoClient(
    host=DB_HOST,
    port=PORT,
    username=USER,
    password=PASSWORD,
)


# insert documents into the database
def insert_test_documents():
    """Insert data into the database"""
    db = client.image_db
    collection = db["items"]
    data = {
        "image_name": "Test",
        "image_url": "test.com",
        "image_description": "this is a test image",
    }
    id = collection.insert_one(data).inserted_id
    print(f"inserted {id}")
