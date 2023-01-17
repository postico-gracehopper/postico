import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsAsync, selectProducts } from './productSlice';
import { Link } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productsCopy = [...products];

  const [productFilter, setProductFilter] = useState(productsCopy);

  const handleFilter = (evt) => {
    evt.target.value !== 'All'
      ? setProductFilter(
          productsCopy.filter((product) => {
            return product.category === evt.target.value;
          })
        )
      : setProductFilter(productsCopy);
  };

  const handleSort = (evt) => {
    if (evt.target.value === '-') {
      setProductFilter(productsCopy);
    }
    if (evt.target.value === 'Price: Low to High') {
      setProductFilter(
        productsCopy.sort((a, b) => (a.price < b.price ? -1 : 0))
      );
    }
    if (evt.target.value === 'Price: High to Low') {
      setProductFilter(
        productsCopy.sort((a, b) => (a.price > b.price ? -1 : 0))
      );
    }
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div>
      <span className="flex">
        <label htmlFor="product-filter">Filter Products By: </label>
        <select
          name="product-filter"
          id="product-filter"
          onChange={handleFilter}
        >
          <option value="All">All</option>
          <option value="Boots">Boots</option>
          <option value="Apparel">Apparel</option>
          <option value="Skis">Skis</option>
        </select>
        <label htmlFor="product-sort">Sort Products by: </label>
        <select name="product-sort" id="product-sort" onChange={handleSort}>
          <option value="-">-</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
        </select>
      </span>
      {productFilter.length > 0
        ? productFilter.map((product) => {
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
                  <p>{product.description}</p>
                </Link>
                <AddToCartButton product={product} quantity={1} />
              </div>
            );
          })
        : products.map((product) => {
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
                  <p>{product.description}</p>
                </Link>
                <AddToCartButton product={product} quantity={1} />
              </div>
            );
          })}
    </div>
  );
};

export default Products;
