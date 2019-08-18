import shortid from "shortid";

export const getTasks = () => ({
  type: "GET_TASKS"
});

export const createTask = text => ({
  type: "CREATE_TASK",
  id: shortid.generate(),
  text: text
});

export const finishTask = text => ({
  type: "FINISH_TASK",
  id: shortid.generate(), // id bilgisi api'den gelmeli
  text: text
});
