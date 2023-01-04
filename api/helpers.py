import uuid
from config.settings import S3_BUCKET, s3


def generate_key_prefix():
    return uuid.uuid4()

class BotoCoreBase:
    def upload_to_bucket(self, key, filename, bucket=S3_BUCKET):
        return s3.upload_file(
            Filename=filename,
            Bucket=bucket,
            Key=key,
        )

    def delete_from_bucket(self, key, bucket=S3_BUCKET):
        try:
            s3.delete_object(
                Bucket=bucket,
                Key=key,
            )
            return True
        except Exception as err:
            return False
