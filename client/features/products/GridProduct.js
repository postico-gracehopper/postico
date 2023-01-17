import React from 'react';
import { Link } from 'react-router-dom';

const GridProduct = ({ id, name, image, description, price }) => {
  return (
    <div>
      <Link to={`/products/${id}`}>
        <img src={image} className="w-48 h-48 rounded" />
        <span>
          <div className="text-sm uppercase font-plex tracking-widest">
            {name}
          </div>
          <div className="text-xs uppercase font-plex tracking-widest pb-4">
            ${price}
          </div>
        </span>
        <p className="text-[8px]">{description}</p>
      </Link>
    </div>
  );
};

export default GridProduct;
