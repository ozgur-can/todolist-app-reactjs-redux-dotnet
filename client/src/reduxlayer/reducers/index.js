const reducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_TASK":
      return [...state, { id: action.id, text: action.text, completed: false }];
    case "GET_TASKS":
      return [...state, { loading: true }];
    case "FINISH_TASK":
      return [...state, { id: action.id, text: action.text, completed: true }];
    case "TASKS_RECEIVED":
      return { ...state, news: action.json, loading: false };
    case "TASKS_FETCH_FAILED":
      return { ...state, news: null, loading: true };
    default:
      return state;
  }
};
export default reducer;
