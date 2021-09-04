import { put, takeEvery, debounce } from "redux-saga/effects";
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, PRODUCT_ACTION } from '../constants';
import { SERVER_API_URL } from './apiUrl';

import history from '../../utils/history';
import { PRODUCT_LIMIT } from '../../constants/product';

function* getProductListSaga(action) {
  try {
    const page = action.payload?.page;
    const categoriesSelected = action.payload?.categoriesSelected;
    const priceRange = action.payload?.priceRange;
    const searchKey = action.payload?.searchKey;
    const more = action.payload?.more;
    let categoryParams = '';
    if (categoriesSelected) {
      categoriesSelected.forEach((categoryId, categoryIndex) => {
        const andParams = categoryIndex < categoriesSelected.length - 1 ? '&' : '';
        categoryParams = categoryParams + `categoryId=${categoryId}${andParams}`;
      });
    }
    const url = categoriesSelected?.length > 0
      ? `${SERVER_API_URL}/products?${categoryParams}`
      : `${SERVER_API_URL}/products`
    const result = yield axios({
      method: 'GET',
      url,
      params: {
        _sort: 'id',
        _order: 'desc',
        ...page && {
          _page: page,
          _limit: PRODUCT_LIMIT,
        },
        ...priceRange && {
          price_gte: priceRange[0],
          price_lte: priceRange[1],
        },
        ...searchKey && { q: searchKey }
      }
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        page,
        more,
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_LIST), payload: e.message });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`${SERVER_API_URL}/products/${id}?_expand=category`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL), payload: e.message });
  }
}

function* createProductSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${SERVER_API_URL}/products`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        data: result.data,
      },
    });
    yield history.push('/admin/products');
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.CREATE_PRODUCT), payload: e.message });
  }
}

function* editProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${SERVER_API_URL}/products/${id}`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT),
      payload: {
        data: result.data,
      }
    });
    yield history.push('/admin/products');
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.EDIT_PRODUCT), payload: e.message });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${SERVER_API_URL}/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(PRODUCT_ACTION.DELETE_PRODUCT), payload: e.message });
  }
}

export default function* productSaga() {
  yield debounce(300 ,REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL), getProductDetailSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.EDIT_PRODUCT), editProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
