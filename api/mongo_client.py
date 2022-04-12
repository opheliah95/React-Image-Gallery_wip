from pymongo import MongoClient
from dotenv import load_dotenv
import os

# sets up dotenv
load_dotenv("../.env")

# Added in env variables
PORT = os.environ.get("MONGODB_PORT", "27017")
USER = os.environ.get("MONGODB_ADMINUSERNAME", "root")
PASSWORD = os.environ.get("MONGODB_ADMINPASSWORD", "")
DB_HOST = os.environ.get("MONGODB_HOST", "mongo")

# create a connection to the client
client = MongoClient(
    host=DB_HOST,
    port=PORT,
    username=USER,
    password=PASSWORD,
)
