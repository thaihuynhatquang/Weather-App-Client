var _ = require("lodash");
import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE
} from "./types";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { convertEpochTime } from "../../../src/utils/middlewares";

export const loadWeatherInformation = location => {
  return (dispatch, getState) => {
    dispatch(loadWeatherInformationStarted());
    axios
      .get(`${API_URL}/weather/postcast5day`, {
        params: {
          lat: location.lat,
          lon: location.lon
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
