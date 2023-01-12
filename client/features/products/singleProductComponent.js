import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
} from '../products/singleProductSlice';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId));
  }, [productId]);

  return (
    <div>
      <img src={product.image} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <AddToCartButton product={product} quantity={1} />
    </div>
  );
};

export default SingleProduct;
