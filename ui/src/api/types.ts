
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