from google.cloud import texttospeech

# Instantiates a client, select config
client = texttospeech.TextToSpeechClient()
audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)


def create_audio(text):
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # Build the voice request
    voice = texttospeech.VoiceSelectionParams(language_code="en-US")

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    return response.audio_content
