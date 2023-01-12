import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import shoppingCartReducer from '../features/shoppingCart/shoppingCartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
