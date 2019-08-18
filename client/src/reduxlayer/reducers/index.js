const reducer = (state = { toggleTaskModal: false }, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return {
        ...state,
        id: action.id,
        text: action.text,
        date: action.date,
        completed: false
      };
    case "GET_TASKS":
      return { ...state, loading: true };
    case "FINISH_TASK":
      return { ...state, id: action.id, text: action.text, completed: true };
    case "TOGGLE_TASK_MODAL":
      return { ...state, toggleTaskModal: action.toggleTaskModal };
    case "TASKS_RECEIVED":
      return { toggleTaskModal: false, news: action.json, loading: false };
    case "TASKS_FETCH_FAILED":
      return { ...state, news: null, loading: true };
    default:
      return state;
  }
};
export default reducer;
