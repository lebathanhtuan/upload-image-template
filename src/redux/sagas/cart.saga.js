import { notification } from "antd";
import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, CART_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

function* addToCartSaga(action) {
  try {
    const { id, data } = action.payload;
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.ADD_TO_CART),
      payload: {
        data,
      }
    });
    yield notification.success({
      message: 'Thêm vào giỏ thành công!',
    });
  } catch (e) {
    yield put({ type: FAILURE(CART_ACTION.ADD_TO_CART), payload: e.message });
  }
}

function* plusItemCountSaga(action) {
  try {
    const { id, data } = action.payload;
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.PLUS_ITEM_COUNT),
      payload: {
        data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(CART_ACTION.PLUS_ITEM_COUNT), payload: e.message });
  }
}

function* minusItemCountSaga(action) {
  try {
    const { id, data } = action.payload;
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.MINUS_ITEM_COUNT),
      payload: {
        data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(CART_ACTION.MINUS_ITEM_COUNT), payload: e.message });
  }
}

function* deleteCartItemSaga(action) {
  try {
    const { id, data } = action.payload;
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, data);
    yield put({
      type: SUCCESS(CART_ACTION.DELETE_CART_ITEM),
      payload: {
        data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(CART_ACTION.DELETE_CART_ITEM), payload: e.message });
  }
}

export default function* cartSaga() {
  yield takeEvery(REQUEST(CART_ACTION.ADD_TO_CART), addToCartSaga);
  yield takeEvery(REQUEST(CART_ACTION.PLUS_ITEM_COUNT), plusItemCountSaga);
  yield takeEvery(REQUEST(CART_ACTION.MINUS_ITEM_COUNT), minusItemCountSaga);
  yield takeEvery(REQUEST(CART_ACTION.DELETE_CART_ITEM), deleteCartItemSaga);
}
