import { ImageSearchHit, TextSearchHit } from './types';

export function isTextSearchHit(hit: any): hit is TextSearchHit {
  return hit && 'url' in hit && 'content' in hit && '_highlights' in hit;
}

export function isImageSearchHit(hit: any): hit is ImageSearchHit {
  return hit && 'imageURL' in hit && !('url' in hit);
}
