//Action Types
export const ACTION_TYPES = {
  UPDATE_LISTS: "UPDATE_LISTS",
  UPDATE_TODOS: "UPDATE_TODOS",
  SET_SELECTED_LIST_ID: "SET_SELECTED_LIST_ID"
};

const initialState = {
  lists: [],
  selectedListId: null
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LISTS:
      return { ...state, lists: action.lists };
    case ACTION_TYPES.UPDATE_TODOS:
      return { ...state, todos: action.todos };
    case ACTION_TYPES.SET_SELECTED_LIST_ID:
      return { ...state, selectedListId: action._id };
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

export const setSelectedListId = _id => ({
  type: ACTION_TYPES.SET_SELECTED_LIST_ID,
  _id,
});

export default rootReducer;