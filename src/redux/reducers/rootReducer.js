//Action Types
export const ACTION_TYPES = {
  UPDATE_LISTS: "UPDATE_LISTS",
  UPDATE_TODOS: "UPDATE_TODOS"
};

const initialState = {
  lists: [],
  todos: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_LISTS:
      return { ...state, lists: action.lists };
    case ACTION_TYPES.UPDATE_TODOS:
      return { ...state, todos: action.todos };
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

export default rootReducer;