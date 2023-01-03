import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCoreAPIResults, setIsSearchingCoreAPI, updateWikiImg } from "../slices/app-slice";
import { getWikiImg, searchAPI } from "../../api"
import { CoreRequest, GetWikiImgThunkRequest } from "../../api/types";

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

export const getWikiImgThunk = createAsyncThunk("getWikiImg", async (params: GetWikiImgThunkRequest, { dispatch }) => {
    try {
        const { data } = await getWikiImg(params.title);
        dispatch(updateWikiImg({ hitIndex: params.hitIndex, img: data?.img }))
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
},);

export const getRawWikiImgThunk = createAsyncThunk("getWikiImg", async (title: string, { dispatch }) => {
    try {
        const { data } = await getWikiImg(title);
        // console.log(data)
        return data?.img;
    } catch (err) {
        return Promise.reject(err);
    }
},);