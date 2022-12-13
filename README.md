# [aws-flask-app](https://github.com/marqo-ai/aws-flask-app)

## Running the app in development

1. `python3 -m venv .venv && source .venv/bin/activate && pip3 install -r requirements.txt`

2. `source .venv/bin/activate && gunicorn -b 0.0.0.0:5000 wsgi:app`
