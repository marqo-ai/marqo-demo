import React from "react"
import { getRandomQ } from "./Surprise-Me";
import surpriseMe from "../../data/surpriseMe.json";


describe("Surprise-Me", () => {
    it("should return random q according to dataset", () => {
        let q = getRandomQ("boredapes");
        expect(surpriseMe["randomBoredApesQs"].includes(q)).toBe(true)

        q = getRandomQ("simplewiki");
        expect(surpriseMe["randomSimpleWikiQs"].includes(q)).toBe(true)
    })
});
