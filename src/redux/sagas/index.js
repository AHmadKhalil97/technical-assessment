import { put, takeLatest, all } from 'redux-saga/effects';
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
} from '../constants'

function* fetchLists() {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/list/get')
    .then(response => response.json());
  if (lists?.length)
    yield put({ type: GET_LISTS_SUCCESS, lists });
  else
    yield put({ type: GET_LISTS_FAILURE, lists: [] });
}

function* addList(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/list/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.list)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: ADD_LIST_SUCCESS, lists });
  else
    yield put({ type: ADD_LIST_FAILURE, lists: [] });
}

function* updateList(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/list/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.list)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: UPDATE_LIST_SUCCESS, lists });
  else
    yield put({ type: UPDATE_LIST_FAILURE, lists: [] });
}

function* deleteList(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/list/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.list)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: DELETE_LIST_SUCCESS, lists });
  else
    yield put({ type: DELETE_LIST_FAILURE, lists: [] });
}

function* addTodo(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/todo/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.todo)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: ADD_TODO_SUCCESS, lists });
  else
    yield put({ type: ADD_TODO_FAILURE, lists: [] });
}

function* updateTodo(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/todo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.todo)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: UPDATE_TODO_SUCCESS, lists });
  else
    yield put({ type: UPDATE_TODO_FAILURE, lists: [] });
}

function* deleteTodo(action) {
  const lists = yield fetch(process.env.REACT_APP_API_URL + '/todo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action.todo)
  }).then(res => res.json())

  if (lists?.length)
    yield put({ type: DELETE_TODO_SUCCESS, lists });
  else
    yield put({ type: DELETE_TODO_FAILURE, lists: [] });
}

function* actionWatcher() {
  yield takeLatest(GET_LISTS, fetchLists)
  yield takeLatest(ADD_LIST, addList)
  yield takeLatest(UPDATE_LIST, updateList)
  yield takeLatest(DELETE_LIST, deleteList)
  yield takeLatest(GET_TODOS, fetchTodos)
  yield takeLatest(ADD_TODO, addTodo)
  yield takeLatest(UPDATE_TODO, updateTodo)
  yield takeLatest(DELETE_TODO, deleteTodo)
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}