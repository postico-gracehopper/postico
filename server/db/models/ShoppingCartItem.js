const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingCartItem = db.define('shoppingCartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  //also associate with ShoppingCartItems model and Users model
});

module.exports = ShoppingCartItem;
