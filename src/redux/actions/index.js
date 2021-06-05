import {
  GET_LISTS,
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  SET_SELECTED_LIST_ID
} from '../constants'

//Action Creator
export const getLists = () => ({
  type: GET_LISTS,
});

export const addList = list => ({
  type: ADD_LIST,
  list,
});

export const updateList = list => ({
  type: UPDATE_LIST,
  list,
});

export const deleteList = list => ({
  type: DELETE_LIST,
  list,
});

export const addTodo = todo => ({
  type: ADD_TODO,
  todo,
});

export const updateTodo = todo => ({
  type: UPDATE_TODO,
  todo,
});

export const deleteTodo = todo => ({
  type: DELETE_TODO,
  todo,
});

export const setSelectedListId = _id => ({
  type: SET_SELECTED_LIST_ID,
  _id,
});