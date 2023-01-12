import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import {
  selectShoppingCart,
  fetchAllUserItemsAsync,
} from './shoppingCartSlice';

const ShoppingCart = () => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUserItemsAsync(userId));
  }, [dispatch]);

  const shoppingCart = useSelector(selectShoppingCart);

  return <div></div>;
};

export default ShoppingCart;
