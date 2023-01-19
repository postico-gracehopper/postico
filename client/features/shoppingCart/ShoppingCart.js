import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../auth/authSlice';
import ShoppingCartItem from './ShoppingCartItem';
import Checkout from '../checkout/Checkout';
import { Link } from 'react-router-dom';
import selectCartId from './shoppingCartSlice';

const ShoppingCart = () => {
  const data = useSelector(selectMe);
  const userId = data.id;

  const dispatch = useDispatch();

  const items = useSelector((state) => state.shoppingCart.orderItems);

  const subTotal = useSelector((state) => state.shoppingCart.subTotal);
  const orderId = useSelector((state) => state.shoppingCart.cartId);

  const dollarsToCents = (amount) => {
    return parseInt(amount) * 100;
  };

  return (
    <div className="p-11 bg-ecru">
      <div className="cartContent">
        <div className="itemsColumn">
          <h3 className="text-3xl mt-8 font-bitter">Shopping cart</h3>
          <hr className="h-px my-8 bg-pebble border-0"></hr>
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
          <hr className="h-px my-8 bg-pebble border-0"></hr>
          <div className="flex justify-between content-center">
            <button className="inline-block px-8 py-2 bg-darkcru hover:bg-tahiti hover:text-white hover:scale-110 ease-in-out duration-200">
              <Link to="/products">
                <p>Keep shopping</p>
              </Link>
            </button>
            {items && items.length ? (
              <Checkout
                amount={dollarsToCents(subTotal)}
                name="Postico checkout"
                description="Get ready to ski!"
                orderId={orderId}
              />
            ) : (
              <p>No checkout button for you :(</p>
            )}
          </div>
        </div>
        <div className="summaryColumn">
          <h3 className="text-3xl mt-8 font-bitter text-right">Summary</h3>
          <hr className="h-px my-8 bg-pebble border-0 "></hr>
          <ul>
            {items && items.length ? (
              <>
                <table>
                  <tbody className="border-collapse border-none">
                    <tr>
                      <td className="px-6 py-4 font-plex uppercase">
                        Subtotal:
                      </td>
                      <td className="px-6 py-4 font-plex uppercase">
                        $
                        {subTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-plex uppercase">
                        Shipping:
                      </td>
                      <td className="px-6 py-4 font-plex uppercase">Free</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-2xl font-plex font-bold uppercase border-t-2 border-t-pebble">
                        Total:
                      </td>
                      <td className="px-6 py-4 text-2xl font-plex font-bold uppercase border-t-2 border-t-pebble">
                        $
                        {subTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
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
    </div>
  );
};

export default ShoppingCart;
