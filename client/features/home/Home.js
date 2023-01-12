import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <img src="https://www.ischgl.com/media/ischgl/WINTER/SKIGEBIET/image-thumb__53475433__og-image/SKI_ALPIN_2022%20%287%29.webp" />
      <Link to="/products">
        <button type="button">Shop</button>
      </Link>
    </div>
  );
};

export default Home;
