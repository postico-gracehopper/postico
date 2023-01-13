import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <div className="relative overflow-hidden">
        <img
          src="https://www.ischgl.com/media/ischgl/WINTER/SKIGEBIET/image-thumb__53475433__og-image/SKI_ALPIN_2022%20%287%29.webp"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-16 right-2 text-4xl font-plex text-ecru drop-shadow-lg font-bold">
          Welcome, <i>{username}</i>
        </div>
        <div>
          <Link to="/products">
            <button className="px-12 absolute bottom-2 right-2 py-2 rounded-full hover:scale-110 font-plex text-ecru hover:bg-pool text-2xl bg-anguilla transition ease-in-out duration-200">
              <i>Shop</i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
