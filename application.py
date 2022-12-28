from flask import Flask
from flask_restful import reqparse, Api
from flask_cors import CORS
# apis
from api.core import CoreAPIResource
from api.index import HealthResource
from api.wiki import WikiAPIResource


application = Flask(__name__, static_folder="build", static_url_path="/")
CORS(application)
api = Api(application)
parser = reqparse.RequestParser()
parser.add_argument("task")

# APIs
api.add_resource(HealthResource, "/api/health")
api.add_resource(CoreAPIResource, "/api/core")
api.add_resource(WikiAPIResource, "/api/wiki-img")


@application.route("/")
def ui():
    # static
    return application.send_static_file("index.html")
