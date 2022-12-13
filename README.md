# [aws-flask-app](https://github.com/marqo-ai/aws-flask-app)

## Setting up the app for the first time

1. Duplicate contents of `.env.template` to a new `.env` file and replace the values accordingly.

2. Simply run `./setup.sh`

## Running the app in development

1. Simply run `./run.sh`

## Sample `curl` requests

### Simple Wiki

```
curl --request POST \
            --url https://yourendpoint/indexes/yourindex/search \
            --header 'Content-Type: application/json' \
            --header 'X-API-Key: secretkey' \
            --data '{
                    "q": "Space hippo",
                "searchableAttributes": ["title", "content"],
                "limit": 30,
                "showHighlights": true,
                "filter": "*:*",
                "searchMethod": "TENSOR"
            }'
```
