import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  ADD_FAVORITE_PLACE,
  ADD_FAVORITE_PLACE_FAIL,
  REMOVE_USER,
  REMOVE_LOCATION_INFORMATION,
  GET_WEATHER_INFORMATION,
  REMOVE_NEWS_INFORMATION
} from "./types";
import axios from "axios";
import { API_URL } from "../../utils/constant";
import { Alert } from "react-native";

export const loginUser = userInfo => {
  return (dispatch, getState) => {
    dispatch(loginUserStarted());
    axios
      .post(`${API_URL}/user/loginWithGoogle`, userInfo)
      .then(res => {
        let data = res.data;
        axios.defaults.headers.common["Authorization"] = data.token;
        dispatch(loginUserSuccess(data));
      })
      .catch(err => {
        Alert.alert("Timeout of 0ms Exceeded. Server Error");
        dispatch(loginUserFailure(err.message));
      });
  };
};

export const addFavoritePlace = data => {
  return (dispatch, getState) => {
    axios
      .patch(`${API_URL}/user/favorite`, data)
      .then(res => {
        dispatch(addFavoritePlacesuccess(data));
      })
      .catch(err => {
        Alert.alert("Timeout of 0ms Exceeded. Server Error");
        dispatch(addFavoritePlaceFailure(err.message));
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: REMOVE_USER });
  };
};
const addFavoritePlacesuccess = favoritePlaces => ({
  type: ADD_FAVORITE_PLACE,
  favoritePlaces
});

const addFavoritePlaceFailure = error => ({
  type: ADD_FAVORITE_PLACE_FAIL,
  error
});

const loginUserStarted = () => ({
  type: GET_USER
});

const loginUserSuccess = userInformation => ({
  type: GET_USER_SUCCESS,
  userInformation
});

const loginUserFailure = error => ({
  type: GET_USER_FAIL,
  error
});
