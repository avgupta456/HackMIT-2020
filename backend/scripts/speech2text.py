import google.cloud.speech_v1p1beta1 as speech
from google.cloud.speech_v1p1beta1 import enums
from google.cloud.speech_v1p1beta1 import types


def transcribe_file(content):
    client = speech.SpeechClient()

    audio = types.RecognitionAudio(content=content)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.MP3,
        sample_rate_hertz=16000,
        language_code="en-US",
    )

    response = client.recognize(config, audio)

    try:
        text = response.results[0].alternatives[0].transcript
        return text[0].upper() + text[1:] + "?"
    except AttributeError:
        return ""
