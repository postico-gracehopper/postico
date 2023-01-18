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
      <section className="text-stone overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              className="lg:w-1/2 w-full object-cover object-center rounded drop-shadow-lg"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-xs tracking-widest uppercase">
                {product.category}
              </h2>
              <h1 className="text-2xl font-plex uppercase tracking-widest font-medium mb-4">
                {product.name}
              </h1>
              <p className="leading-relaxed text-xs">{product.description}</p>
              <hr className="h-px my-8 bg-stone border-0"></hr>
              <div className="flex justify-between">
                <span className="font-plex text-2xl text-stone">
                  ${product.price}
                </span>
                <AddToCartButton
                  product={product}
                  quantity={1}
                  className="text-xl "
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
