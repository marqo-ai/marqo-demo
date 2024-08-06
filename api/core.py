import marqo
import json

from flask import request
from flask_restful import Resource

# local
from api.models import AdvancedSettings, SearchSettings, ImageSearchHit, TextSearchHit
from api.constants import (
    CORE_INDEX_CONFIGURATIONS,
    HTTP_500_MISSING_Q,
    DEFAULT_ADVANCED_SETTINGS,
    DEFAULT_SEARCH_SETTINGS,
    PREFIX_MODIFIER_MAP,
)
from api.helpers import BotoCoreBase, generate_key_prefix, compose_query
from config.settings import (
    IPFS_BASE,
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
    SIMPLE_WIKI_INDEX_NAME,
    E_COMMERCE_INDEX_NAME,
    S3_LOCATION,
)

from typing import List, Union

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class MarqoBase:
    def get_ipfs_img(self, img_id: str):
        return f"{IPFS_BASE}/{img_id}"

    def search_text(
        self,
        q: str = None,
        advanced_settings: AdvancedSettings = None,
        attributes_to_retrieve: List[str] = None,
        index_name: str = "",
    ) -> List[dict]:
        result = mq.index(index_name).search(
            q=q,
            limit=10,
            attributes_to_retrieve=["title"],
        )

        response = {
            "hits": [
                TextSearchHit.from_dict(hit).as_camel_dict() for hit in result["hits"]
            ]
        }
        return response

    def search_image(
        self,
        q: str = None,
        advanced_settings: AdvancedSettings = None,
        index_name: str = "",
    ) -> List[dict]:
        result = mq.index(index_name).search(
            q=q,
            show_highlights=False,
            limit=advanced_settings.limit,
        )

        response = {
            "hits": [
                ImageSearchHit.from_dict(hit).as_camel_dict() for hit in result["hits"]
            ]
        }
        return response


class CoreAPIResource(Resource, MarqoBase):
    def get(self):
        return {"message": "success"}

    def post(self) -> dict:
        files = request.files
        img = files.get("img", None)
        data = dict(request.form)

        if img is None:
            data = request.get_json()

        q = data.get("q", "")
        pos_q = data.get("posQ")
        neg_q = data.get("negQ")
        index = data.get("index", "")
        favourites = data.get("favourites", [])

        advanced_settings = data.get("advancedSettings", DEFAULT_ADVANCED_SETTINGS)
        if isinstance(advanced_settings, dict):
            advanced_settings = AdvancedSettings.from_dict(advanced_settings)

        query_settings = data.get("searchSettings", DEFAULT_SEARCH_SETTINGS)
        if isinstance(query_settings, dict):
            query_settings = SearchSettings.from_dict(query_settings)

        # currently not configurable via the UI
        query_settings.prefix = PREFIX_MODIFIER_MAP.get(index, "")

        if index in CORE_INDEX_CONFIGURATIONS:
            search_settings = CORE_INDEX_CONFIGURATIONS[index]

            img_url = None
            if img is not None:
                boto_conn = BotoCoreBase()
                key = f"{generate_key_prefix()}-{img.filename.replace(' ', '')}"
                is_uploaded = boto_conn.upload_to_bucket(key, img)

                if is_uploaded is None:
                    img_url = f"{S3_LOCATION}{key}"

            if img_url:
                marqo_query = img_url
            else:
                marqo_query = compose_query(
                    query=q,
                    more_of=pos_q,
                    less_of=neg_q,
                    favourites=favourites,
                    search_settings=query_settings,
                    advanced_settings=advanced_settings,
                )

            if search_settings["type"] == "text":
                results = self.search_text(
                    q=marqo_query,
                    advanced_settings=advanced_settings,
                    **search_settings["settings"],
                )
            else:
                results = self.search_image(
                    q=marqo_query,
                    advanced_settings=advanced_settings,
                    **search_settings["settings"],
                )

            if img is not None and is_uploaded is None and results:
                boto_conn.delete_from_bucket(key=key)

            return {"message": "success", "results": results}

        return HTTP_500_MISSING_Q
