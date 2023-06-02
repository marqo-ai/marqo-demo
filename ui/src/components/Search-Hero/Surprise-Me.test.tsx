import React from "react"
import { getRandomQ } from "./Surprise-Me";
import surpriseMe from "../../data/surpriseMe.json";
import { BOREDAPES, SIMPLEWIKI, ECOMMERCE } from "../../commons/constants";


describe("Surprise-Me", () => {
    it("should return random q according to dataset", () => {
        let q = getRandomQ(BOREDAPES);
        expect(surpriseMe["randomBoredApesQs"].includes(q)).toBe(true)

        q = getRandomQ(SIMPLEWIKI);
        expect(surpriseMe["randomSimpleWikiQs"].includes(q)).toBe(true)
        
        q = getRandomQ(ECOMMERCE);
        expect(surpriseMe["randomECommerceQs"].includes(q)).toBe(true)
    })
});
