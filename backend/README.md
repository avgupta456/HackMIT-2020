# Backend

### Local Development

```
poetry install
poetry run python main.py
```

### Deploy to GAE

```
poetry export --without-hashes --format=requirements.txt > requirements.txt
gcloud app deploy
```

Visible here: https://hackmit-2020-290013.ue.r.appspot.com

### Sample .env:

GPT_SECRET_KEY = <Your OpenAI Secret Key>

GOOGLE_APPLICATION_CREDENTIALS = <Path to your key.json file>
