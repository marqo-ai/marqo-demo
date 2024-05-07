import axios, { AxiosPromise } from 'axios';
import { RecommendationRequest, SearchRequest, SearchResponse } from './types';

export const searchAPI = (reqData: SearchRequest): AxiosPromise<SearchResponse> => {
  if (reqData?.img) {
    const formData = new FormData();
    formData.append('img', reqData.img);
    formData.append('index', reqData.index);

    return axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_BASE_URL,
      url: '/api/core',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } else {
    console.log(`sending request to ${process.env.REACT_APP_BASE_URL}`)
    return axios({
      method: 'POST',
      baseURL: process.env.REACT_APP_BASE_URL,
      url: '/api/core',
      data: reqData,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const recommendationAPI = (reqData: RecommendationRequest): AxiosPromise<SearchResponse> => {
  return axios({
    method: 'POST',
    baseURL: process.env.REACT_APP_BASE_URL,
    url: '/api/recommend',
    data: reqData,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};
