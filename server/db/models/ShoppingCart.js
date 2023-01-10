const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingCart = db.define('shoppingCart', {
  total: {
    type: Sequelize.FLOAT,
    //TODO when items are added to shopping cart items then we add their price to this total?
  },
  //also associate with ShoppingCartItems model and Users model
});

module.exports = ShoppingCart;
