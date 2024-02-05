import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setSearchResults,
  setIsSearchLoading,
  setRecommendations,
  setIsRecommendationLoading,
} from '../slices/app-slice';
import { recommendationAPI, searchAPI } from '../../api';
import { RecommendationRequest, SearchRequest } from '../../api/types';

export const postSearchDataset = createAsyncThunk(
  'postSearchDataset',
  async (params: SearchRequest, { dispatch }) => {
    try {
      dispatch(setIsSearchLoading(params.index));
      const { data } = await searchAPI(params);
      dispatch(setSearchResults(data));
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

export const postRecommendItem = createAsyncThunk(
  'postRecommendItem',
  async (params: RecommendationRequest, { dispatch }) => {
    try {
      dispatch(setIsRecommendationLoading(params.index));
      const { data } = await recommendationAPI(params);
      dispatch(setRecommendations(data));
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);
