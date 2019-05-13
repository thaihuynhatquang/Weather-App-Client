var _ = require("lodash");
import {
  GET_NEWS_INFORMATION,
  GET_NEWS_INFORMATION_SUCCESS,
  GET_NEWS_INFORMATION_FAILURE,
  UPDATE_NEWS_INFORMATION,
  UPDATE_NEWS_INFORMATION_SUCCESS,
  UPDATE_NEWS_INFORMATION_FAILURE
} from "./types";
import { Alert } from "react-native";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { convertEpochTime } from "../../../src/utils/middlewares";

export const loadNewsInformation = coords => {
  return (dispatch, getState) => {
    dispatch(loadNewsInformationStarted());
    axios
      .get(`${API_URL}/news`, {
        params: {
          lat: coords.lat,
          lon: coords.lon
        }
      })
      .then(res => {
        let newsArr = res.data.news_Arr.map((item, index) => {
          var time = new Date(item.time_create);
          item.datetime = time.toLocaleDateString();
          var distance = item.distance / 1000;
          item.distance = _.round(distance, 2);
          return item;
        });
        let data = res.data;
        data.newsArr = newsArr;
        dispatch(loadNewsInformationSuccess(data));
      })
      .catch(err => {
        Alert.alert("Timeout of 0ms Exceeded. Server Error");
        dispatch(loadNewsInformationFailure(err.message));
      });
  };
};

export const updateNewsInformation = data => {
  return (dispatch, getState) => {
    dispatch(updateNewsInformationStarted());
    axios
      .get(`${API_URL}/news`, {
        params: {
          lat: data.coords.lat,
          lon: data.coords.lon,
          offset: data.offset,
          order: data.order
        }
      })
      .then(res => {
        let newsArr = res.data.news_Arr.map((item, index) => {
          var time = new Date(item.time_create);
          item.datetime = time.toLocaleDateString();
          var distance = item.distance / 1000;
          item.distance = _.round(distance, 2);
          return item;
        });
        let data = res.data;
        data.newsArr = newsArr;
        dispatch(updateNewsInformationSuccess(data));
      })
      .catch(err => {
        Alert.alert("Timeout of 0ms Exceeded. Server Error");
        dispatch(updateNewsInformationFailure(err.message));
      });
  };
};

const loadNewsInformationStarted = () => ({
  type: GET_NEWS_INFORMATION
});

const loadNewsInformationSuccess = newsInformation => ({
  type: GET_NEWS_INFORMATION_SUCCESS,
  newsInformation
});

const loadNewsInformationFailure = error => ({
  type: GET_NEWS_INFORMATION_FAILURE,
  error
});

const updateNewsInformationStarted = () => ({
  type: UPDATE_NEWS_INFORMATION
});

const updateNewsInformationSuccess = newsInformation => ({
  type: UPDATE_NEWS_INFORMATION_SUCCESS,
  newsInformation
});

const updateNewsInformationFailure = error => ({
  type: UPDATE_NEWS_INFORMATION_FAILURE,
  error
});
