import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import authReducer from "./authReducer";
import locationReducer from "./locationReducer";

const rootReducer = combineReducers({
  weatherReducer,
  authReducer,
  locationReducer
});

export default rootReducer;
