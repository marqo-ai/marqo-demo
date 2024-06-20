import { createSlice } from '@reduxjs/toolkit';
import { AdvancedSettings, SearchHit, SearchResponse, SearchSettings } from '../../api/types';
import { SIMPLEWIKI, ECOMMERCE, DIVERSEIMAGES } from '../../commons/constants';

// export const DEFAULT_Q = 'an alleyway in a futuristic cyberpunk city';
export const DEFAULT_Q = 'a blue handbag with a gold clasp';

export type DatasetTypes = typeof SIMPLEWIKI | typeof ECOMMERCE | typeof DIVERSEIMAGES;

type Props = {
  theme: string;
  dataset: DatasetTypes;
  results: SearchResponse | null;
  recommendations: SearchResponse | null;
  q: string;
  posQ: string | null;
  negQ: string | null;
  advancedSettings: AdvancedSettings;
  searchSettings: SearchSettings;
  selectedItem: SearchHit | null;
  isSearchLoading: boolean;
  isRecommendationLoading: boolean;
  favourites: string[];
  imgFile: null | boolean;
  apiCallCount: number;
  showRecommendations: boolean;
  offset: number | null;
};

const initialState: Props = {
  theme: 'light',
  dataset: ECOMMERCE,
  results: null,
  recommendations: null,
  q: DEFAULT_Q,
  posQ: null,
  negQ: null,
  advancedSettings: {
    implicitMoreExpansion: true,
    limit: 50,
  },
  searchSettings: {
    queryWeight: 1.0,
    posQueryWeight: 0.6,
    negQueryWeight: -1.1,
    totalFavouriteWeight: 0.3,
    prefix: '',
    styleModifier: '',
  },
  favourites: [],
  selectedItem: null,
  isSearchLoading: false,
  isRecommendationLoading: false,
  imgFile: null,
  apiCallCount: 0,
  showRecommendations: false,
  offset: null,
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
    setImplicitMoreExpansion: (state, { payload }) => {
      state.advancedSettings.implicitMoreExpansion = payload;
    },
    setLimit: (state, { payload }) => {
      state.advancedSettings.limit = payload;
    },
    setQueryWeight: (state, { payload }) => {
      state.searchSettings.queryWeight = payload;
    },
    setPosQueryWeight: (state, { payload }) => {
      state.searchSettings.posQueryWeight = payload;
    },
    setNegQueryWeight: (state, { payload }) => {
      state.searchSettings.negQueryWeight = payload;
    },
    setTotalFavouriteWeight: (state, { payload }) => {
      state.searchSettings.totalFavouriteWeight = payload;
    },
    setPrefix: (state, { payload }) => {
      state.searchSettings.prefix = payload;
    },
    addFavourite: (state, { payload }) => {
      if (!state.favourites.includes(payload)) {
        state.favourites.push(payload);
      }
    },
    removeFavourite: (state, { payload }) => {
      state.favourites = state.favourites.filter((item) => item !== payload);
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
    setSelectedItem: (state, { payload }) => {
      state.selectedItem = payload;
    },
    setSearchResults: (state, { payload }) => {
      state.results = payload;
      state.isSearchLoading = false;
      state.imgFile = null;
      state.apiCallCount = 0;
    },
    setIsSearchLoading: (state, { payload }) => {
      state.isSearchLoading = true;
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
    setRecommendations: (state, { payload }) => {
      state.recommendations = payload;
      state.isRecommendationLoading = false;
    },
    clearRecommendations: (state) => {
      state.recommendations = null;
    },
    setShowRecommendations: (state, { payload }) => {
      state.showRecommendations = payload;
    },
    setIsRecommendationLoading: (state, { payload }) => {
      state.isRecommendationLoading = payload;
    },
    setOffset: (state, { payload }) => {
      state.offset = payload;
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
  setSearchResults,
  setIsSearchLoading,
  setImplicitMoreExpansion,
  setLimit,
  setQueryWeight,
  setPosQueryWeight,
  setNegQueryWeight,
  setTotalFavouriteWeight,
  setPrefix,
  addFavourite,
  removeFavourite,
  clearFavourites,
  setSelectedItem,
  setShowRecommendations,
  resetAPICallCount,
  setRecommendations,
  clearRecommendations,
  setIsRecommendationLoading,
  setOffset,
} = slice.actions;
export default slice.reducer;
