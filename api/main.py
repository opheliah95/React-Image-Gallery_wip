from flask import request, Flask, jsonify
from requests import get
from dotenv import load_dotenv
import os
from flask_cors import CORS
from mongo_client import client
import json
from bson import json_util
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
# load in env variables
load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = os.getenv("UNSPLASH_URL", "")
UNSPLASH_KEY = os.getenv("UNSPLASH_KEY", "")
DEBUG = bool(os.getenv("DEBUG", True))

# enable debug mode
app.config["DEBUG"] = DEBUG

# create database instances and collection
gallery = client.gallery
image_collection = gallery.images


@app.route("/")
def hello():
    return "Hello world"


if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file that has an unsplash key")


@app.route("/new-image")
def get_image():
    search_word = request.args.get("query")
    payload = {"query": search_word}
    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version": "v1",
    }

    response = get(url=UNSPLASH_URL, params=payload, headers=headers)
    data = response.json()
    # a list of parameters that will be interest to us
    image = data["urls"]["small"]
    print(image)
    return response.json()


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from the database
        # fix request content type
        search = {}
        try:
            search = request.get_json(force=True)
        except:
            print("there is a error")
        print("the search is: ", search)
        # convert pymongo into list
        results = list(image_collection.find(search))
        print(results)
        if len(results) > 0:
            # sanitize json object id
            result_json = jsonify([json.loads(json_util.dumps(img)) for img in results])
            return result_json
        else:
            return jsonify(
                {
                    "error": f"there is no matching result for {search}",
                }
            )
    if request.method == "POST":
        # save images from the database
        image = request.get_json()

        # update object type to string val only
        image["_id"] = str(image["id"])
        image["saved"] = True
        print("the image is: ", image)
        result = image_collection.insert_one(image)

        return jsonify(
            {
                "result": f"The post request is successful"
                f" and id is {result.inserted_id}",
                "saved": image["saved"],
                "inserted_id": result.inserted_id,
            }
        )


@app.route("/images/<image_id>", methods=["DELETE"])
def delete_images(image_id):
    if request.method == "DELETE":
        # delete from database
        myquery = {"_id": image_id}
        query_state = image_collection.find_one(myquery)
        print(query_state)
        result = image_collection.delete_one(myquery)
        print(result)
        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(port=5050, host="0.0.0.0")
