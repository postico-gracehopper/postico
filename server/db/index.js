//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

//associations!
User.hasMany(Order);
Order.belongsTo(User);
//
Product.hasOne(OrderItem);
OrderItem.belongsTo(Product);
//
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
//

// Define global instance methods here.


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
