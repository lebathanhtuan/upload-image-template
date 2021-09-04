import { createAction } from '@reduxjs/toolkit';
import { REQUEST, CATEGORY_ACTION } from '../constants';

export const getCategoryListAction = createAction(REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST));
export const createCategoryAction = createAction(REQUEST(CATEGORY_ACTION.CREATE_CATEGORY));
export const editCategoryAction = createAction(REQUEST(CATEGORY_ACTION.EDIT_CATEGORY));
export const deleteCategoryAction = createAction(REQUEST(CATEGORY_ACTION.DELETE_CATEGORY));
