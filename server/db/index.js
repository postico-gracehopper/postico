//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const ShoppingCart = require('./models/ShoppingCart');
const ShoppingCartItem = require('./models/ShoppingCartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

//associations!
User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);
//
User.hasMany(Order);
Order.belongsTo(User);
//
Product.hasOne(ShoppingCartItem);
ShoppingCartItem.belongsTo(Product);
//
Product.hasOne(OrderItem);
OrderItem.belongsTo(Product);
//
ShoppingCart.hasMany(ShoppingCartItem);
ShoppingCartItem.belongsTo(ShoppingCart);
//
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
//

module.exports = {
  db,
  models: {
    User,
    Product,
    ShoppingCart,
    ShoppingCartItem,
    Order,
    OrderItem,
  },
};
