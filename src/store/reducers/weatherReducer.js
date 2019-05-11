import {
  GET_WEATHER_INFORMATION,
  GET_WEATHER_INFORMATION_SUCCESS,
  GET_WEATHER_INFORMATION_FAILURE,
  GET_CITY_INFORMATION,
  GET_CITY_INFORMATION_SUCCESS,
  GET_CITY_INFORMATION_FAILURE,
  REMOVE_CITY_INFORMATION
} from "../actions/types";

const initialState = {
  isLoading: true,
  isLoadingCity: false,
  listCity: [],
  weatherInformation: [],
  error: null
};

export default (weatherReducer = (state = initialState, action) => {
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
    case GET_CITY_INFORMATION:
      return {
        ...state,
        isLoadingCity: true
      };
    case GET_CITY_INFORMATION_SUCCESS:
      return {
        ...state,
        isLoadingCity: false,
        error: null,
        listCity: action.listCityInformation
      };
    case GET_CITY_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case REMOVE_CITY_INFORMATION:
      return {
        ...state,
        isLoading: false,
        listCity: []
      };
    default:
      return state;
  }
});
