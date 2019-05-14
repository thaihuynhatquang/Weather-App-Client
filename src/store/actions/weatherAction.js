var _ = require("lodash");
import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE,
  GET_CITY_INFORMATION,
  GET_CITY_INFORMATION_SUCCESS,
  GET_CITY_INFORMATION_FAILURE,
  REMOVE_CITY_INFORMATION
} from "./types";
import { Alert } from "react-native";
import { API_URL } from "../../utils/constant";
import axios from "axios";
import { convertEpochTime } from "../../../src/utils/middlewares";

export const loadWeatherInformation = coords => {
  return (dispatch, getState) => {
    dispatch(loadWeatherInformationStarted());
    axios
      .get(`${API_URL}/weather/postcast5day`, {
        params: {
          lat: coords.lat,
          lon: coords.lon
        }
      })
      .then(res => {
        let response = res.data;
        response.list = _.forEach(response.list, item => {
          _.forEach(item, item => {
            item.datetime = convertEpochTime(item.dt);
            item.datetime.hour = item.dt_txt.slice(11, 16);
            item.description = _.startCase(item.weather[0].description);
          });
        });
        dispatch(loadWeatherInformationSuccess(response));
      })
      .catch(err => {
        Alert.alert("Timeout of 0ms Exceeded. Server Error");
        dispatch(loadWeatherInformationFailure(err.message));
      });
  };
};

export const loadCityInformation = cityName => {
  return (dispatch, getState) => {
    dispatch(loadCityInformationStarted());
    axios
      .get(`${API_URL}/weather/find`, {
        params: {
          cityName: cityName
        }
      })
      .then(res => {
        dispatch(loadCityInformationSuccess(res.data));
      })
      .catch(err => {
        dispatch(loadCityInformationFailure(err.message));
      });
  };
};

export const clearListCity = () => {
  return dispatch => {
    dispatch(clearListCityInformation());
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

const loadCityInformationStarted = () => ({
  type: GET_CITY_INFORMATION
});

const loadCityInformationSuccess = listCityInformation => ({
  type: GET_CITY_INFORMATION_SUCCESS,
  listCityInformation
});

const loadCityInformationFailure = error => ({
  type: GET_CITY_INFORMATION_FAILURE,
  error
});

const clearListCityInformation = () => ({
  type: REMOVE_CITY_INFORMATION
});
