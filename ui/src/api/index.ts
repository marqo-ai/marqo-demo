import { AxiosPromise, AxiosResponse } from "axios";
import { appAxios } from "../plugins/axios";
import { CoreRequest, CoreResponse } from "./types";


export const searchAPI = (reqData: CoreRequest): AxiosPromise<CoreResponse> => {
    return appAxios.post("core", reqData);
}
