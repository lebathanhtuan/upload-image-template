import { createAction } from '@reduxjs/toolkit';
import { REQUEST, PRODUCT_ACTION } from '../constants';

export const getProductListAction = createAction(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST));
export const getProductDetailAction = createAction(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL));
export const createProductAction = createAction(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT));
export const editProductAction = createAction(REQUEST(PRODUCT_ACTION.EDIT_PRODUCT));
export const deleteProductAction = createAction(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT));
