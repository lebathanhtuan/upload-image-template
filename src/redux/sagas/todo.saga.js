import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, TO_DO_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getTaskListSaga(action) {
  try {
    const result = yield axios.get(`${SERVER_API_URL}/todos?_sort=id&_order=desc`);
    yield put({
      type: SUCCESS(TO_DO_ACTION.GET_TASK_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(TO_DO_ACTION.GET_TASK_LIST), payload: e.message });
  }
}

function* createTaskSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/todos`, data);
    yield put({
      type: SUCCESS(TO_DO_ACTION.CREATE_TASK),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(TO_DO_ACTION.CREATE_TASK), payload: e.message });
  }
}

function* editTaskSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/todos/${id}`, data);
    yield put({
      type: SUCCESS(TO_DO_ACTION.EDIT_TASK),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(TO_DO_ACTION.EDIT_TASK), payload: e.message });
  }
}

function* deleteTaskSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/todos/${id}`);
    yield put({
      type: SUCCESS(TO_DO_ACTION.DELETE_TASK),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(TO_DO_ACTION.DELETE_TASK), payload: e.message });
  }
}

export default function* todoSaga() {
  yield takeEvery(REQUEST(TO_DO_ACTION.GET_TASK_LIST), getTaskListSaga);
  yield takeEvery(REQUEST(TO_DO_ACTION.CREATE_TASK), createTaskSaga);
  yield takeEvery(REQUEST(TO_DO_ACTION.EDIT_TASK), editTaskSaga);
  yield takeEvery(REQUEST(TO_DO_ACTION.DELETE_TASK), deleteTaskSaga);
}
