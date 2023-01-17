const Sequelize = require('sequelize');
const db = require('../db');
const OrderItem = require('./OrderItem');
const Product = require("./Product")

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

Order.getAllPlusDetails = async () => {
  const orders = await Order.findAll({
    include: {
      model: OrderItem,
      include: {
        model: Product
      }
    }
  })
}

Order.prototype.getDetails = async () => {
  const orderItems = await OrderItem.findAll({
    where: {orderId: this.id},
    include: {
      model: Product,
      required: false
    }
  })
  return orderItems
}


module.exports = Order;
