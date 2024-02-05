import React from 'react';
import { getRandomQ } from './Surprise-Me';
import surpriseMe from '../../data/surpriseMe.json';
import { SIMPLEWIKI, ECOMMERCE, DIVERSEIMAGES } from '../../commons/constants';

describe('Surprise-Me', () => {
  it('should return random q according to dataset', () => {
    let q;

    q = getRandomQ(SIMPLEWIKI);
    expect(surpriseMe['randomSimpleWikiQs'].includes(q)).toBe(true);

    q = getRandomQ(ECOMMERCE);
    expect(surpriseMe['randomECommerceQs'].includes(q)).toBe(true);

    q = getRandomQ(DIVERSEIMAGES);
    expect(surpriseMe['randomDiverseImageQs'].includes(q)).toBe(true);
  });
});
