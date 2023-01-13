# [marqo-demo](https://github.com/marqo-ai/marqo-demo)

<p align="center">
    <a href="https://demo.marqo.ai/?q=smiling+with+glasses&index=boredapes"><img src="https://github.com/marqo-ai/marqo/raw/mainline/assets/demo-short.gif"></a>
</p>

## Setting up the app for the first time

1. Duplicate contents of `.env.template` to a new `.env` file and replace the values accordingly.

2. Run `./setup.sh`

## Running the app in development

1. Run `./run.sh`

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
