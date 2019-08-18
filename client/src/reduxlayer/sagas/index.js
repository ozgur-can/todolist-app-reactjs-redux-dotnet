import { put, takeLatest, all, delay, fork } from "redux-saga/effects";
function* fetchTasks() {
  try {
    const json = yield fetch(
      "https://newsapi.org/v2/top-headlines?country=tr&apiKey=25c4b24fb9074a7e867be11610fd7473"
    ).then(res => res.json());
    yield put({ type: "TASKS_RECEIVED", json: json.articles });
  } catch (e) {
    yield put({ type: "TASKS_FETCH_FAILED", message: e.message });
  }
}

function* addTask(action) {
  // add post request
  try {
    yield delay(1000);
    yield put({ type: "TASK_ADDED" });
  } catch (e) {
    console.log("adding task failed");
  }
}

function* finishTask(action) {
  //add delete request
  //then, get request or fetchTasks again
  try {
    yield put({
      type: "TASK_FINISHED",
      id: action.id,
      text: action.text,
      completed: true
    });
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
