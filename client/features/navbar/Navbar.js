import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import CartIcon from './CartIcon';
import { emptyCart } from '../shoppingCart/shoppingCartSlice';

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
  const itemsInCart = items.length ? items.length : 0;

  return (
    <div>
      <nav className="relative container mx-auto px-8 bg-[#f5f4f0]">
        {/* Flex container */}
        <div className="flex items-center justify-evenly">
          <div className="text-3xl font-bungee pl-1 pr-3 text-tahiti">
            Placeholder
          </div>
          {!isGuest ? (
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest">
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
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest">
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
