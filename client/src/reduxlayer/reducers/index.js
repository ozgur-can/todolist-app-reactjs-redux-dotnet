const reducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case "GET_TASKS":
      return { ...state, loading: true };
    case "CREATE_TASK":
      return { ...state };
    case "FINISH_TASK":
      return { ...state };
  }
};
export default reducer;

// const reducer = (state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "GET_NEWS":
//       return { ...state, loading: true };
//     case "NEWS_RECEIVED":
//       return { ...state, news: action.json[0], loading: false };
//     case "NEWS_FETCH_FAILED":
//       return { ...state, news: null, loading: true };
//     case "INCREASE":
//       return { ...state, count: state.count + 1 };
//     default:
//       return state;
//   }
// };
//
// export default reducer;
