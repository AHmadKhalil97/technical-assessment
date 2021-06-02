//Action Types
export const ACTION_TYPES = {
  UPDATE_LISTS: "UPDATE_LISTS",
  UPDATE_TODOS: "UPDATE_TODOS",
  SET_SELECTED_LIST: "SET_SELECTED_LIST"
};

const initialState = {
  lists: [],
  todos: [],
  selectedList: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LISTS:
      return { ...state, lists: action.lists };
    case ACTION_TYPES.UPDATE_TODOS:
      return { ...state, todos: action.todos };
    case ACTION_TYPES.SET_SELECTED_LIST:
      return { ...state, selectedList: action.listIndex };
    default:
      return { ...state };
  }
};

//Action Creator
export const updateLists = lists => ({
  type: ACTION_TYPES.UPDATE_LISTS,
  lists,
});


export const updateTodos = todos => ({
  type: ACTION_TYPES.UPDATE_TODOS,
  todos,
});

export const setSelectedList = listIndex => ({
  type: ACTION_TYPES.SET_SELECTED_LIST,
  listIndex,
});

export default rootReducer;