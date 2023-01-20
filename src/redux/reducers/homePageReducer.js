import * as ActionTypes from "../../basic/constants/actionTypes";
import {
  getRecordsFromStorage,
  setRecordsInStorage,
} from "../../basic/helpers";

const getRecords = getRecordsFromStorage();

const initialState = {
  records: getRecords.length > 0 ? JSON.parse(getRecords) : [],
  loading: false,
  error: null,
};

const initialRequest = (state) => ({
  ...state,
  loading: true,
  error: null,
});
const requestFail = (state, action) => {
  return { ...state, error: action.error, loading: false };
};

// add record
const addRecord = (state, action) => {
  if (action.payload) {
    const updatedRecords = [...state.records, action.payload];
    setRecordsInStorage(updatedRecords);
    return {
      ...state,
      records: action.payload,
      error: null,
      loading: false,
    };
  }
};

// update record
const updateRecord = (state, action) => {
  if (action.payload) {
    const otherRecords = state.records.filter(
      (record) => record.id !== action.payload.id
    );
    setRecordsInStorage([...otherRecords, action.payload]);
    return {
      ...state,
      records: [...otherRecords, action.payload],
      error: null,
      loading: false,
    };
  }
};

// delete record
const deleteRecord = (state, action) => {
  if (action.payload) {
    const otherRecords = state.records.filter(
      (record) => record.id !== action.payload
    );
    setRecordsInStorage(otherRecords);
    return {
      ...state,
      records: otherRecords,
      error: null,
      loading: false,
    };
  }
};

export default function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_RECORD_REQUEST:
      return initialRequest(state, action);
    case ActionTypes.UPDATE_RECORD_REQUEST:
      return initialRequest(state, action);
    case ActionTypes.DELETE_RECORD_REQUEST:
      return initialRequest(state, action);

    case ActionTypes.ADD_RECORD_SUCCESS:
      return addRecord(state, action);
    case ActionTypes.UPDATE_RECORD_SUCCESS:
      return updateRecord(state, action);
    case ActionTypes.DELETE_RECORD_SUCCESS:
      return deleteRecord(state, action);

    case ActionTypes.ADD_RECORD_FAIL:
      return requestFail(state, action);
    case ActionTypes.UPDATE_RECORD_FAIL:
      return requestFail(state, action);
    case ActionTypes.DELETE_RECORD_FAIL:
      return requestFail(state, action);

    default:
      return state;
  }
}
