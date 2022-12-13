import axios, { AxiosPromise, AxiosResponse } from "axios";
import { appAxios } from "../plugins/axios";
import { CoreRequest, CoreResponse, GetWikiImgResponse } from "./types";


export const searchAPI = (reqData: CoreRequest): AxiosPromise<CoreResponse> => {
    // return appAxios.post("/core", reqData);
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

export const getWikiImg = (title: string): AxiosPromise<GetWikiImgResponse> => {
    return axios({
        method: "POST",
        baseURL: process.env.REACT_APP_BASE_URL,
        url: "/api/wiki-img",
        data: { title },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}
