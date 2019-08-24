import { put, takeLatest, all, delay, fork } from "redux-saga/effects";

function* fetchTasks(action) {
  try {
    // get request to get the task list
    const json = yield fetch(
      `https://localhost:44341/api/tasktodo/gettasks/${action.urlDate}`
    ).then(res => res.json());

    // check task list array is empty or not
    if (Array.isArray(json) && json.length === 0) {
      throw new Error("task list empty");
    } else
      yield put({
        type: "TASKS_RECEIVED",
        json: json,
        urlDate: action.urlDate
      });
  } catch (e) {
    yield put({
      type: "TASKS_FETCH_FAILED",
      message: e.message,
      urlDate: action.urlDate
    });
  }
}

function* addTask(action) {
  try {
    // post request to add a task
    yield fetch("https://localhost:44341/api/tasktodo/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: action.id,
        name: action.text,
        completed: false,
        date: action.date
      })
    });

    // if request success, then send "TASK_ADDED" action with these parameters
    yield put({
      type: "TASK_ADDED",
      id: action.id,
      text: action.text,
      date: action.date,
      completed: false
    });

    // fetch tasks, after task added
    yield put({ type: "GET_TASKS", urlDate: action.date });
  } catch (e) {
    // catch when request fail
    yield put({
      type: "ADDING_FAILED",
      id: action.id,
      text: action.text,
      date: action.date
    });
  }
}

function* finishTask(action) {
  try {
    // delete request to finish a task
    yield fetch(
      `https://localhost:44341/api/tasktodo/delete/${action.date}/${action.id}`,
      {
        method: "DELETE"
      }
    );

    // if request success, then send "TASK_FINISHED" action with these parameters
    yield put({
      type: "TASK_FINISHED",
      id: action.id,
      text: action.text,
      completed: true,
      date: action.date
    });

    // wait 1 second, after clicked task checkbox
    yield delay(1000);
    // after deleting, fetch the new state of the task list
    yield put({ type: "GET_TASKS", urlDate: action.date });
  } catch (e) {
    // catch when request fail
    yield put({ type: "TASK_FINISH_FAILED" });
  }
}

// redux actions and its trigger saga functions
function* watchAddTask() {
  yield takeLatest("CREATE_TASK", addTask);
}

function* watchDeleteTask() {
  yield takeLatest("FINISH_TASK", finishTask);
}

function* watchFetchTasks() {
  yield takeLatest("GET_TASKS", fetchTasks);
}

// used fork for executing functions at the same time
export default function* rootSaga() {
  yield all([fork(watchFetchTasks), fork(watchDeleteTask), fork(watchAddTask)]);
}
