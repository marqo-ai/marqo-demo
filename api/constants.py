from api.models import AdvancedSettings, SearchSettings
from config.settings import (
    SIMPLE_WIKI_INDEX_NAME,
    E_COMMERCE_INDEX_NAME,
    DIVERSE_IMAGES_INDEX_NAME,
)

# Responses
HTTP_500_MISSING_Q = {"message": "Missing parameters", "results": []}


DEFAULT_SEARCH_SETTINGS = SearchSettings(
    query_weight=1.0,
    pos_query_weight=0.75,
    neg_query_weight=-1.1,
    total_favourite_weight=0.5,
    prefix="",
    style_modifier="",
)

DEFAULT_ADVANCED_SETTINGS = AdvancedSettings(
    implicit_more_expansion=False,
    limit=100,
)


CORE_INDEX_CONFIGURATIONS = {
    "ecommerce": {
        "type": "image",
        "settings": {
            "index_name": E_COMMERCE_INDEX_NAME,
        },
    },
    "diverseimages": {
        "type": "image",
        "settings": {
            "index_name": DIVERSE_IMAGES_INDEX_NAME,
        },
    },
    "simplewiki": {
        "type": "text",
        "settings": {
            "index_name": SIMPLE_WIKI_INDEX_NAME,
            # "attributes_to_retrieve": ["title", "url", "image_url"],
        },
    },
}

PREFIX_MODIFIER_MAP = {
    "diverseimages": "a stock image of",
}
