import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, CART_ACTION, USER_ACTION } from '../constants';

const initialState = {
  cartList: {
    data: [],
    load: false,
    error: null,
  }
}

const cartReducer = createReducer(initialState, {
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    };
  },

  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    };
  },

  [SUCCESS(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    }
  },

  [SUCCESS(CART_ACTION.MINUS_ITEM_COUNT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    }
  },

  [SUCCESS(CART_ACTION.PLUS_ITEM_COUNT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    }
  },

  [SUCCESS(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: data.cart,
      },
    }
  },

  [CART_ACTION.CLEAR_CART_LIST]: (state, action) => {
    return {
      ...state,
      cartList: {
        ...state.cartList,
        data: [],
      },
    }
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      cartList: {
        data: [],
        load: false,
        error: null,
      },
    };
  },
});

export default cartReducer;
