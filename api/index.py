from flask_restful import Resource


class HealthResource(Resource):
    def get(self):
        return {"message": "App is healthy"}
