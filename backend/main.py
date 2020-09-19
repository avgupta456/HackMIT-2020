from flask import Flask, request
from flask_cors import CORS

import os
from dotenv import load_dotenv, find_dotenv

from scripts.gpt import GPT, set_openai_key

from scripts.speech2text import transcribe_file


app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app)

load_dotenv(find_dotenv(), override=True)
set_openai_key(os.getenv("GPT_SECRET_KEY", ""))


@app.route("/")
def hello_world():
    return "Hello, World!"


GPT_test = GPT(
    engine="davinci",
    temperature=0.5,
    max_tokens=1000,
    input_prefix="Me:",
    input_suffix="\n\n",
    output_suffix="\n\n",
)


@app.route("/test", methods=["GET", "POST"])
def test():
    content = request.files["audio"].stream.read()
    text = transcribe_file(content)

    name = request.args.get("name").replace("-", " ")
    print(name)

    print(text)
    GPT_test.set_premise("My conversation with " + name)
    GPT_test.set_output_prefix(name + ":")
    return GPT_test.get_top_reply(text + " Explain.")


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
