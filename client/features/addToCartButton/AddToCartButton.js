import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import { fetchAllUserItemsAsync } from '../shoppingCart/shoppingCartSlice';

const AddToCartButton = ({ product, quantity }) => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const productId = product.id;

  const dispatch = useDispatch();

  const handleAddToCart = async (evt) => {
    evt.preventDefault();
    try {
      await axios.post('/api/orders', { userId, productId, quantity });
      dispatch(fetchAllUserItemsAsync(userId));
    } catch (err) {
      console.error('Failed to add-to-cart (POST /api/orders)', err);
      error.innerText = err.response
        ? err.response.data.message
        : 'Request Timed Out';
    }
  };

  return (
    <button
      type="submit"
      onClick={handleAddToCart}
      className="font-plex uppercase shadow-[inset_0_0_0_rgba(0,0,0,0.6)]"
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;

// addToCart a {
//   font-family: "Open Sans", sans-serif;
//   font-size: inherit;
//   box-shadow: inset 0 0 0 0 #c32f27;
//   color: #c32f27;
//   margin: 0 -0.25rem;
//   padding: 0 0.25rem;
//   transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
//   text-transform: uppercase;
//   text-decoration: none;
// }
// nav a:hover {
//   box-shadow: inset 250px 0 0 0 #c32f27;
//   font-size: inherit;
//   color: black;
// }
