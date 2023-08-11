export type CoreRequest = {
  q: string;
  posQ?: string | null;
  negQ?: string | null;
  index: string;
  img?: File;
};

export interface ImageSearchHit {
  _id: string;
  _score: number;
  image: string;
  title: string;
};

export interface TextSearchHit {
  _id: string;
  _score: number;
  title: string;
  url: string;
  content: string;
  image_url: string;
  _highlights: {
    content: string[];
  }
};

export type CoreResponse = {
  message: string;
  results: {
    hits: ImageSearchHit[] | TextSearchHit[];
  };
};



export type WikiImageItem = {
  url: string;
  title: string;
};
