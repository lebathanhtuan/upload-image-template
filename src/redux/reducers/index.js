
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from "redux-saga";

import productReducer from './product.reducer';
import userReducer from './user.reducer';
import todoReducer from './todo.reducer';
import categoryReducer from './category.reducer';
import cartReducer from './cart.reducer';
import commonReducer from './common.reducer';

import rootSaga from '../sagas';

let sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    productReducer: productReducer,
    userReducer: userReducer,
    todoReducer: todoReducer,
    categoryReducer: categoryReducer,
    cartReducer: cartReducer,
    commonReducer: commonReducer,
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
