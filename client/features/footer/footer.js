import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
  const isAdmin = useSelector((state) => !!state.auth.me.adminRights);

  return (
    <footer className="bg-stone text-center lg:text-left mt-auto">
      <div className="container p-6 text-ecru">
        <div className="grid lg:grid-cols-3 gap-11">
          <div className="mb-6 md:mb-0 col-span-2">
            <h5 className="font-xl mb-2 uppercase font-plex tracking-widest">
              Welcome to Yardsale
            </h5>

            <p className="mb-8 text-xs">
              Whether you're a pro or a novice, we've got all the ski gear you
              need to make your next ski trip a success...or a memorable
              failure. Whatever happens, don't worry––it's probably not our
              fault.
            </p>
          </div>

          <div className="flex items-center justify-center">
            {isAdmin ? (
              <a
                className="font-xl mb-2 uppercase font-plex tracking-widest text-center hover:text-tahiti hover:scale-110 ease-in-out duration-200"
                href="/admin/"
              >
                Admin dashboard
              </a>
            ) : (
              <p className="font-xl mb-2 uppercase font-plex tracking-widest">
                Weather/widget
              </p>
            )}
          </div>
        </div>
        <div className="text-center text-[10px] font-plex uppercase tracking-widest">
          © 2022 Team Postico
        </div>
      </div>
    </footer>
  );
};

export default Footer;
