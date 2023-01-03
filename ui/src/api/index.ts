import axios, { AxiosPromise } from "axios";
import { CoreRequest, CoreResponse, GetWikiImagesResponse } from "./types";


export const searchAPI = (reqData: CoreRequest): AxiosPromise<CoreResponse> => {
    return axios({
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "/api/core",
        data: reqData,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}

export const getWikiImages = (titles: string): AxiosPromise<GetWikiImagesResponse> => {
    return axios({
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "/api/wiki-images",
        data: { titles },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}
