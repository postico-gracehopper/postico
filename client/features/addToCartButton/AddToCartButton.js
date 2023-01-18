import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import {
  fetchAllUserItemsAsync,
  addToCartAsync,
} from '../shoppingCart/shoppingCartSlice';

const AddToCartButton = ({ product, quantity }) => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const productId = product.id;

  const dispatch = useDispatch();

  const handleAddToCart = async (evt) => {
    evt.preventDefault();
    try {
      // await axios.post(
      //   '/api/orders',
      //   { userId, productId, quantity },
      //   { headers: { authorization: window.localStorage.getItem('token') } }
      // );
      dispatch(addToCartAsync({ userId, productId, quantity }));
      // dispatch(fetchAllUserItemsAsync(userId));
    } catch (err) {
      console.error('Failed to add-to-cart (POST /api/orders)', err);
      err.innerText = err.response
        ? err.response.data.message
        : 'Request Timed Out';
    }
  };

  return (
    <button
      type="submit"
      onClick={handleAddToCart}
      className="font-plex uppercase text-xs text-tahiti"
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
