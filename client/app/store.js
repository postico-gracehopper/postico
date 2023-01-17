import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import shoppingCartReducer from '../features/shoppingCart/shoppingCartSlice';
import singleProductReducer from '../features/products/singleProductSlice';
import userReducer from '../features/users/usersSlice';
import singleUserReducer from '../features/users/singleUserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    shoppingCart: shoppingCartReducer,
    singleProduct: singleProductReducer,
    users: userReducer,
    singleUser: singleUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
