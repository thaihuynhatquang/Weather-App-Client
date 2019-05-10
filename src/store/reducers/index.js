import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  weatherReducer,
  authReducer
});

export default rootReducer;
