import google.cloud.speech_v1p1beta1 as speech
from google.cloud.speech_v1p1beta1 import enums
from google.cloud.speech_v1p1beta1 import types

client = speech.SpeechClient()
config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.MP3,
    sample_rate_hertz=16000,
    language_code="en-US",
)


def transcribe_file(content):

    audio = types.RecognitionAudio(content=content)
    response = client.recognize(config, audio)

    try:
        text = response.results[0].alternatives[0].transcript
        return text[0].upper() + text[1:] + "?"
    except IndexError:
        return ""
