class SearchSettings:
    def __init__(
        self,
        query_weight: float,
        pos_query_weight: float,
        neg_query_weight: float,
        total_favourite_weight: float,
        prefix: str = None,
        style_modifier: str = None,
    ):
        self.query_weight = query_weight
        self.pos_query_weight = pos_query_weight
        self.neg_query_weight = neg_query_weight
        self.total_favourite_weight = total_favourite_weight
        self.prefix = prefix
        self.style_modifier = style_modifier

    @classmethod
    def from_dict(cls, data: dict):
        query_weight = data.get("queryWeight")
        pos_query_weight = data.get("posQueryWeight")
        neg_query_weight = data.get("negQueryWeight")
        total_favourite_weight = data.get("totalFavouriteWeight")
        prefix = data.get("prefix")
        style_modifier = data.get("styleModifier")
        return SearchSettings(
            query_weight,
            pos_query_weight,
            neg_query_weight,
            total_favourite_weight,
            prefix,
            style_modifier,
        )


class AdvancedSettings:
    def __init__(
        self,
        implicit_more_expansion: bool,
        limit: int,
    ):
        self.implicit_more_expansion = implicit_more_expansion
        self.limit = limit

    @classmethod
    def from_dict(cls, data: dict):
        implicit_more_expansion = data.get("implicitMoreExpansion", True)
        limit = data.get("limit", 50)
        if limit is None:
            limit = 50
        return AdvancedSettings(
            implicit_more_expansion,
            limit,
        )


class ImageSearchHit:
    def __init__(self, _id: str, _score: float, image_url: str, title: str):
        self._id = _id
        self._score = _score
        self.image_url = image_url
        self.title = title

    @classmethod
    def from_dict(cls, data: dict):
        _id = data.get("_id")
        _score = data.get("_score")
        image_url = data.get("image_url")
        title = data.get("title")
        return ImageSearchHit(
            _id,
            _score,
            image_url,
            title,
        )

    def as_camel_dict(self):
        return {
            "_id": self._id,
            "_score": self._score,
            "imageURL": self.image_url,
            "title": self.title,
        }


class TextSearchHit:
    def __init__(
        self,
        _id: str,
        _score: float,
        title: str,
        url: str,
        content: str,
        image_url: str,
        _highlights: dict,
    ):
        self._id = _id
        self._score = _score
        self.title = title
        self.url = url
        self.content = content
        self.image_url = image_url
        self._highlights = _highlights

    @classmethod
    def from_dict(cls, data: dict):
        _id = data.get("_id")
        _score = data.get("_score")
        title = data.get("title")
        url = data.get("url")
        content = data.get("content")
        image_url = data.get("image_url")
        _highlights = data.get("_highlights")
        return TextSearchHit(
            _id,
            _score,
            title,
            url,
            content,
            image_url,
            _highlights,
        )

    def as_camel_dict(self):
        return {
            "_id": self._id,
            "_score": self._score,
            "title": self.title,
            "url": self.url,
            "content": self.content,
            "imageURL": self.image_url,
            "_highlights": self._highlights,
        }
