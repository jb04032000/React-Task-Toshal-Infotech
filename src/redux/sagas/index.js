import { all } from "redux-saga/effects";
import homePageSagas from "./homePageSagas";

export default function* rootSaga() {
  yield all([...homePageSagas]);
}
