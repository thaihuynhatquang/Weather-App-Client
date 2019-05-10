import { AsyncStorage } from "react-native";
import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "./types";
import axios from "axios";
import { API_URL } from "../../utils/constant";

export const checkToken = token => {
  return (dispatch, getState) => {
    dispatch(loginUserStarted());
    axios
      .get(`${API_URL}/user/auth`, token)
      .then(res => {
        let data = res.data;
        dispatch(loginUserSuccess(data));
      })
      .catch(err => {
        dispatch(loginUserFailure(err.message));
      });
  };
};

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
    dispatch({ type: UNAUTH_USER });
    AsyncStorage.removeItem("token");
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
