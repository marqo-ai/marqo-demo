import { createSlice } from "@reduxjs/toolkit";
import { CoreResponse, WikiImageItem } from "../../api/types";
import { BOREDAPES, SIMPLEWIKI } from "../../commons/constants";

export const DEFAULT_Q = "ape that just watched a terrible IMAX movie";

export type DatasetTypes = typeof BOREDAPES | typeof SIMPLEWIKI;

type Props = {
    theme: string;
    dataset: DatasetTypes;
    results: CoreResponse | null;
    q: string;
    isSearchingCoreAPI: boolean;
    wikiImgs: string[];
    imgFile: null | boolean;
    apiCallCount: number;
    wikiImages: WikiImageItem[];
};

const initialState: Props = {
    theme: "light",
    dataset: BOREDAPES,
    results: null,
    q: DEFAULT_Q,
    isSearchingCoreAPI: false,
    wikiImgs: [],
    imgFile: null,
    apiCallCount: 0,
    wikiImages: [],
};

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            state.theme = payload;
        },
        setDataset: (state, { payload }) => {
            state.dataset = payload;
        },
        setQ: (state, { payload }) => {
            state.q = payload;
        },
        setCoreAPIResults: (state, { payload }) => {
            state.results = payload;
            state.isSearchingCoreAPI = false;
            state.imgFile = null;
            state.apiCallCount = 0
        },
        setIsSearchingCoreAPI: (state, { payload }) => {
            state.isSearchingCoreAPI = true;
            state.dataset = payload;
            state.apiCallCount += 1
        },
        setWikiImages: (state, { payload }) => {
            state.wikiImages = payload;
        },
        updateWikiImg: (state, { payload }) => {
            let _wikiImgs = [...state.wikiImgs];
            _wikiImgs[payload.hitIndex] = payload.img;
            state.wikiImgs = _wikiImgs;
        },
        setImgFile: (state, { payload }) => {
            state.imgFile = payload;
            state.q = "";
        },
        resetAPICallCount: (state) => {
            state.apiCallCount = 0;
        }
    },
});

export const {
    setQ,
    setTheme,
    setImgFile,
    setDataset,
    setWikiImages,
    updateWikiImg,
    setCoreAPIResults,
    setIsSearchingCoreAPI,
    resetAPICallCount,
} = slice.actions;
export default slice.reducer;


