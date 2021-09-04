import { createReducer } from '@reduxjs/toolkit';
import { REQUEST, SUCCESS, FAILURE, CATEGORY_ACTION } from '../constants';

const initialState = {
  categoryList: {
    data: [],
    load: false,
    error: null,
  },
}

const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: true,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: [
          data,
          ...state.categoryList.data,
        ],
      },
    }
  },

  [SUCCESS(CATEGORY_ACTION.EDIT_CATEGORY)]: (state, action) => {
    const { data } = action.payload;
    const newCategoryList = [...state.categoryList.data];
    const categoryIndex = newCategoryList.findIndex((category) => category.id === data.id);
    newCategoryList.splice(categoryIndex, 1, data);
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: newCategoryList,
      },
    };
  },

  [SUCCESS(CATEGORY_ACTION.DELETE_CATEGORY)]: (state, action) => {
    const { id } = action.payload;
    const newCategoryList = [...state.categoryList.data];
    const categoryIndex = newCategoryList.findIndex((category) => category.id === id);
    newCategoryList.splice(categoryIndex, 1);
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        data: newCategoryList,
      },
    };
  },
});

export default categoryReducer;
