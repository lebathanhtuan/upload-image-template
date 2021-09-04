import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, ORDER_ACTION, CART_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';
import history from '../../utils/history';

function* orderProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/orders`, data);
    yield axios.patch(`${SERVER_API_URL}/users/${id}`, {
      cart: []
    });
    yield put({ type: CART_ACTION.CLEAR_CART_LIST });
    yield history.push('/');
    yield put({
      type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(ORDER_ACTION.ORDER_PRODUCT), payload: e.message });
  }
}

export default function* orderSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga);
}
