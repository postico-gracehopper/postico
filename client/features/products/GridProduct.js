import React from 'react';
import { Link } from 'react-router-dom';

const GridProduct = ({ id, name, image, description, price }) => {
  return (
    <div>
      <h1>This is a grid product</h1>
      <Link to={`/products/${id}`}>
        <img src={image} className="w-48 h-48" />
        <span>
          <h2 className="text-sm uppercase font-plex tracking-widest">
            {name}
          </h2>
          <h2>${price}</h2>
        </span>
        <p className="text-[8px]">{description}</p>
      </Link>
    </div>
  );
};

export default GridProduct;
