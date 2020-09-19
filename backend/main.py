from flask import Flask, request
from flask_cors import CORS

import os
from dotenv import load_dotenv, find_dotenv

import openai
from scripts.gpt import GPT, Example, set_openai_key

from scripts.speech2text import transcribe_file


app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app)

load_dotenv(find_dotenv(), override=True)
set_openai_key(os.getenv("GPT_SECRET_KEY", ""))


@app.route("/")
def hello_world():
    return "Hello, World!"


GPT_test = GPT(engine="ada", temperature=0.5, max_tokens=200)


@app.route("/test", methods=["GET", "POST"])
def test():
    content = request.files["audio"].stream.read()
    print(transcribe_file(content))
    GPT_test.set_premise("Could you summarize this in an easy to understand manner?")
    return GPT_test.get_top_reply("What is general relativity")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
