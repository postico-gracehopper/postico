import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
import CartIcon from './CartIcon';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <nav className="relative container mx-auto px-8 bg-[#f5f4f0]">
        {/* Flex container */}
        <div className="flex items-center justify-evenly">
          <div className="text-3xl font-bungee pl-1 pr-3 text-tahiti">
            Placeholder
          </div>
          {isLoggedIn ? (
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest">
              {/* The navbar will show these links after you log in */}
              <Link to="/home" className="hover:text-tahiti">
                Home
              </Link>
              <Link to="/products" className="hover:text-tahiti">
                Shop
              </Link>
              <span
                type="button"
                onClick={logoutAndRedirectHome}
                className="inline-block hover:text-tahiti"
              >
                LOGOUT
              </span>
              <span>Tester</span>
              <Link to="/checkout" className="hover:text-tahiti">
                <CartIcon number="3" />
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-6 text-sm uppercase font-plex tracking-widest">
              {/* The navbar will show these links before you log in */}
              <Link to="/home" className="hover:text-tahiti">
                Home
              </Link>
              <Link to="/products" className="hover:text-tahiti">
                Shop
              </Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/checkout" className="hover:text-tahiti">
                <CartIcon number="1" />
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
