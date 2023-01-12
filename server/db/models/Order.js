const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('../index');

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
});

// instanceMethods

// method to update total price... not sure if we can do this using the orderId in OrderItem that's yet to be associated...
Order.prototype.updatePrice = async function () {
  const orderItems = await OrderItem.findAll({ where: { orderId: this.id } });
  const total = orderItems.reduce((acc, item) => acc + item.totalItemPrice, 0);
  return (this.total = total);
};

module.exports = Order;
