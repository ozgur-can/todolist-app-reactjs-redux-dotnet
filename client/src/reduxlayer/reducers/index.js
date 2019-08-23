const reducer = (state = { toggleTaskModal: false, urlDate: "" }, action) => {
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
      return { ...state, loading: true, urlDate: "" };
    case "FINISH_TASK":
      return { ...state, id: action.id, text: action.text, completed: true };
    case "TOGGLE_TASK_MODAL":
      return { ...state, toggleTaskModal: action.toggleTaskModal };
    case "VISIBILITY_CHECKBOX":
      return { ...state, visCheckbox: !action.visCheckbox };
    case "TASKS_RECEIVED":
      return {
        toggleTaskModal: false,
        tasks: action.json,
        loading: false,
        urlDate: action.urlDate
      };
    case "TASKS_FETCH_FAILED":
      return { ...state, news: null, tasks: null, loading: true };
    default:
      return state;
  }
};
export default reducer;
