import motor.motor_asyncio
from dotenv import load_dotenv
import os


load_dotenv()

connection_string = "mongodb://{}:{}@{}:{}/?authMechanism=DEFAULT&authSource={}".format(
    os.getenv("MONGO_USER", ""),
    os.getenv("MONGO_PASS", ""),
    os.getenv("MONGO_DB_HOST", ""),
    os.getenv("MONGO_DB_PORT", ""),
    os.getenv("MONGO_COLLECTION")
)

client = motor.motor_asyncio.AsyncIOMotorClient(connection_string)
db = client["pathology-ai"] # input name of database in mongo-db 



def getGridFsBucket():
    fs = motor.motor_asyncio.AsyncIOMotorGridFSBucket(db)
    return fs


def getDB():
    return db

def getCollection(collection):
    return db[collection]

def shutdown():
    client.close()
