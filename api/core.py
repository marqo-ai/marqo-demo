import marqo
import json

from flask import request
from flask_restful import Resource

# local
from api.constants import HTTP_500_MISSING_Q
from api.helpers import BotoCoreBase, generate_key_prefix, construct_query
from config.settings import (
    IPFS_BASE,
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
    SIMPLE_WIKI_INDEX_NAME,
    BORED_APES_INDEX_NAME,
    E_COMMERCE_INDEX_NAME,
    SIMPLE_WIKI_SEARCHABLE_ATTRS,
    BORED_APES_SEARCHABLE_ATTRS,
    E_COMMERCE_SEARCHABLE_ATTRS,
    SIMPLE_WIKI_TENSOR_FIELDS,
    S3_LOCATION,
)

from typing import List

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class MarqoBase:
    def get_ipfs_img(self, img_id: str):
        return f"{IPFS_BASE}/{img_id}"

    def search_text(
        self,
        search_str="",
        index_name: str = "",
        searchable_attrs: List[str] = None,
        tensor_fields: List[str] = None,
        attributes_to_retrieve: List[str] = None,
    ):
        _split_len = len(search_str.split(" "))
        _method = "TENSOR" if _split_len > 1 else "LEXICAL"
        _search_attrs = searchable_attrs if _split_len > 1 else tensor_fields

        response = mq.index(index_name).search(
            q=search_str.strip(),
            searchable_attributes=_search_attrs,
            attributes_to_retrieve=attributes_to_retrieve,
            limit=20,
            search_method=_method,
        )

        if len(response["hits"]) == 0:
            # defaults to TENSOR
            response = mq.index(index_name).search(
                q=search_str.strip(),
                searchable_attributes=_search_attrs,
                attributes_to_retrieve=attributes_to_retrieve,
                limit=20,
            )

        return response

    def search_image(
        self,
        search_str="",
        pos_q=None,
        neg_q=None,
        img=None,
        index_name: str = "",
        searchable_attrs: List[str] = None,
    ):
        img_url = ""

        if img is not None:
            boto_conn = BotoCoreBase()
            key = f"{generate_key_prefix()}-{img.filename.replace(' ', '')}"
            is_uploaded = boto_conn.upload_to_bucket(key, img)

            if is_uploaded is None:
                img_url = f"{S3_LOCATION}{key}"

        hits = mq.index(index_name).search(
            q=construct_query(search_str, pos_q, neg_q)
            if img is None or img_url == ""
            else img_url,
            searchable_attributes=searchable_attrs,
            show_highlights=False,
            limit=30,
        )

        if img is not None and is_uploaded is None and hits:
            boto_conn.delete_from_bucket(key=key)

        return hits


class CoreAPIResource(Resource, MarqoBase):
    core_index_configurations = {
        "ecommerce": {
            "type": "image",
            "settings": {
                "searchable_attrs": E_COMMERCE_SEARCHABLE_ATTRS,
                "index_name": E_COMMERCE_INDEX_NAME,
            },
        },
        "boredapes": {
            "type": "image",
            "settings": {
                "searchable_attrs": BORED_APES_SEARCHABLE_ATTRS,
                "index_name": BORED_APES_INDEX_NAME,
            },
        },
        "simplewiki": {
            "type": "text",
            "settings": {
                "searchable_attrs": SIMPLE_WIKI_SEARCHABLE_ATTRS,
                "tensor_fields": SIMPLE_WIKI_TENSOR_FIELDS,
                "index_name": SIMPLE_WIKI_INDEX_NAME,
                "attributes_to_retrieve": ["title", "url", "image_url"],
            },
        },
    }

    def get(self):
        return {"message": "success"}

    def post(self):
        files = request.files
        img = files.get("img", None)
        data = dict(request.form)

        if img is None:
            data = request.get_json()

        q = data.get("q", "")
        pos_q = data.get("posQ")
        neg_q = data.get("negQ")
        index = data.get("index", "")

        if index in self.core_index_configurations:
            search_settings = self.core_index_configurations[index]
            if search_settings["type"] == "text":
                results = self.search_text(search_str=q, **search_settings["settings"])
            else:
                results = self.search_image(
                    search_str=q,
                    pos_q=pos_q,
                    neg_q=neg_q,
                    img=img,
                    **search_settings["settings"],
                )
            return {"message": "success", "results": results}
        else:
            return HTTP_500_MISSING_Q
