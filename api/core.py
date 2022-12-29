import marqo
import json

from flask import request
from flask_restful import Resource
# local
from api.constants import HTTP_500_MISSING_Q
from config.settings import (
    IPFS_BASE,
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
    SIMPLE_WIKI_INDEX_NAME,
    BORED_APES_INDEX_NAME,
    SIMPLE_WIKI_SEARCHABLE_ATTRS,
    BORED_APES_SEARCHABLE_ATTRS,
)

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class MarqoBase:
    def get_ipfs_img(self, img_id: str):
        return f"{IPFS_BASE}/{img_id}"

    def search_simple_wiki(self, search_str=""):
        return mq.index(SIMPLE_WIKI_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=SIMPLE_WIKI_SEARCHABLE_ATTRS,
            limit=30,
        )

    def search_bored_apes(self, search_str=""):
        return mq.index(BORED_APES_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=BORED_APES_SEARCHABLE_ATTRS,
            limit=30,
        )


class CoreAPIResource(Resource, MarqoBase):
    core_index_choices = ["boredapes", "simplewiki"]

    def get(self):
        return {"message": "success"}

    def post(self):
        data = request.get_json()
        q =  data.get("q", "")
        index = data.get("index", None)

        if q and index in self.core_index_choices:
            return {
                "message": "success",
                "results": self.search_bored_apes(q) if index == "boredapes" else self.search_simple_wiki(q),
            }
        else:
            return HTTP_500_MISSING_Q
