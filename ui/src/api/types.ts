
export type CoreRequest = {
    q: string;
    index: string;
};

export type CoreResponse = {
    message: string;
    results: {
        hits: any[];
    };
};
export type GetWikiImgThunkRequest = {
    title: string;
    hitIndex: number;
}
export type GetWikiImgResponse = {
    message: string;
    img: string;
}