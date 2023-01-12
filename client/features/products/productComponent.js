import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, selectProducts } from './productSlice';
import { Link } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

//   useEffect(() => {
//     dispatch(fetchProductsAsync());
//   }, [dispatch]);

  return (
    <div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} />
                <span>
                  <h2>{product.name}</h2>
                  <h2>${product.price}</h2>
                </span>
                <p>{product.description}</p>
              </Link>
              <AddToCartButton product={product} quantity={1} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
