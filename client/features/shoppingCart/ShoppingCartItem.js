import React from 'react';
import { ChangeQuantityAsync, RemoveItemAsync } from './shoppingCartSlice';
import { useDispatch } from 'react-redux';

const ShoppingCartItem = ({ item }) => {
  const { image, name, totalItemPrice, quantity, orderItemId } = item;

  const dispatch = useDispatch();

  const handleIncrement = (evt) => {
    evt.preventDefault();
    const num = 1;
    dispatch(ChangeQuantityAsync({ orderItemId, num }));
  };

  const handleDecrement = (evt) => {
    evt.preventDefault();
    const num = -1;
    if (quantity > 0) {
      dispatch(ChangeQuantityAsync({ orderItemId, num }));
    }
  };

  const handleRemove = (evt) => {
    evt.preventDefault();
    dispatch(RemoveItemAsync(orderItemId));
  };

  return (
    <>
      <div className="cartItem">
        <div className="cartImageCol">
          <img src={image} className="rounded-md pr-8" />
        </div>
        <div className="cartInfoCol">
          <h4 className="text-sm uppercase font-plex tracking-widest">
            {name}
          </h4>
          <h5>${totalItemPrice}</h5>
        </div>
        <div className="cartQuantityCol">
          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent m-2">
            <button
              type="submit"
              onClick={handleDecrement}
              disabled={quantity >= 0 ? false : true}
              className=" bg-[#ebe9e1] text-[#4b5563] hover:text-[#374151] hover:bg-[#d7d3c2] h-full w-20 rounded-l cursor-pointer outline-none"
            >
              <span className="m-auto text-2xl font-thin">−</span>
            </button>

            <p className="focus:outline-none text-center w-full bg-[#ebe9e1] font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center justify-center text-[#374151]  outline-none">
              {quantity}
            </p>
            <button
              type="submit"
              onClick={handleIncrement}
              className="bg-[#ebe9e1] text-[#4b5563] hover:text-gray-700 hover:bg-[#d7d3c2] h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
          <button type="submit" onClick={handleRemove}>
            <small>Remove item</small>
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartItem;
