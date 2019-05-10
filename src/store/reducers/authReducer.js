import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "../actions/types";

const initialState = {
  userInfo: {
    token: "",
    name: "",
    picture: ""
  },
  loadingProfile: false,
  error: null
};

export default (authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, loadingProfile: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        userInfo: action.userInformation
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loadingProfile: false,
        error: action.error
      };
    default:
      return state;
  }
});
