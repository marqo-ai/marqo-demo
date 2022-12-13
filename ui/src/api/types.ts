
export type CoreRequest = {
    q: string;
    index: string;
    img?: File;
};

export type CoreResponse = {
    message: string;
    results: {
        hits: any[];
    };
};
// export type GetWikiImgThunkRequest = {
//     title: string;
//     hitIndex: number;
// }
// export type GetWikiImgResponse = {
//     message: string;
//     img: string;
// }
export type WikiImageItem = {
    url: string;
    title: string;
}
export type GetWikiImagesResponse = {
    message: string;
    imgs: WikiImageItem[];
}