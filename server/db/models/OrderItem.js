const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('../index');

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
OrderItem.prototype.updateTotalPrice = async function () {
  const product = await Product.findOne({ where: { id: this.productId } });
  return (this.totalItemPrice = this.quantity * product.price);
};

module.exports = OrderItem;
