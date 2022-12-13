import uuid
from config.settings import S3_BUCKET, s3


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
                "ContentType": file.content_type    #Set appropriate content type as per the file
            }
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
