const Sequelize = require('sequelize');
const db = require('../db');
// const {
//   models: { OrderItem },
// } = require('../index');

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

// instanceMethods

// method to update total price... not sure if we can do this using the orderId in OrderItem that's yet to be associated...
// TODO check calculations on cents
// Order.prototype.updatePrice = async function () {
//   const previousPrice = this.total;
//   const orderItems = await OrderItem.findAll({ where: { orderId: this.id } });
//   const newPrice = orderItems.reduce(
//     (acc, item) => acc + item.totalItemPrice,
//     0
//   );
//   this.total = newPrice;
//   console.log(
//     `Total order price updated from '${previousPrice}' to '${this.total}'`
//   );
// };

/**
 * hooks
 */

// Order.afterCreate(updatePrice());
// Order.afterUpdate(updatePrice());
// Order.afterSave(updatePrice());
// Order.afterUpsert(updatePrice());

module.exports = Order;
