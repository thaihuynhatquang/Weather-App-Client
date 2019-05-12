import {
  GET_LOCATION_INFORMATION,
  GET_LOCATION_INFORMATION_SUCCESS,
  GET_LOCATION_INFORMATION_FAILURE
} from "./types";

export const loadLocationInformation = coords => {
  return (dispatch, getState) => {
    dispatch(loadLocationInformationStarted());
    dispatch(loadLocationInformationSuccess(coords));
  };
};

const loadLocationInformationStarted = () => ({
  type: GET_LOCATION_INFORMATION
});

const loadLocationInformationSuccess = coords => ({
  type: GET_LOCATION_INFORMATION_SUCCESS,
  coords
});

const loadLocationInformationFailure = error => ({
  type: GET_LOCATION_INFORMATION_FAILURE,
  error
});
