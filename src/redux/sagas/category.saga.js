import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, CATEGORY_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(`${SERVER_API_URL}/categories`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(CATEGORY_ACTION.GET_CATEGORY_LIST), payload: e.message });
  }
}

function* createCategorySaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/categories`, data);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(CATEGORY_ACTION.CREATE_CATEGORY), payload: e.message });
  }
}

function* editCategorySaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/categories/${id}`, data);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.EDIT_CATEGORY),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(CATEGORY_ACTION.EDIT_CATEGORY), payload: e.message });
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/categories/${id}`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(CATEGORY_ACTION.DELETE_CATEGORY), payload: e.message });
  }
}

export default function* todoSaga() {
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST), getCategoryListSaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.CREATE_CATEGORY), createCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.EDIT_CATEGORY), editCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.DELETE_CATEGORY), deleteCategorySaga);
}
