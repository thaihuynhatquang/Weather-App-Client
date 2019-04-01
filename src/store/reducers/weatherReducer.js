import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE
} from "../actions/types";

const initialState = {
  isLoading: true,
  weatherInformation: [],
  error: null
};

export default (weatherReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_WEATHER_INFORMATION:
      return {
        ...state,
        isLoading: true
      };
    case GET_WEATHER_INFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        weatherInformation: action.weatherInformation
      };
    case GET_WEATHER_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
});
