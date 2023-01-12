import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import ShoppingCartItem from './ShoppingCartItem';
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
  const items = shoppingCart.orderItems;

  return (
    <>
      <div className="cartContent">
        <div className="itemsColumn">
          <h3>Shopping Cart</h3>
          <ul>
            {items && items.length ? (
              items.map((item) => (
                <li key={`Cart Item ${item.id}`}>
                  <ShoppingCartItem item={item} />
                </li>
              ))
            ) : (
              <li>Cart empty!</li>
            )}
          </ul>
          <button>Checkout</button> {/* placeholder */}
          {/* TODO disable checkout button if cart empty */}
          <button>Keep shopping</button>
        </div>
        <div className="summaryColumn">
          <h3>Summary</h3>
          <ul>
            <li>Subtotal: ${shoppingCart.total}</li>
            <li>Shipping: Free</li>
            <li>Total: ${shoppingCart.total}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
