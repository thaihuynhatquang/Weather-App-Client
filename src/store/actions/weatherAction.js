var _ = require("lodash");
import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE
} from "./types";

import axios from "axios";
import { API_KEY } from "../../../src/utils/WeatherAPIKey";

import { convertEpochTime } from "../../../src/utils/middlewares";

const API_URL = "http://api.openweathermap.org/data/2.5/forecast";

export const loadWeatherInformation = location => {
  return (dispatch, getState) => {
    dispatch(loadWeatherInformationStarted());
    axios
      .get(API_URL, {
        params: {
          lat: location.lat,
          lon: location.lon,
          APPID: API_KEY,
          units: "metric"
        }
      })
      .then(res => {
        let data = _.forEach(res.data, item => {
          item.datetime = convertEpochTime(item.dt);
        });
        return setTimeout(() => {
          dispatch(loadWeatherInformationSuccess(data));
        }, 1000);
      })
      .catch(err => {
        dispatch(loadWeatherInformationFailure(err.message));
      });
  };
};

const loadWeatherInformationStarted = () => ({
  type: GET_WEATHER_INFORMATION
});

const loadWeatherInformationSuccess = weatherInformation => ({
  type: GET_WEATHER_INFORMATION_SUCCESS,
  weatherInformation
});

const loadWeatherInformationFailure = error => ({
  type: GET_WEATHER_INFORMATION_FAILURE,
  error
});
