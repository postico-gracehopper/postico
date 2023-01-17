import React from 'react';
import { ChangeQuantityAsync } from './shoppingCartSlice';
import { useDispatch } from 'react-redux';

const ShoppingCartItem = ({ item }) => {
  const { image, name, totalItemPrice, quantity, orderItemId } = item;

  const dispatch = useDispatch();

  const handleIncrement = (evt) => {
    evt.preventDefault();
    const num = 1;
    dispatch(ChangeQuantityAsync({ orderItemId, num }));
  };

  const handleDecrement = (evt) => {
    evt.preventDefault();
    const num = -1;
    if (quantity > 0) {
      dispatch(ChangeQuantityAsync({ orderItemId, num }));
    }
  };

  return (
    <>
      <div className="cartItem">
        <div className="cartImageCol">
          <img src={image} />
        </div>
        <div className="cartInfoCol">
          <h4>{name}</h4>
          <h5>${totalItemPrice}</h5>
        </div>
        <div className="cartQuantityCol">
          <p>Quantity: {quantity}</p>
          <nobr>
            <button type="submit" onClick={handleIncrement}>
              +
            </button>
            <span> / </span>
            <button
              type="submit"
              onClick={handleDecrement}
              disabled={quantity >= 0 ? false : true}
            >
              -
            </button>
          </nobr>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartItem;
