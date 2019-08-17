import { put, takeLatest, all } from "redux-saga/effects";

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

function* actionWatcher() {
  yield takeLatest("GET_TASKS", fetchTasks);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
