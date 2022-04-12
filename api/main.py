from flask import Flask,request

app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello world"

@app.route("/new-image")
def get_image():
  search_word = request.args.get('query')
  return {"word searched": search_word}

if __name__ =="__main__":
  app.run(port=5050, host="0.0.0.0")