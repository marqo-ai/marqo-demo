export type SearchRequest = {
  q: string;
  posQ?: string | null;
  negQ?: string | null;
  index: string;
  img?: File;
  favourites?: string[];
  searchSettings?: SearchSettings;
  advancedSettings?: AdvancedSettings;
  style?: string;
};

export type RecommendationRequest = {
  itemID: string;
  limit: number;
  index: string;
  offset: number | null;
};

export interface SimilarRecommendationsRequest {
  itemID: string;
  demoID: string;
  limit: number;
}

export interface SearchSettings {
  queryWeight: number;
  posQueryWeight: number;
  negQueryWeight: number;
  totalFavouriteWeight: number;
  prefix: string;
  styleModifier: string;
}

export interface AdvancedSettings {
  implicitMoreExpansion: boolean;
  limit: number;
}

export interface ImageSearchHit {
  _id: string;
  _score: number;
  imageURL: string;
  title: string;
}

interface TextSearchHitHighlight {
  content: string;
}

export interface TextSearchHit {
  _id: string;
  _score: number;
  title: string;
  url: string;
  content: string;
  imageURL: string;
  _highlights: TextSearchHitHighlight[];
}

export type SearchHit = ImageSearchHit | TextSearchHit;

export type SearchResponse = {
  message: string;
  results: {
    hits: ImageSearchHit[] | TextSearchHit[];
  };
};

export type WikiImageItem = {
  url: string;
  title: string;
};
