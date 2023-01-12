import React from 'react';

const ShoppingCartItem = ({ item }) => {
  const { quantity, product, totalItemPrice } = item;
  return (
    <>
      <div className="cartItem">
        <div className="cartImageCol">
          <img src={product.image} />
        </div>
        <div className="cartInfoCol">
          <h4>{product.name}</h4>
          <h5>${totalItemPrice}</h5>
        </div>
        <div className="cartQuantityCol">
          <p>Quantity: {quantity}</p>
          <button>+</button>
          <button>-</button>
        </div>
      </div>
      ;
    </>
  );
};

export default ShoppingCartItem;
