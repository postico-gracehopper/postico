import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import shoppingCartReducer from '../features/shoppingCart/shoppingCartSlice';
import singleProductReducer from '../features/products/singleProductSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer,
    singleProduct: singleProductReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
