const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');
const Order = require('./Order');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalItemPrice: {
    type: Sequelize.DECIMAL,
    defaultValue: 0,
  },
});

module.exports = OrderItem;

// instanceMethods

// TODO check calculations on cents
const updateItemPrices = async (orderItem) => {
  console.log('TESTING ITEM PRICE UPDATE METHOD');
  const previousPrice = orderItem.totalItemPrice;
  const product = await Product.findByPk(orderItem.productId);
  orderItem.totalItemPrice = orderItem.quantity * product.price;
  console.log(
    `OrderItem.id: ${orderItem.id} -- Order item price changed by ${
      orderItem.totalItemPrice - previousPrice
    } from ${previousPrice} to ${orderItem.totalItemPrice}`
  );
  await orderItem.save();
};

const updateTotalOrderPrice = async (orderItem) => {
  console.log('TESTING ORDER SUBTOTAL METHOD');
  const orderItems = await OrderItem.findAll({
    where: { orderId: orderItem.orderId },
  });
  const newPrice = orderItems.reduce((acc, item) => {
    const num = +item.totalItemPrice;
    return acc + num;
  }, 0);
  const order = await Order.findByPk(orderItem.orderId);
  const previousSubTotal = order.total;
  order.total = newPrice;
  console.log(
    `Order.id: ${order.id} -- Order subtotal changed by ${
      order.total - previousSubTotal
    } from ${previousSubTotal} to ${order.total}`
  );
  await order.save();
};

/**
 * hooks
 */

OrderItem.afterCreate(async (orderItem) => {
  updateItemPrices(orderItem);
  updateTotalOrderPrice(orderItem);
});
// OrderItem.afterSave(async (orderItem) => {
//   updateItemPrices(orderItem);
//   updateTotalOrderPrice(orderItem);
// });
OrderItem.afterUpdate(async (orderItem) => {
  updateItemPrices(orderItem);
  updateTotalOrderPrice(orderItem);
});
