import { createSlice } from '@reduxjs/toolkit';
import { CoreResponse } from '../../api/types';
import { BOREDAPES, SIMPLEWIKI, ECOMMERCE } from '../../commons/constants';

export const DEFAULT_Q = 'a chronograph with a blue face and gold trim';

export type DatasetTypes = typeof BOREDAPES | typeof SIMPLEWIKI | typeof ECOMMERCE;

type Props = {
  theme: string;
  dataset: DatasetTypes;
  results: CoreResponse | null;
  q: string;
  posQ: string | null;
  negQ: string | null;
  isSearchingCoreAPI: boolean;
  imgFile: null | boolean;
  apiCallCount: number;
};

const initialState: Props = {
  theme: 'light',
  dataset: ECOMMERCE,
  results: null,
  q: DEFAULT_Q,
  posQ: null,
  negQ: null,
  isSearchingCoreAPI: false,
  imgFile: null,
  apiCallCount: 0,
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
  setCoreAPIResults,
  setIsSearchingCoreAPI,
  resetAPICallCount,
} = slice.actions;
export default slice.reducer;
