import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const isGuest = useSelector((state) => !!state.auth.me.isGuest);

  return (
    <div className="relative overflow-hidden">
      <img
        src="https://www.ischgl.com/media/ischgl/WINTER/SKIGEBIET/image-thumb__53475433__og-image/SKI_ALPIN_2022%20%287%29.webp"
        className="object-cover w-full h-full"
      />
      {!isGuest ? (
        <div className="absolute bottom-16 right-2 w-1/2 transform skew-y-3 bg-tahiti">
          <div className="text-4xl text-center font-plex text-[#000000] font-bold">
            Welcome back, <i>{username}</i>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-16 right-2 w-1/2 transform skew-y-3 bg-tahiti">
          <div className="text-4xl text-center font-plex text-[#000000] font-bold">
            Where ACLs go to tear.
          </div>
        </div>
      )}
      <div>
        <Link to="/products">
          <button className="px-12 absolute bottom-2 right-2 py-2 rounded-full hover:scale-110 font-plex text-ecru hover:bg-pool text-2xl bg-anguilla transition ease-in-out duration-200">
            <i>Shop</i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
