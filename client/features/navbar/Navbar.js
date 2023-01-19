import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import { emptyCart } from '../shoppingCart/shoppingCartSlice';
import CartIcon from './CartIcon';

const Navbar = () => {
  const isGuest = useSelector((state) => !!state.auth.me.isGuest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(emptyCart());
    navigate('/home');
  };

  const items = useSelector((state) => state.shoppingCart.orderItems);
  const itemsInCart = items.length
    ? items.reduce((acc, item) => (item.quantity > 0 ? acc + 1 : acc), 0)
    : 0;

  return (
    <div>
      <nav className="relative container mx-auto bg-[#f5f4f0]">
        {/* Flex container */}
        <div className="flex items-center justify-between">
          <img
            src="https://media2.giphy.com/media/OYFDJPlGVs0l95DJQy/giphy.gif?cid=790b76112d2f993760dec2f2e69a749bb903f14f33ea7d0e&rid=giphy.gif&ct=g"
            width="200"
          />
          {!isGuest ? (
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest pr-8">
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="hover:text-tahiti mt-2">
                Home
              </Link>
              <Link to="/products" className="hover:text-tahiti mt-2">
                Shop
              </Link>
              <span
                type="button"
                onClick={logoutAndRedirectHome}
                className="inline-block hover:text-tahiti mt-2"
              >
                LOGOUT
              </span>
              <Link to="/checkout" className="hover:text-tahiti mt-0">
                <CartIcon number={itemsInCart} />
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest pr-8">
              {/* The navbar will show these links before you log in */}
              <Link to="/home" className="hover:text-tahiti mt-2">
                Home
              </Link>
              <Link to="/products" className="hover:text-tahiti mt-2">
                Shop
              </Link>
              <Link to="/login" className="hover:text-tahiti mt-2">
                Login
              </Link>
              <Link to="/signup" className="hover:text-tahiti mt-2">
                Sign Up
              </Link>
              <Link to="/checkout" className="hover:text-tahiti mt-0">
                <CartIcon number={itemsInCart} />
              </Link>
            </div>
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
