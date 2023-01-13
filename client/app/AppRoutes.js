import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from './store';
import Products from '../features/products/productComponent';
import ShoppingCart from '../features/shoppingCart/ShoppingCart';
import SingleProduct from '../features/products/singleProductComponent';
import AdminRouter from '../features/adminView/AdminRouter';
import { fetchAllUserItemsAsync } from '../features/shoppingCart/shoppingCartSlice';

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ENTER APPROUTES USE EFFECT');
    if (userId) {
      console.log('APPROUTE USERID: ', userId);
      dispatch(fetchAllUserItemsAsync(userId));
    } else {
      //clear cart action reducer
      dispatch(me());
    }
  }, [userId]);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route to="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/adminView/*" element={<AdminRouter />} />
          <Route path="/checkout" element={<ShoppingCart />} />
          <Route path="/products/:id" element={<SingleProduct />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          /> 
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route
            path="/admin/*"
            element={<AdminRouter />}
          />
          <Route path="/checkout" element={<ShoppingCart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
