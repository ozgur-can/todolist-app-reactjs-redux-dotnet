import { put, takeLatest, all, call, delay, fork } from "redux-saga/effects";
function* fetchTasks(action) {
  try {
    const json = yield fetch(
      "https://localhost:44341/tasks/details/" + action.urlDate
    ).then(res => res.json());
    yield put({ type: "TASKS_RECEIVED", json: json, urlDate: action.urlDate });
  } catch (e) {
    yield put({ type: "TASKS_FETCH_FAILED", message: e.message , urlDate: action.urlDate});
  }
}

function* addTask(action) {
  // add post request
  try {
    //example fetch post req
    // const json2 = yield fetch("https://productlistapi.herokuapp.com/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ sku: "123412", name: "ozgur", price: 12 })
    // }).then(res => res.json());

    //wait 1 sec after clicked "create task button"
    yield delay(1000);
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

    yield fetch(
      "https://localhost:44341/api/tasktodo/28-3-1994/31212/"  , {method:"DELETE"}
    ).then(res => res.json());

    yield put({
      type: "TASK_FINISHED",
      id: action.id,
      text: action.text,
      completed: true
    });
    // after task deleted, call fetchTask again
    yield call(fetchTasks);
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
