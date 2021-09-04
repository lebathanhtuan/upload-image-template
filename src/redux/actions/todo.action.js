import { createAction } from '@reduxjs/toolkit';
import { REQUEST, TO_DO_ACTION } from '../constants';

export const getTaskListAction = createAction(REQUEST(TO_DO_ACTION.GET_TASK_LIST));
export const createTaskAction = createAction(REQUEST(TO_DO_ACTION.CREATE_TASK));
export const editTaskAction = createAction(REQUEST(TO_DO_ACTION.EDIT_TASK));
export const deleteTaskAction = createAction(REQUEST(TO_DO_ACTION.DELETE_TASK));
