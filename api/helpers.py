import uuid
from config.settings import S3_BUCKET, s3

from typing import Dict, Union


def construct_query(
    q: str, pos_q: Union[str, None], neg_q: Union[str, None]
) -> Dict[str, float]:
    query = {q.strip(): 1.0}

    if pos_q is not None:
        query[pos_q.strip()] = 0.75

    if neg_q is not None:
        query[neg_q.strip()] = -1.1

    return query


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
