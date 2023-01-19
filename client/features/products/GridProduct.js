import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const GridProduct = ({ id, name, image, description, price }) => {
  return (
    <div className="pt-2">
      <img src={image} className="w-48 h-48 rounded-lg" />
      <span>
        <Link to={`/products/${id}`}>
          <div className="text-sm uppercase font-plex tracking-widest hover:text-tahiti">
            {name}
          </div>
        </Link>
        <div className="flex justify-between">
          <div className="text-xs uppercase font-plex tracking-widest">
            ${price}
          </div>
        </div>
      </span>
    </div>
  );
};

export default GridProduct;
