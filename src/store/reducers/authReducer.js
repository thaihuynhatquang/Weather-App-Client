import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  ADD_FAVORITE_PLACE,
  ADD_FAVORITE_PLACE_FAIL,
  REMOVE_USER
} from "../actions/types";

const initialState = {
  userInfo: {
    token: "",
    name: "",
    picture: "",
    favorite: []
  },
  favoritePlaces: [],
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
        userInfo: action.userInformation,
        favoritePlaces: action.userInformation.favorite
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loadingProfile: false,
        error: action.error
      };
    case ADD_FAVORITE_PLACE:
      return {
        ...state,
        favoritePlaces: action.favoritePlaces
      };
    case ADD_FAVORITE_PLACE_FAIL:
      return {
        ...state,
        error: action.error
      };
    case REMOVE_USER:
      return {
        ...state,
        userInfo: {
          token: "",
          name: "",
          picture: "",
          favorite: ""
        },
        loadingProfile: false,
        error: null
      };
    default:
      return state;
  }
});
