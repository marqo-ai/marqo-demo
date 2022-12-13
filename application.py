import os

from flask import Flask, Blueprint, render_template
from flask_restful import reqparse, Api, Resource
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder="build", static_url_path="/")
# api = Api(app)


# @app.route("/api/health", methods=["GET"])
# def health():
#     return "<h1 style='color:blue'>Welcome to Marqo!</h1>"

# @app.route("/")
# def ui():
#     return app.send_static_file("index.html")


@app.route("/")
def home():
    return "<h1 style='color:blue'>Welcome to Marqo!</h1>"


# parser = reqparse.RequestParser()
# parser.add_argument("task")


# class Message(Resource):
#     def get(self):
#         return {"message": "Hello World"}


# api.add_resource(Message, "/api/hello")
