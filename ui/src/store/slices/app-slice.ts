import { createSlice } from '@reduxjs/toolkit';
import { CoreResponse, WikiImageItem } from '../../api/types';
import { BOREDAPES, SIMPLEWIKI, ECOMMERCE } from '../../commons/constants';

export const DEFAULT_Q = 'Some shoes that I can run in';

export type DatasetTypes = typeof BOREDAPES | typeof SIMPLEWIKI | typeof ECOMMERCE;

type Props = {
  theme: string;
  dataset: DatasetTypes;
  results: CoreResponse | null;
  q: string;
  posQ: string | null;
  negQ: string | null;
  isSearchingCoreAPI: boolean;
  wikiImgs: string[];
  imgFile: null | boolean;
  apiCallCount: number;
  wikiImages: WikiImageItem[];
};

const initialState: Props = {
  theme: 'light',
  dataset: ECOMMERCE,
  results: null,
  q: DEFAULT_Q,
  posQ: null,
  negQ: null,
  isSearchingCoreAPI: false,
  wikiImgs: [],
  imgFile: null,
  apiCallCount: 0,
  wikiImages: [],
};

const slice = createSlice({
  name: 'app',
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
    setPosQ: (state, { payload }) => {
      state.posQ = payload;
    },
    setNegQ: (state, { payload }) => {
      state.negQ = payload;
    },
    setCoreAPIResults: (state, { payload }) => {
      state.results = payload;
      state.isSearchingCoreAPI = false;
      state.imgFile = null;
      state.apiCallCount = 0;
    },
    setIsSearchingCoreAPI: (state, { payload }) => {
      state.isSearchingCoreAPI = true;
      state.dataset = payload;
      state.apiCallCount += 1;
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
      state.q = '';
    },
    resetAPICallCount: (state) => {
      state.apiCallCount = 0;
    },
  },
});

export const {
  setQ,
  setPosQ,
  setNegQ,
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
