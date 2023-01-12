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
      <div class="relative overflow-hidden">
        <img
          src="https://www.ischgl.com/media/ischgl/WINTER/SKIGEBIET/image-thumb__53475433__og-image/SKI_ALPIN_2022%20%287%29.webp"
          className="object-cover w-full h-full"
        />
        <p className="absolute bottom-0 right-0 text-4xl font-plex text-ecru">
          <b>
            Welcome, <i>{username}</i>
          </b>
          <div>
            <Link to="/products">
              <button type="button" className="hover:text-tahiti">
                Shop
              </button>
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Home;
