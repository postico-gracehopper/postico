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

// Finds and returns a user's active order Id
// User.prototype.getCartId = async function () {
//   const orderId = await Order.findOne({
//     where: { userId: this.id, orderPaid: false },
//     attributes: ['id'],
//   });
//   if (orderId === null) {
//     console.log('No active cart Id found for this user!');
//   } else {
//     console.log('User active cartId: ', orderId);
//   }
//   return orderId;
// };

// Finds and returns a user's active order instance, including it's associated OrderItems and those OrderItem's associated products
// User.prototype.getCart = async function () {
//   const order = await Order.findOne({
//     where: { userId: this.id, orderPaid: false },
//     include: {
//       model: OrderItem,
//       include: Product,
//     },
//   });
//   if (order === null) {
//     console.log('No active cart found for this user!');
//   } else {
//     console.log('User active cart: ', order);
//   }
//   return order;
// };


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
