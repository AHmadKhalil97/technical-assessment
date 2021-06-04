import {
  GET_LISTS,
  GET_LISTS_SUCCESS,
  GET_LISTS_FAILURE,

  ADD_LIST,
  ADD_LIST_SUCCESS,
  ADD_LIST_FAILURE,

  UPDATE_LIST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_FAILURE,

  DELETE_LIST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_FAILURE,

  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,

  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,

  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,

  SET_SELECTED_LIST_ID
} from '../constants'

const initialState = {
  lists: [],
  selectedListId: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS:
    case ADD_LIST:
    case UPDATE_LIST:
    case DELETE_LIST:
    case ADD_TODO:
    case UPDATE_TODO:
    case DELETE_TODO:
      return { ...state, loading: true };
    case GET_LISTS_SUCCESS:
    case GET_LISTS_FAILURE:
    case ADD_LIST_SUCCESS:
    case ADD_LIST_FAILURE:
    case UPDATE_LIST_SUCCESS:
    case UPDATE_LIST_FAILURE:
    case DELETE_LIST_SUCCESS:
    case DELETE_LIST_FAILURE:
    case ADD_TODO_SUCCESS:
    case ADD_TODO_FAILURE:
    case UPDATE_TODO_SUCCESS:
    case UPDATE_TODO_FAILURE:
    case DELETE_TODO_SUCCESS:
    case DELETE_TODO_FAILURE:
      return { ...state, lists: action.lists, loading: false };

    case SET_SELECTED_LIST_ID:
      return { ...state, selectedListId: action._id };
    default:
      return { ...state };
  }
};

export default rootReducer;