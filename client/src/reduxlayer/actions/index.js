let taskId = 0;

export const getTasks = () => ({
  type: "GET_TASKS"
});

export const createTask = text => ({
  type: "CREATE_TASK",
  id: taskId++,
  text: text
});

export const finishTask = text => ({
  type: "FINISH_TASK",
  id: taskId++,
  text: text
});
