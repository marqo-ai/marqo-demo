import marqo

from flask import request
from flask_restful import Resource

# local
from api.models import ImageSearchHit
from api.constants import CORE_INDEX_CONFIGURATIONS, HTTP_500_MISSING_Q
from config.settings import (
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
)

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class RecommendationAPIResource(Resource):
    def get(self):
        return {"message": "success"}

    def post(self) -> dict:
        data = request.get_json()

        item_id = data.get("itemID")
        limit = data.get("limit")
        index = data.get("index", "")
        offset = data.get("offset", 0)

        if index in CORE_INDEX_CONFIGURATIONS:
            search_settings = CORE_INDEX_CONFIGURATIONS[index]
            index_name = search_settings["settings"]["index_name"]

            item_with_facets = mq.index(index_name).get_document(
                document_id=item_id, expose_facets=True
            )
            vec = item_with_facets["_tensor_facets"][0]["_embedding"]
            results = mq.index(index_name).search(
                q={"": 0},
                context={"tensor": [{"vector": vec, "weight": 1}]},
                filter_string=f"NOT _id:{item_id}",
                offset=offset,
                limit=limit,
            )
            response = {
                "hits": [
                    ImageSearchHit.from_dict(hit).as_camel_dict()
                    for hit in results["hits"]
                ]
            }
            return {"message": "success", "results": response}

        return HTTP_500_MISSING_Q
