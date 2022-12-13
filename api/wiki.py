import marqo
import requests

from flask import request
from flask_restful import Resource
from queue import Queue
# local
from api.threading import CPUTaskSupports
from api.constants import HTTP_500_MISSING_Q
from config.settings import (
    MARQO_API_ENDPOINT,
    MARQO_API_KEY,
)

mq = marqo.Client(api_key=MARQO_API_KEY, url=MARQO_API_ENDPOINT)


class WikiAPIResource(Resource):
    def get(self):
        return {"message": "success"}

    def get_wiki_image(self, title):
        params = {
            "action": "query",
            "format": "json",
            "titles": title,
            "prop": "pageimages",
            "piprop": "original"
        }
 
        response = requests.get("https://wikipedia.org/w/api.php", params=params)
        json_data = response.json()
        
        if next(iter(json_data["query"]["pages"])) == "-1":
            # Page/Article no longer exists.
            return -1
        
        page = next(iter(json_data["query"]["pages"].values()))
        
        if "original" in page:
            image_url = page["original"]["source"]
            return image_url
        else:
            # Page has no image
            return -2

    def post(self):
        data = request.get_json()
        title = data.get("title", "")
        
        if title:
            return {
                "message": "success",
                "img": self.get_wiki_image(title),
            }
        else:
            return HTTP_500_MISSING_Q


class WikiImgsAPIResource(Resource, CPUTaskSupports):

    def get(self):
        return {"message": "success"}

    def get_wiki_image(self, img_list):
        while True:
            title = self.queue.get()
            params = {
                "action": "query",
                "format": "json",
                "titles": title,
                "prop": "pageimages",
                "piprop": "original"
            }

            try:
                response = requests.get("https://wikipedia.org/w/api.php", params=params)
                json_data = response.json()
                
                if next(iter(json_data["query"]["pages"])) == "-1":
                    # Page/Article no longer exists.
                    img_list.append({"url": -2, "title": title})
                
                page = next(iter(json_data["query"]["pages"].values()))
                
                if "original" in page:
                    image_url = page["original"]["source"]
                    img_list.append({"url": image_url, "title": title})
                else:
                    # Page has no image
                    img_list.append({"url": -2, "title": title})


            except Exception as err:
                img_list.append({"url": -2, "title": title})
            
            self.queue.task_done()
            

    def get_wiki_images(self, titles, img_list):
        self.multithread_process(
            items=titles,
            target_function=self.get_wiki_image,
            img_list=img_list,
        )

    def post(self):
        data = request.get_json()
        raw_titles = data.get("titles", "")
        titles = []
        img_list = []
        self.queue = Queue()

        if raw_titles:
            titles = [_title.rstrip() for _title in raw_titles.split(",")]
        
        if titles:
            self.get_wiki_images(titles, img_list)

            while len(img_list) < 10:
                pass

            return {
                "message": "success",
                "imgs": img_list,
            }
        else:
            return HTTP_500_MISSING_Q
