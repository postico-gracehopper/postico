const Sequelize = require('sequelize');
const db = require('../db');
const {
  models: { Product },
} = require('../index');

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

// instanceMethods

// method to update totalItemPrice... not sure if we can do this using the productId that's yet to be associated...
// TODO check calculations on cents
OrderItem.prototype.updateTotalPrice = async function () {
  const previousPrice = this.totalItemPrice;
  const product = await Product.findOne({ where: { id: this.productId } });
  this.totalItemPrice = this.quantity * product.price;
  console.log(
    `Total order item price updated from '${previousPrice}' to '${this.totalItemPrice}'`
  );
};

/**
 * hooks
 */

OrderItem.afterCreate(updateTotalPrice());
OrderItem.afterUpdate(updateTotalPrice());
OrderItem.afterSave(updateTotalPrice());
OrderItem.afterUpsert(updateTotalPrice());

module.exports = OrderItem;
