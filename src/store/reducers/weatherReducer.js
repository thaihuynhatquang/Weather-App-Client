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

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_INFORMATION:
      return {
        ...state,
        isLoading: true
      };
    case GET_WEATHER_INFORMATION_SUCCESS:
      console.log(action, "action");
      return {
        ...state,
        isLoading: false,
        error: null,
        weatherInformation: action.payload.data
      };
    case GET_WEATHER_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
}
