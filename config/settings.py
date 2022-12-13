import os

from dotenv import load_dotenv

load_dotenv()


# Marqo
MARQO_API_ENDPOINT = os.environ["MARQO_API_ENDPOINT"]
MARQO_API_KEY = os.environ["MARQO_API_KEY"]
SIMPLE_WIKI_INDEX_NAME = os.environ["SIMPLE_WIKI_INDEX_NAME"]
BORED_APES_INDEX_NAME = os.environ["BORED_APES_INDEX_NAME"]
SIMPLE_WIKI_SEARCHABLE_ATTRS = ["title", "content"]
SIMPLE_WIKI_NON_TENSOR_FIELDS = ["url", "domain", "docDate"]
SIMPLE_WIKI_TENSOR_FIELDS = ["title", "content"]
BORED_APES_SEARCHABLE_ATTRS = ["image"]
IPFS_BASE = "https://ipfs.io/ipfs"
