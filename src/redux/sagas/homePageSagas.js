import { fork, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../../basic/constants/actionTypes";

// worker for add record.
function* workerAddRecord(action) {
  try {
    yield put({
      type: ActionTypes.ADD_RECORD_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({ type: ActionTypes.ADD_RECORD_FAIL, message: err.message });
  }
}
// watch for add record.
function* watchAddRecord() {
  yield takeLatest(ActionTypes.ADD_RECORD_REQUEST, workerAddRecord);
}

// worker for update record.
function* workerUpdateRecord(action) {
  try {
    yield put({
      type: ActionTypes.UPDATE_RECORD_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({ type: ActionTypes.UPDATE_RECORD_FAIL, message: err.message });
  }
}
// watch for update record.
function* watchUpdateRecord() {
  yield takeLatest(ActionTypes.UPDATE_RECORD_REQUEST, workerUpdateRecord);
}

// worker for delete record.
function* workerDeleteRecord(action) {
  try {
    yield put({
      type: ActionTypes.DELETE_RECORD_SUCCESS,
      payload: action.payload,
    });
  } catch (err) {
    yield put({ type: ActionTypes.DELETE_RECORD_FAIL, message: err.message });
  }
}
// watch for delete record.
function* watchDeleteRecord() {
  yield takeLatest(ActionTypes.DELETE_RECORD_REQUEST, workerDeleteRecord);
}

// running homepage related sagas.
const homePageSagas = [
  fork(watchAddRecord),
  fork(watchUpdateRecord),
  fork(watchDeleteRecord),
];

export default homePageSagas;
