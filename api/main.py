from flask import request, Flask
from requests import get
from dotenv import load_dotenv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# load in env variables
load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = os.getenv("UNSPLASH_URL", "")
UNSPLASH_KEY = os.getenv("UNSPLASH_KEY", "")
DEBUG = bool(os.getenv("DEBUG", True))

# enable debug mode
app.config["DEBUG"] = DEBUG


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


if __name__ == "__main__":
    app.run(port=5050, host="0.0.0.0")
