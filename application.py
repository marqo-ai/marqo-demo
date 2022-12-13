from api.core import CoreAPIResource
from api.hello import Message

from flask import Flask, Blueprint, render_template
from flask_restful import reqparse, Api, Resource

application = Flask(__name__, static_folder="build", static_url_path="/")
api = Api(application)


@application.route("/api/health", methods=["GET"])
def health():
    return "<h1 style='color:blue'>Welcome to Marqo!</h1>"


# @application.route("/")
# def ui():
#     return app.send_static_file("index.html")


@application.route("/")
def home():
    return "<h1 style='color:blue'>Welcome to Marqo!</h1>"


parser = reqparse.RequestParser()
parser.add_argument("task")


api.add_resource(Message, "/api/hello")
api.add_resource(CoreAPIResource, "/api/core")
