import {
  GET_NEWS_INFORMATION,
  GET_NEWS_INFORMATION_SUCCESS,
  GET_NEWS_INFORMATION_FAILURE,
  UPDATE_NEWS_INFORMATION,
  UPDATE_NEWS_INFORMATION_SUCCESS,
  UPDATE_NEWS_INFORMATION_FAILURE,
  REMOVE_NEWS_INFORMATION
} from "../actions/types";

const initialState = {
  isLoading: true,
  isUpdating: false,
  news: [],
  nextOffset: null,
  prevOffset: null,
  total: null,
  error: null
};

function mergeNews(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i]._id === a[j]._id) a.splice(j--, 1);
    }
  }

  return a;
}

export default (newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_INFORMATION:
      return {
        ...state,
        isLoading: true
      };
    case GET_NEWS_INFORMATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        nextOffset: action.newsInformation.next_offset,
        prevOffset: action.newsInformation.prev_offset,
        total: action.newsInformation.total,
        news: action.newsInformation.newsArr
      };
    case GET_NEWS_INFORMATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case UPDATE_NEWS_INFORMATION:
      return {
        ...state,
        isUpdating: true
      };
    case UPDATE_NEWS_INFORMATION_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: null,
        nextOffset: action.newsInformation.next_offset,
        prevOffset: action.newsInformation.prev_offset,
        total: action.newsInformation.total,
        news: mergeNews(state.news.concat(action.newsInformation.newsArr))
      };
    case UPDATE_NEWS_INFORMATION_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error
      };
    case REMOVE_NEWS_INFORMATION:
      return {
        ...state,
        isLoading: true,
        isUpdating: false,
        news: [],
        nextOffset: null,
        prevOffset: null,
        total: null,
        error: null
      };

    default:
      return state;
  }
});
