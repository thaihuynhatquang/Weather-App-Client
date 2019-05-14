import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import authReducer from "./authReducer";
import locationReducer from "./locationReducer";
import newsReducer from "./newsWeatherReducer";

const rootReducer = combineReducers({
  weatherReducer,
  authReducer,
  locationReducer,
  newsReducer
});

export default rootReducer;
