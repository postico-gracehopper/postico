import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../app/store';
// import logo from '../../../public/images/placeholder-logo.png';

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
          {/* Logo - was previously image, using text for simplicity for now */}
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
              <button
                type="button"
                onClick={logoutAndRedirectHome}
                className="hover:text-tahiti"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-6 text-xs uppercase font-plex tracking-widest">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
