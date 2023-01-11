const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalItemPrice: {
    //TODO define a hook/method that calculates total item price based on quantity x product price
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
});
//  associate with Order model and Products model through magic method
//  - create a new ShoppingCartItem instance (it will create a shopping cart item id)
//  - associate the ShoppingCart with ShoppingCartItem using "set" magic method (e.g. ShoppingCartItem.setShoppingCart(ShoppingCart object))
//  - associate with Product model using "set" magic method (e.g. ShoppingCartItem.setProduct(Product object))
//  - increment the ShoppingCartItem quantity by 1
//  - if not the first time a product is in the cart, then increment/decrement the quantity (i.e. if they push the +/- button in the cart or add again from the page)

//  magic method list for reference: https://medium.com/@jsmney/a-more-in-depth-look-at-sequelizes-magic-methods-428928c70d58#:~:text=What%20are%20magic%20methods%3F,rows%20in%20a%20relational%20database.

module.exports = OrderItem;
