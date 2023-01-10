const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  // add customer name.
  email: {
    type: Sequelize.STRING,
  },
  addressLine1: {
    type: Sequelize.STRING,
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
  },
  creditCardNumber: {
    type: Sequelize.INTEGER,
    //TODO set validation to length 16
    //TODO hash the credit card number?
  },
  creditCardName: {
    type: Sequelize.STRING,
    //TODO hash the credit card name?
  },
  creditCardExpiration: {
    type: Sequelize.STRING, //TODO determine if correct?
    //TODO hash the credit card expiry?
    //TODO validation for format MM/YY?
  },
  creditCardCVV: {
    type: Sequelize.INTEGER,
    //TODO hash the credit card CVV?
    //TODO validation for length 3?
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
