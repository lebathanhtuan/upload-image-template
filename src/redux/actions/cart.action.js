import { createAction } from '@reduxjs/toolkit';
import { REQUEST, CART_ACTION } from '../constants';

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const plusItemCountAction = createAction(REQUEST(CART_ACTION.PLUS_ITEM_COUNT));
export const minusItemCountAction = createAction(REQUEST(CART_ACTION.MINUS_ITEM_COUNT));
export const deleteCartItemAction = createAction(REQUEST(CART_ACTION.DELETE_CART_ITEM));
export const clearCartListAction = createAction(REQUEST(CART_ACTION.CLEAR_CART_LIST));
