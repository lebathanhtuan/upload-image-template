import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, TO_DO_ACTION } from '../constants';

const initialState = {
  taskList: [],
}

const todoReducer = createReducer(initialState, {
  [SUCCESS(TO_DO_ACTION.GET_TASK_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      taskList: [...data],
    }
  },
  [SUCCESS(TO_DO_ACTION.CREATE_TASK)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      taskList: [
        data,
        ...state.taskList,
      ],
    }
  },
  [SUCCESS(TO_DO_ACTION.EDIT_TASK)]: (state, action) => {
    const { data } = action.payload;
    const newTaskList = [...state.taskList];
    const taskIndex = newTaskList.findIndex((task) => task.id === data.id);
    newTaskList.splice(taskIndex, 1, data);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
  [SUCCESS(TO_DO_ACTION.DELETE_TASK)]: (state, action) => {
    const { id } = action.payload;
    const newTaskList = [...state.taskList];
    const taskIndex = newTaskList.findIndex((task) => task.id === id);
    newTaskList.splice(taskIndex, 1);
    return {
      ...state,
      taskList: newTaskList,
    };
  },
});

export default todoReducer;
