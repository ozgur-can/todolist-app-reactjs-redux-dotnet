import {
  put,
  takeLatest,
  all,
  call,
  delay,
  fork,
  takeEvery
} from "redux-saga/effects";

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
  // add post request
  try {
    //example fetch post req
    yield fetch("https://localhost:44341/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: action.id,
        name: action.text,
        completed: false,
        date: action.date
      })
    }).then(res => res.json());

    //wait 1 sec after clicked "create task button"
    // yield delay(5000);
    yield put({
      type: "TASK_ADDED",
      id: action.id,
      text: action.text,
      date: action.date,
      completed: false
    });
    // after task added, call fetchTask again
    yield call(fetchTasks);
  } catch (e) {
    console.log("adding task failed");
  }
}

function* finishTask(action) {
  //add delete request
  try {
    // yield fetch(
    //   `https://localhost:44341/tasks/delete/${action.date}/${action.id}`,
    //   {
    //     method: "HEAD"
    //   }
    // );

    yield put({
      type: "TASK_FINISHED",
      id: action.id,
      text: action.text,
      completed: true,
      date: action.date
    });

    // after task deleted, call fetchTask again
    yield put({ type: "GET_TASKS", urlDate: action.date });
    // yield call(fetchTasks, action.date);
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
  yield takeEvery("GET_TASKS", fetchTasks);
  // yield takeEvery("GET_TASKS", fetchTasks);
}

export default function* rootSaga() {
  yield all([fork(watchFetchTasks), fork(watchDeleteTask), fork(watchAddTask)]);
}
