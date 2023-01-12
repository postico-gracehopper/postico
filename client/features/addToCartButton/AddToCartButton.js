import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';

// Bryan, from your product's components you should be sending a product object and a quantity number (can be 1 for now)
const AddToCartButton = (product, quantity) => {
  const data = useSelector(selectMe);
  const userId = data.id;
  const productId = product.id;

  const handleAddToCart = async (evt) => {
    try {
      await axios.post('/api/orders', { userId, productId, quantity });
    } catch (err) {
      console.error('Failed to add-to-cart (POST /api/orders)', err);
      error.innerText = err.response
        ? err.response.data.message
        : 'Request Timed Out';
    }
  };

  return (
    <button type="submit" onClick={handleAddToCart}>
      Add to cart
    </button>
  );
};

export default AddToCartButton;
