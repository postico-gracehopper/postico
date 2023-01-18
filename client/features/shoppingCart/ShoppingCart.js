import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import ShoppingCartItem from './ShoppingCartItem';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';
import { selectCartId } from './shoppingCartSlice';

const ShoppingCart = () => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const dispatch = useDispatch();

  const items = useSelector((state) => state.shoppingCart.orderItems);

  const subTotal = useSelector((state) => state.shoppingCart.subTotal);

  // const orderId = useSelector(selectCartId);
  const orderId = 1;

  const dollarsToCents = (amount) => {
    return parseInt(amount) * 100;
  };

  return (
    <>
      <div className="cartContent">
        <div className="itemsColumn">
          <h3>Shopping Cart</h3>
          <ul>
            {items && items.length ? (
              items.map((item) => (
                <li key={`Cart Item ${item.orderItemId}`}>
                  <ShoppingCartItem item={item} />
                </li>
              ))
            ) : (
              <li>Cart empty!</li>
            )}
          </ul>
          <Checkout
            amount={dollarsToCents(subTotal)}
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
                <table className="border-separate border-spacing-2 border border-slate-400">
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 text-plex uppercase tracking-widest">
                        Subtotal:
                      </td>
                      <td className="px-6 py-4 text-plex uppercase tracking-widest">
                        ${subTotal}
                      </td>
                    </tr>
                    <tr>
                      <td>Shipping:</td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td>Total:</td>
                      <td>${subTotal}</td>
                    </tr>
                  </tbody>
                </table>
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
