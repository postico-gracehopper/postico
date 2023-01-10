const Sequelize = require('sequelize');
const db = require('../db');

const ShoppingCart = db.define('shoppingCart', {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    //TODO when items are added to shopping cart items then we add their price to this total
  },
  //associate with ShoppingCartItems model and Users model through magic method: i.e. when someone creates a cart for the first time:
  //  - create a new ShoppingCart instance (it will create a shopping cart id)
  //  - if a logged in user, associate with User model using "set" magic method (e.g. ShoppingCart.setUser(User object))
  //  - create a new ShoppingCartItem instance (it will create a shopping cart item id)
  //  - associate the ShoppingCart with ShoppingCartItem using "set" magic method (e.g. ShoppingCartItem.setShoppingCart(ShoppingCart object))
  //  - add item price to the ShoppingCart total

  //  magic method list for reference: https://medium.com/@jsmney/a-more-in-depth-look-at-sequelizes-magic-methods-428928c70d58#:~:text=What%20are%20magic%20methods%3F,rows%20in%20a%20relational%20database.
});

module.exports = ShoppingCart;
