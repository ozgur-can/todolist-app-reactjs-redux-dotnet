const reducer = (state = { toggleData: false }, action) => {
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
    case "TOGGLE_POPUP":
      return { ...state, toggleData: action.toggleData };
    case "TASKS_RECEIVED":
      return { ...state, news: action.json, loading: false };
    case "TASKS_FETCH_FAILED":
      return { ...state, news: null, loading: true };
    default:
      return state;
  }
};
export default reducer;
