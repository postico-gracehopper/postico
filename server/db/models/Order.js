const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  //TODO define a hook/method that calculates total order price based on all order total prices
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
  orderPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  //  - when someone "proceeds to checkout" we create a new order item, copying all data from ShoppingCart instance
  //  - associate with OrderItems model and Users model (if not a guest)
  //  - if a logged in user, associate with User model using "set" magic method (e.g. ShoppingCart.setUser(User object))
  //  - create new OrderItem instance (it will create a shopping cart item id), copying all ShoppingCartItem instances
  //  - associate the Order with OrderItems using "set" magic method (e.g. OrderItem.setOrder(Order object))

  //  magic method list for reference: https://medium.com/@jsmney/a-more-in-depth-look-at-sequelizes-magic-methods-428928c70d58#:~:text=What%20are%20magic%20methods%3F,rows%20in%20a%20relational%20database.

  //  if someone is a user, add their credit card info to Order instance from User model
  //  if someone is a guest, add their credit card info from checkout form

  //  if someone is a user, add their address info to Order instance from User model
  //  if someone is a guest, add their address info from checkout form

  //  once they "pay", set orderPaid to true
});

module.exports = Order;
