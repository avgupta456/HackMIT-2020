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
examples_response = [
    [
        "What is your favorite childhood memory?",
        """I have a lot of favorite childhood memories. One that stands out was when
         my parents rented a house in Woodside, California, for a summer. It was a
         2-story house and I would ride my bicycle down the hill, through the woods
         and along a creek that led to a swimming hole. I spent hours exploring that
         creek and it remains very vivid in my mind.""",
    ],
]
for example in examples_response:
    GPT_response.add_example(Example(example[0], example[1]))


def get_advice(person, question):
    GPT_response.set_premise("My conversation with " + person)
    GPT_response.set_output_prefix(person + ":")
    output = GPT_response.get_top_reply(question + " Explain.")
    return output


def get_options(question):
    topic = GPT_topic.get_top_reply(question)
    people_str = GPT_people.get_top_reply(topic)
    people = [person.strip() for person in people_str.split(",")]
    out = {}
    for person in people:
        out[person] = get_advice(person, question).strip()
    return out


@app.route("/get_text", methods=["GET", "POST"])
def get_text():
    question = request.args.get("question")
    name = request.args.get("name")
    if name:
        return get_advice(name, question)
    else:
        return get_options(question)


@app.route("/get_audio", methods=["GET", "POST"])
def get_audio():
    text = request.args.get("text")
    print(text)
    audio_content = create_audio(text)
    return Response(audio_content, mimetype="audio/mpeg")


@app.route("/get_response", methods=["GET", "POST"])
def response():
    content = request.files["audio"].stream.read()
    text = transcribe_file(content)

    name = request.args.get("name")
    print(name)
    output = get_advice(name, text)
    return {"input": text, "output": output}


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
    return get_options(question)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
