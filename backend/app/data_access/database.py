import motor.motor_asyncio
from dotenv import load_dotenv
import os


load_dotenv()

# MongoDB in container connection string: mongodb://user:pass@localhost:27018/?authSource=admin
'''
connection_string = "mongodb://{}:{}@{}:{}/?authMechanism=DEFAULT&authSource={}".format(
    os.getenv("MONGO_USER", ""),
    os.getenv("MONGO_PASS", ""),
    os.getenv("MONGO_DB_HOST", ""),
    os.getenv("MONGO_DB_PORT", ""),
    os.getenv("MONGO_COLLECTION")
)
'''

# MongoDB in container connection string: mongodb://user:pass@localhost:27018/?authSource=admin
connection_string = "mongodb://{}:{}@{}:{}/?authSource={}".format(
    os.getenv("MONGO_USER", ""),
    os.getenv("MONGO_PASS", ""),
    os.getenv("MONGO_DB_HOST", ""),
    os.getenv("MONGO_DB_PORT", ""),
    os.getenv("MONGO_AUTH_SOURCE", "")
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
