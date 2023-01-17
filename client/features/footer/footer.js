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
              Tagline
            </h5>

            <p className="mb-8 text-xs">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint.
            </p>
          </div>

          <div className="flex items-center justify-center">
            {isAdmin ? (
              <a
                className="font-xl mb-2 uppercase font-plex tracking-widest"
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
