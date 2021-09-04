import { createReducer } from '@reduxjs/toolkit';
import { COMMON_ACTION } from '../constants';

const initialState = {
  theme: 'light',
}

const commonReducer = createReducer(initialState, {
  [COMMON_ACTION.CHANGE_THEME]: (state, action) => {
    return {
      ...state,
      theme: action.payload,
    }
  },
});

export default commonReducer;
