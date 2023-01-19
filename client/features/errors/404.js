import React from 'react';
import { Link } from 'react-router-dom';

const FourOhFour = (props) => {
  return (
    <div>
      <div className="flex justify-center my-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/47/47782.png"
          width="120px"
        />
      </div>
      <div className="text-center text-6xl font-bitter">
        You took a wrong turn.
      </div>
      <div className="text-center font-plex uppercase tracking-wider py-12">
        No worries. Surely you were trying to buy something.
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/products">
          <button className="px-12 py-2 rounded-full hover:scale-110 font-plex text-ecru hover:bg-pool text-4xl bg-anguilla transition ease-in-out duration-200">
            <i>Shop</i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FourOhFour;
