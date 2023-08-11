import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCoreAPIResults, setIsSearchingCoreAPI } from '../slices/app-slice';
import { searchAPI } from '../../api';
import { CoreRequest } from '../../api/types';

export const postSearchDataset = createAsyncThunk(
  'postSearchDataset',
  async (params: CoreRequest, { dispatch }) => {
    try {
      dispatch(setIsSearchingCoreAPI(params.index));
      const { data } = await searchAPI(params);
      dispatch(setCoreAPIResults(data));
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);