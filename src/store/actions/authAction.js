import { AsyncStorage } from "react-native";
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  REMOVE_USER,
  REMOVE_LOCATION_INFORMATION
} from "./types";
import axios from "axios";
import { API_URL } from "../../utils/constant";

export const loginUser = userInfo => {
  return (dispatch, getState) => {
    dispatch(loginUserStarted());
    axios
      .post(`${API_URL}/user/loginWithGoogle`, userInfo)
      .then(res => {
        let data = res.data;
        dispatch(loginUserSuccess(data));
      })
      .catch(err => {
        dispatch(loginUserFailure(err.message));
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({ type: REMOVE_USER });
    dispatch({ type: REMOVE_LOCATION_INFORMATION });
    dispatch({ type: REMOVE_WEATHER_INFORMATION });
  };
};

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
