import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, selectProducts } from './productSlice';
import { Link } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2 px-4 py-4">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.image} className="w-48 h-48" />
                <span>
                  <h2 className="text-sm uppercase font-plex tracking-widest">
                    {product.name}
                  </h2>
                  <h2>${product.price}</h2>
                </span>
                <p className="text-[8px]">{product.description}</p>
              </Link>
              <AddToCartButton product={product} quantity={1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
