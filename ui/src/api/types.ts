
export type CoreRequest = {
    q: string;
    posQ?: string | null;
    negQ?: string | null;
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