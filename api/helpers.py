import uuid
from api.constants import DEFAULT_SEARCH_SETTINGS, DEFAULT_ADVANCED_SETTINGS
from config.settings import S3_BUCKET, s3
from api.models import AdvancedSettings, SearchSettings
from typing import Dict, Union, List


def compose_query(
    query: str,
    more_of: str,
    less_of: str,
    favourites: List[str],
    search_settings: SearchSettings = None,
    advanced_settings: AdvancedSettings = None,
) -> Dict[str, float]:
    if not search_settings:
        search_settings = DEFAULT_SEARCH_SETTINGS

    if not advanced_settings:
        advanced_settings = DEFAULT_ADVANCED_SETTINGS

    prefix = search_settings.prefix
    style_modifier = search_settings.style_modifier

    composed_query = {}

    if more_of:
        if advanced_settings and advanced_settings.implicit_more_expansion:
            more_term = query + ", " + more_of
        else:
            more_term = more_of
        composed_query[more_term] = search_settings.pos_query_weight

    if less_of:
        composed_query[less_of] = search_settings.neg_query_weight

    total_fav_weight = search_settings.total_favourite_weight

    for favourite in favourites:
        composed_query[favourite] = total_fav_weight / len(favourites)

    if query:
        main_term = query

        if not style_modifier and prefix:
            main_term = prefix + " " + query
        elif style_modifier:
            main_term = style_modifier.replace("<QUERY>", query)
        composed_query[main_term] = search_settings.query_weight

    if not composed_query:
        return {"": 1}

    return composed_query


def generate_key_prefix():
    return uuid.uuid4()


class BotoCoreBase:
    def upload_to_bucket(self, key, file, bucket=S3_BUCKET, acl="public-read"):
        return s3.upload_fileobj(
            file,
            bucket,
            key,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type,  # Set appropriate content type as per the file
            },
        )

    def delete_from_bucket(self, key, bucket=S3_BUCKET):
        try:
            s3.delete_object(
                Bucket=bucket,
                Key=key,
            )
            return True
        except Exception as err:
            print(err)
            return False
