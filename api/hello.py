from flask_restful import Resource


class Message(Resource):
    def get(self):
        return {"message": "Hello World"}
