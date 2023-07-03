import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCoreAPIResults, setIsSearchingCoreAPI, setWikiImages, } from "../slices/app-slice";
import { getWikiImages, searchAPI } from "../../api"
import { CoreRequest } from "../../api/types";

export const postSearchDataset = createAsyncThunk("postSearchDataset", async (params: CoreRequest, { dispatch }) => {
    try {
        dispatch(setIsSearchingCoreAPI(params.index));
        const { data } = await searchAPI(params);
        dispatch(setCoreAPIResults(data));
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
},);

// export const getWikiImgThunk = createAsyncThunk("getWikiImg", async (params: GetWikiImgThunkRequest, { dispatch }) => {
//     try {
//         const { data } = await getWikiImg(params.title);
//         dispatch(updateWikiImg({ hitIndex: params.hitIndex, img: data?.img }))
//         return data;
//     } catch (err) {
//         return Promise.reject(err);
//     }
// },);

export const getWikiImagesThunk = createAsyncThunk("getWikiImages", async (titles: string, { dispatch }) => {
    try {
        const { data } = await getWikiImages(titles);
        dispatch(setWikiImages(data?.imgs || []))
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
},);