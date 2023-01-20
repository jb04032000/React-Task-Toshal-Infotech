import * as ActionTypes from "../../basic/constants/actionTypes";

export function addRecord(data) {
  return {
    type: ActionTypes.ADD_RECORD_REQUEST,
    payload: data,
  };
}
export function updateRecord(data) {
  return {
    type: ActionTypes.UPDATE_RECORD_REQUEST,
    payload: data,
  };
}
export function deleteRecord(data) {
  return {
    type: ActionTypes.DELETE_RECORD_REQUEST,
    payload: data,
  };
}
