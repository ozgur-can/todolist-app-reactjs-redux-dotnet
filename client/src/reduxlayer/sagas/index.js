import { put, takeLatest, all, delay, fork } from "redux-saga/effects";
import axios from "axios";
//`https://localhost:44341/tasks/details/${action.urlDate}`

function* fetchTasks(action) {
  try {
    const json = yield fetch(
      `https://localhost:44341/tasks/details/${action.urlDate}`
    ).then(res => res.json());

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
    // https://localhost:44341/tasks/create
    // yield axios
    //   .post(`https://localhost:44341/tasks/create`, {
    //     id: action.id,
    //     name: action.text,
    //     completed: false,
    //     date: action.date
    //   })
    //   .then(res => console.log(res));

    yield put({
      type: "TASK_ADDED",
      id: action.id,
      text: action.text,
      date: action.date,
      completed: false
    });

    // fetch the new state of the task list
    yield put({ type: "GET_TASKS", urlDate: action.date });
  } catch (e) {
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
    yield fetch(
      `https://localhost:44341/tasks/delete/${action.date}/${action.id}`,
      {
        method: "DELETE"
      }
    );

    yield put({
      type: "TASK_FINISHED",
      id: action.id,
      text: action.text,
      completed: true,
      date: action.date
    });

    yield delay(1000);
    // after delete, fetch the new state of the task list
    yield put({ type: "GET_TASKS", urlDate: action.date });
  } catch (e) {
    console.log("deleting task failed");
  }
}

function* watchAddTask() {
  yield takeLatest("CREATE_TASK", addTask);
}

function* watchDeleteTask() {
  yield takeLatest("FINISH_TASK", finishTask);
}

function* watchFetchTasks() {
  yield takeLatest("GET_TASKS", fetchTasks);
}

export default function* rootSaga() {
  yield all([fork(watchFetchTasks), fork(watchDeleteTask), fork(watchAddTask)]);
}
