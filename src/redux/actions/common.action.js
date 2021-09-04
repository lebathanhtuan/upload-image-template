import { createAction } from '@reduxjs/toolkit';
import { COMMON_ACTION } from '../constants';

export const changeThemeAction = createAction(COMMON_ACTION.CHANGE_THEME);
