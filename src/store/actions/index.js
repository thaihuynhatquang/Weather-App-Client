var _ = require("lodash");
import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE
} from "./types";

import axios from "axios";

const API_URL = "http://api.openweathermap.org/data/2.5/forecast";

export const loadWeatherInformation = () => {
  return (dispatch, getState) => {
    dispatch(loadWeatherInformationStarted());
    // console.log("current state:", getState());
    axios
      .get(API_URL, {
        params: {
          lat: 21.04,
          lon: 105.78,
          APPID: "15db80d08721eec4d9cd77e4fcbfb163",
          units: "metric"
        }
      })
      .then(res => {
        dispatch(loadWeatherInformationSuccess(res));
        // console.log(_.toArray(res.data), "to array data after fetch");
        console.log(res, "data after fetch");
      })
      .catch(err => {
        dispatch(loadWeatherInformationFailure(err.message));
        console.log(err, "data after fetch");
      });
  };
};

const loadWeatherInformationStarted = () => ({
  type: GET_WEATHER_INFORMATION
});

const loadWeatherInformationSuccess = weatherInfomation => ({
  type: GET_WEATHER_INFORMATION_SUCCESS,
  payload: weatherInfomation
});

const loadWeatherInformationFailure = error => ({
  type: GET_WEATHER_INFORMATION_FAILURE,
  payload: error
});
