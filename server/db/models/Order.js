const Sequelize = require('sequelize');
const db = require('../db');
// const OrderItem = require('./OrderItem');
const Product = require('./Product');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
  orderPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Order.markAsPaid = async (orderId) => {
  const order = await Order.findByPk(orderId);
  order.orderPaid = true;
  order.save();
  return 'Order marked as paid!';
};

// Order.findAllWithProducts = async () => {
//   const orders = await Order.findAll({
//     include: {
//       model: OrderItem,
//       include: {
//         model: Product,
//       },
//     },
//   });
//   return orders;
// };

// Order.findOneWithProducts = async (id) => {
//   const order = await Order.findOne({
//     where: { id: id },
//     include: {
//       model: OrderItem,
//       include: {
//         model: Product,
//       },
//     },
//   });
//   return order;
// };

// Order.getOrderHistoryForUserId = async (usrId) => {
//   const orders = await Order.findAll({
//     where: { userId: usrId },
//     include: {
//       model: OrderItem,
//       include: {
//         model: Product,
//       },
//     },
//   });
//   return orders;
// };

module.exports = Order;
