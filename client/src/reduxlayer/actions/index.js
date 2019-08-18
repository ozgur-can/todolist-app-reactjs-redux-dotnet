import shortid from "shortid";

export const getTasks = () => ({
  type: "GET_TASKS"
});

export const createTask = text => ({
  type: "CREATE_TASK",
  id: shortid.generate(),
  text: text
});

export const finishTask = (text, id) => ({
  type: "FINISH_TASK",
  id: id, // id bilgisi api'den gelmeli
  text: text
});

export const togglePopup = value => ({
  type: "TOGGLE_POPUP",
  toggleData: value
});
