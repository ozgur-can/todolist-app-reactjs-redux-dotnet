import shortid from "shortid";

export const getTasks = (date) => ({
  type: "GET_TASKS",
  urlDate: date
});

export const createTask = (text, date) => ({
  type: "CREATE_TASK",
  id: shortid.generate(),
  text: text,
  date: date
});

export const finishTask = (text, id) => ({
  type: "FINISH_TASK",
  id: id,
  text: text
});

export const togglePopup = value => ({
  type: "TOGGLE_TASK_MODAL",
  toggleTaskModal: value
});
