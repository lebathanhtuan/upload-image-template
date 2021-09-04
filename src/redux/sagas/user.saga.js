import { notification } from "antd";
import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, USER_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

import history from '../../utils/history';

function* loginSaga(action) {
  try {
    const { data, prevPath } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/login`, data);
    yield localStorage.setItem('userInfo', JSON.stringify({
      role: result.data.user.role,
      accessToken: result.data.accessToken
    }));
    yield put({
      type: SUCCESS(USER_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    yield notification.success({
      message: 'Đăng nhập thành công!',
    });
    if (result.data.user.role === 'admin') {
      yield history.push('/admin')
    } else {
      if (prevPath) {
        yield history.push(prevPath);
      } else {
        yield history.push('/');
      }
    }
  } catch (e) {
    yield put({
      type: FAILURE(USER_ACTION.LOGIN),
      payload: {
        error: 'Email hoặc mật khẩu không đúng!'
      }
    });
  }
}

function* registerSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.post(`${SERVER_API_URL}/register`, data);
    yield put({ type: SUCCESS(USER_ACTION.REGISTER) });
    yield notification.success({
      message: 'Đăng ký thành công!',
    });
    yield history.push('/login');
  } catch (e) {
    if (e.response.data === 'Email already exists') {
      yield put({
        type: FAILURE(USER_ACTION.REGISTER),
        payload: {
          error: 'Email đã tồn tại!'
        }
      });
    } else {
      yield put({
        type: FAILURE(USER_ACTION.REGISTER),
        payload: {
          error: null
        },
      });
    }
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`${SERVER_API_URL}/users/${id}`);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(USER_ACTION.GET_USER_INFO), payload: e.message });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(USER_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
}
