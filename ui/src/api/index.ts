import axios, { AxiosPromise } from "axios";
import { CoreRequest, CoreResponse, GetWikiImagesResponse } from "./types";


export const searchAPI = (reqData: CoreRequest): AxiosPromise<CoreResponse> => {
    if (reqData?.img) {
        const formData = new FormData();
        formData.append("img", reqData.img);
        formData.append("index", reqData.index);

        return axios({
            method: "POST",
            baseURL: process.env.REACT_APP_BASE_URL,
            url: "/api/core",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
            }
        });
    } else {
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
