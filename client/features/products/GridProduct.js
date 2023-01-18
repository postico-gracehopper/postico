import React from 'react';
import { Link } from 'react-router-dom';

const GridProduct = ({ id, name, image, description, price }) => {
  return (
    <div>
      <img src={image} className="w-48 h-48 rounded" />
      <span>
        <Link to={`/products/${id}`}>
          <div className="text-sm uppercase font-plex tracking-widest hover:text-tahiti">
            {name}
          </div>
        </Link>
        <div className="text-xs uppercase font-plex tracking-widest pb-4">
          ${price}
        </div>
      </span>
      <p className="text-[8px]">{description}</p>
    </div>
  );
};

export default GridProduct;
