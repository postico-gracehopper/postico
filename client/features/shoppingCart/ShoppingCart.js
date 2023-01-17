import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import ShoppingCartItem from './ShoppingCartItem';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const dispatch = useDispatch();

  const items = useSelector((state) => state.shoppingCart.orderItems);
  const subTotal = useSelector((state) => state.shoppingCart.subTotal);
  const orderId = useSelector((state) => state.shoppingCart);

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
          <Checkout
            amount={subTotal}
            name="Postico checkout"
            description="Get ready to ski!"
            orderId={orderId}
          />
          {/* TODO disable checkout button if cart empty */}
          <Link to="/products">
            <button>Keep shopping</button>
          </Link>
        </div>
        <div className="summaryColumn">
          <h3>Summary</h3>
          <ul>
            {items && items.length ? (
              <>
                <li>Subtotal: ${subTotal}</li>
                <li>Shipping: Free</li>
                <li>Total: ${subTotal}</li>
              </>
            ) : (
              <>
                <li>Subtotal: -</li>
                <li>Shipping: -</li>
                <li>Total: -</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
