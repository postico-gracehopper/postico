import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSingleProductAsync,
  selectSingleProduct,
  changeQuantity,
} from '../products/singleProductSlice';
import { useParams } from 'react-router-dom';
import AddToCartButton from '../addToCartButton/AddToCartButton';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectSingleProduct);
  const { id } = useParams();
  const quantity = useSelector((state) => state.singleProduct.quantity);

  useEffect(() => {
    dispatch(fetchSingleProductAsync(id));
  }, [id]);

  const handleQuantity = (evt) => {
    dispatch(changeQuantity(evt.target.value));
  };

  return (
    <div>
      <section className="text-stone overflow-hidden">
        <div className="container px-5 py-24 mx-auto bg-ecru">
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
              <div className="flex justify-between items-center">
                <div className="font-plex text-2xl text-stone">
                  ${product.price}
                </div>
                <div className="flex flex-col">
                  <div className="font-plex text-xs my-2 uppercase tracking-widest text-pebble">
                    Quantity
                  </div>
                  <select
                    className="rounded-md font-plex text-xs p-1 mb-4 text-stone"
                    name="product-filter"
                    id="product-filter"
                    onChange={handleQuantity}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <AddToCartButton
                    product={product}
                    quantity={quantity}
                    className="text-xl "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleProduct;
