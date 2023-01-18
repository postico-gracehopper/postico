import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from '../addToCartButton/AddToCartButton';
import SearchBar from '../searchBar/searchBar';
import {
  changeFilter,
  changeSortBy,
  sortedAndFilteredProducts,
  fetchProductsAsync,
} from './productSlice';
import GridProduct from './GridProduct';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(sortedAndFilteredProducts);

  const handleFilter = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };

  const handleSort = (evt) => {
    dispatch(changeSortBy(evt.target.value));
  };

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <div className="bg-ecru">
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
        <SearchBar />
      </span>
      <div className="grid grid-cols-3 gap-4 px-4 py-4 m-4 justify-center">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <GridProduct
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                description={product.description}
                price={product.price}
              />
              <AddToCartButton product={product} quantity={1} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;

// return (
//   <div className="bg-ecru">
//     <div className="grid grid-cols-4 gap-2 px-4 py-4">
//       {products.map((product) => {
//         return (
//           <div key={product.id}>
//             <Link to={`/products/${product.id}`}>
//               <img src={product.image} className="w-48 h-48" />
//               <span>
//                 <h2 className="text-sm uppercase font-plex tracking-widest">
//                   {product.name}
//                 </h2>
//                 <h2>${product.price}</h2>
//               </span>
//               <p className="text-[8px]">{product.description}</p>
//             </Link>
//             <AddToCartButton product={product} quantity={1} />
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );
