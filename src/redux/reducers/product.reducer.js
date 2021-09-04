import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, PRODUCT_ACTION } from '../constants';

const initialState = {
  productList: {
    data: [],
    page: 1,
    load: false,
    error: null,
  },
  productDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, page, more } = action.payload;
    if (more) {
      return {
        ...state,
        productList: {
          ...state.productList,
          data: [
            ...state.productList.data,
            ...data,
          ],
          page,
          load: false,
          error: null,
        },
      }
    } else {
      return {
        ...state,
        productList: {
          ...state.productList,
          data,
          page: 1,
          load: false,
          error: null,
        },
      }
    }
  },
  [FAILURE(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: true,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    console.log('🚀 ~ file: product.reducer.js ~ line 80 ~ [SUCCESS ~ data', data);
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productList: {
        ...state.productList,
        data: [
          data,
          ...state.productList.data,
        ],
      },
    }
  },

  [SUCCESS(PRODUCT_ACTION.EDIT_PRODUCT)]: (state, action) => {
    const { data } = action.payload;
    const newProductList = [...state.productList.data];
    const productIndex = newProductList.findIndex((product) => product.id === data.id);
    newProductList.splice(productIndex, 1, data);
    return {
      ...state,
      productList: {
        ...state.productList,
        data: newProductList,
      },
    };
  },

  [SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT)]: (state, action) => {
    const { id } = action.payload;
    const newProductList = [...state.productList.data];
    const productIndex = newProductList.findIndex((product) => product.id === id);
    newProductList.splice(productIndex, 1);
    return {
      ...state,
      productList: {
        ...state.productList,
        data: newProductList,
      },
    };
  },
});

export default productReducer;
