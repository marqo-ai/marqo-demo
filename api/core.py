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
    S3_BUCKET,
    SIMPLE_WIKI_INDEX_NAME,
    BORED_APES_INDEX_NAME,
    SIMPLE_WIKI_SEARCHABLE_ATTRS,
    BORED_APES_SEARCHABLE_ATTRS,
    # s3
    s3,
    S3_BUCKET_ACL,
    S3_LOCATION
)

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class MarqoBase:
    def get_ipfs_img(self, img_id: str):
        return f"{IPFS_BASE}/{img_id}"

    
    # def upload_file(self):
    #     if "user_file" not in request.files:
    #         return "No user_file key in request.files"

    #     file = request.files["user_file"]

    #     if file.filename == "":
    #         return "Please select a file"

    #     if file:
    #         file.filename = secure_filename(file.filename)
    #         output = send_to_s3(file, S3_BUCKET)
    #         return str(output)

    #     else:
    #         return redirect("/")

    # def upload_img_to_s3(self, img):
    #     try:
    #         s3.
        

    def search_simple_wiki(self, search_str=""):
        print(search_str)
        res = mq.index(SIMPLE_WIKI_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=SIMPLE_WIKI_SEARCHABLE_ATTRS,
            attributes_to_retrieve=["title", "url"],
            limit=10,
        )

        print(res)
        return res

    def search_bored_apes(self, search_str=""):
        return mq.index(BORED_APES_INDEX_NAME).search(
            q=search_str.strip(),
            searchable_attributes=BORED_APES_SEARCHABLE_ATTRS,
            show_highlights=False,
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
