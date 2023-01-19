import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import { addToCartAsync } from '../shoppingCart/shoppingCartSlice';

const AddToCartButton = ({ product, quantity }) => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const productId = product.id;

  const dispatch = useDispatch();

  const handleAddToCart = async (evt) => {
    evt.preventDefault();
    try {
      dispatch(addToCartAsync({ userId, productId, quantity }));
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
      className="font-plex uppercase text-xs text-anguilla  hover:text-tahiti hover:scale-110 ease-in-out duration-200"
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;
