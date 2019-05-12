import {
  GET_LOCATION_INFORMATION,
  GET_LOCATION_INFORMATION_SUCCESS,
  GET_LOCATION_INFORMATION_FAILURE,
  REMOVE_LOCATION_INFORMATION
} from "../actions/types";

const initialState = {
  isLoading: true,
  coords: null,
  error: null
};

export default (locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATION_INFORMATION:
      return {
        ...state,
        isLoading: true
      };
    case GET_LOCATION_INFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        coords: action.coords
      };
    case GET_LOCATION_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case REMOVE_LOCATION_INFORMATION:
      return {
        ...state,
        isLoading: true,
        coords: null,
        error: null
      };
    default:
      return state;
  }
});
