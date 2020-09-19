from flask import Flask, request, Response
from flask_cors import CORS

import os
from dotenv import load_dotenv, find_dotenv

from scripts.gpt import GPT, Example, set_openai_key

from scripts.speech2text import transcribe_file
from scripts.text2speech import create_audio


app = Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"
CORS(app)

load_dotenv(find_dotenv(), override=True)
set_openai_key(os.getenv("GPT_SECRET_KEY", ""))


@app.route("/")
def hello_world():
    return "Hello, World!"


GPT_response = GPT(
    engine="davinci",
    temperature=0.5,
    max_tokens=1000,
    input_prefix="Me:",
    input_suffix="\n\n",
    output_suffix="\n\n",
)


def get_advice(person, question):
    GPT_response.set_premise("My conversation with " + person)
    GPT_response.set_output_prefix(person + ":")
    output = GPT_response.get_top_reply(question + " Explain.")
    return output


@app.route("/get_response", methods=["GET", "POST"])
def response():
    content = request.files["audio"].stream.read()
    text = transcribe_file(content)

    name = request.args.get("name").replace("-", " ")
    output = get_advice(name, text)

    audio_content = create_audio(output)
    return Response(audio_content, mimetype="audio/mpeg")


GPT_topic = GPT(engine="davinci", temperature=0.5, max_tokens=100)
GPT_topic.set_premise("What is the topic of the sentence?")
examples_topic = [
    ["Tell me about quantum mechanics", "Quantum Mechanics"],
    ["What is the key to entrepreneurship", "Entrepreneurship"],
    ["How can I become a better football player", "Football"],
]
for example in examples_topic:
    GPT_topic.add_example(Example(example[0], example[1]))

GPT_people = GPT(engine="davinci", temperature=0.5, max_tokens=100)
GPT_people.set_premise(
    "Who are famous and knowledge people in this field? Only return people!"
)
examples_people = [
    ["Quantum Mechanics", "Richard Feynman, Niels Bohr, Erwin Schrodinger"],
    ["Entrepreneurship", "Steve Jobs, Elon Musk, Bill Gates"],
    ["Football", "Tom Brady, Jerry Rice, Peyton Manning"],
]
for example in examples_people:
    GPT_people.add_example(Example(example[0], example[1]))


@app.route("/get_options", methods=["GET", "POST"])
def options():
    content = request.files["audio"].stream.read()
    question = transcribe_file(content)
    topic = GPT_topic.get_top_reply(question)
    people_str = GPT_people.get_top_reply(topic)
    people = [person.strip() for person in people_str.split(",")]
    out = {}
    for person in people:
        out[person] = get_advice(person, question).strip()
    print(out)
    return out


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
