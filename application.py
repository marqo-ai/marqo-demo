from flask import Flask, Blueprint, render_template
from flask_restful import reqparse, Api, Resource
# apis
from api.core import CoreAPIResource
from api.index import HealthResource


application = Flask(__name__, static_folder="build", static_url_path="/")
api = Api(application)
parser = reqparse.RequestParser()
parser.add_argument("task")

# APIs
api.add_resource(HealthResource, "/api/health")
api.add_resource(CoreAPIResource, "/api/core")


@application.route("/")
def ui():
    # static
    return application.send_static_file("index.html")
