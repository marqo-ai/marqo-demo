import os
import boto3, botocore

from dotenv import load_dotenv

load_dotenv()


# Marqo
MARQO_API_ENDPOINT = os.environ.get("MARQO_API_ENDPOINT", "")
MARQO_API_KEY = os.environ.get("MARQO_API_KEY", "")
SIMPLE_WIKI_INDEX_NAME = os.environ.get("SIMPLE_WIKI_INDEX_NAME", "")
BORED_APES_INDEX_NAME = os.environ.get("BORED_APES_INDEX_NAME", "")
SIMPLE_WIKI_SEARCHABLE_ATTRS = ["content"]
SIMPLE_WIKI_NON_TENSOR_FIELDS = ["url", "domain", "docDate"]
SIMPLE_WIKI_TENSOR_FIELDS = ["title", "content"]
BORED_APES_SEARCHABLE_ATTRS = ["image"]
IPFS_BASE = "https://ipfs.io/ipfs"

# S3
s3 = boto3.client(
   "s3",
   aws_access_key_id = os.environ.get("S3_KEY", ""),
   aws_secret_access_key = os.environ.get("S3_SECRET", "")
)
S3_BUCKET = os.environ.get("S3_BUCKET", "")
S3_LOCATION = f"https://{S3_BUCKET}.s3.amazonaws.com/"
