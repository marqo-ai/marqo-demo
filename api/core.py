import marqo
import json

from flask import request
from flask_restful import Resource
from werkzeug.datastructures import ImmutableMultiDict
# local
from api.constants import HTTP_500_MISSING_Q
from api.helpers import BotoCoreBase, generate_key_prefix
from config.settings import (
    IPFS_BASE,
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
    S3_BUCKET,
    SIMPLE_WIKI_INDEX_NAME,
    BORED_APES_INDEX_NAME,
    SIMPLE_WIKI_SEARCHABLE_ATTRS,
    BORED_APES_SEARCHABLE_ATTRS,
    SIMPLE_WIKI_TENSOR_FIELDS,
    # s3
    s3,
    S3_LOCATION
)

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class MarqoBase:
    def get_ipfs_img(self, img_id: str):
        return f"{IPFS_BASE}/{img_id}"  

    def search_simple_wiki(self, search_str=""):
        _split_len = len(search_str.split(" "))
        _method = "TENSOR" if _split_len > 1 else "LEXICAL"
        _search_attrs = SIMPLE_WIKI_SEARCHABLE_ATTRS if _split_len > 1 else SIMPLE_WIKI_TENSOR_FIELDS
        
        response = mq.index(SIMPLE_WIKI_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=_search_attrs,
            attributes_to_retrieve=["title", "url"],
            limit=10,
            search_method=_method,
        )

        if len(response["hits"]) == 0:
            # defaults to TENSOR
            response = mq.index(SIMPLE_WIKI_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=_search_attrs,
            attributes_to_retrieve=["title", "url"],
            limit=10,
        )

        return response

    def search_bored_apes(self, search_str="", img=None):
        img_url = ""

        if img is not None:
            boto_conn = BotoCoreBase()
            key = f"{generate_key_prefix()}-{img.filename.replace(' ', '')}"
            is_uploaded = boto_conn.upload_to_bucket(key, img)

            if is_uploaded is None:
                img_url = f"{S3_LOCATION}{key}"

        hits = mq.index(BORED_APES_INDEX_NAME).search(
            q=search_str.strip() if img is None or img_url == "" else img_url,
            searchable_attributes=BORED_APES_SEARCHABLE_ATTRS,
            show_highlights=False,
            limit=30,
        )

        if img is not None and is_uploaded is None and hits:
            boto_conn.delete_from_bucket(key=key)

        return hits

class CoreAPIResource(Resource, MarqoBase):
    core_index_choices = ["boredapes", "simplewiki"]

    def get(self):
        return {"message": "success"}

    def post(self):
        files = request.files
        img = files.get("img", None)
        data = dict(request.form)

        if img is None:
            data = request.get_json()
            
        q =  data.get("q", "")
        index = data.get("index", "")

        if index in self.core_index_choices and img is not None:
            return {
                "message": "success",
                "results": self.search_bored_apes(q, img) if index == "boredapes" else self.search_simple_wiki(q),
            }
        elif q and index in self.core_index_choices:
            return {
                "message": "success",
                "results": self.search_bored_apes(q) if index == "boredapes" else self.search_simple_wiki(q),
            }
        else:
            return HTTP_500_MISSING_Q
