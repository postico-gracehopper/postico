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
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [id]);

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <p className="leading-relaxed">{product.description}</p>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-stone pointer-events-none flex items-center justify-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
              <div className="flex">
                <span className="font-plex text-2xl text-stone">
                  ${product.price} //
                </span>
                <AddToCartButton
                  product={product}
                  quantity={1}
                  className="text-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;

// return (
//   <div>
//     <img src={product.image} />
//     <h2>{product.name}</h2>
//     <p>${product.price}</p>
//     <p>{product.description}</p>
//     <AddToCartButton product={product} quantity={1} />
//   </div>
// );
