const Sequelize = require('sequelize');
const db = require('../db');
// const OrderItem = require('./OrderItem');

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

Order.findAllWithProducts = async () => {
  const orders = await Order.findAll({
    attributes: ORDER_PUBLIC_FIELDS,
    include: {
      model: OrderItem,
      attributes: ORDER_ITEM_PUBLIC_FIELDS,
      include: {
        model: Product,
        attributes: PRODUCT_PUBLIC_FIELDS,
      },
    },
  });
  return orders;
};

Order.findOneWithProducts = async (id) => {
  const order = await Order.findOne({
    where: { id: id },
    attributes: ORDER_PUBLIC_FIELDS,
    include: {
      model: OrderItem,
      attributes: ORDER_ITEM_PUBLIC_FIELDS,
      include: {
        model: Product,
        attributes: PRODUCT_PUBLIC_FIELDS,
      },
    },
  });
  return order;
};

Order.getOrderHistoryForUserId = async (usrId) => {
  const orders = await Order.findAll({
    where: { userId: usrId },
    attributes: ORDER_PUBLIC_FIELDS,
    include: {
      model: OrderItem,
      attributes: ORDER_ITEM_PUBLIC_FIELDS,
      include: {
        model: Product,
        attributes: PRODUCT_PUBLIC_FIELDS,
      },
    },
  });
  return orders;
};

// Order.prototype.getDetails = async () => {
//   const orderItems = await OrderItem.findAll({
//     where: {orderId: this.id},
//     include: {
//       model: Product,
//       required: false
//     }
//   })
//   return orderItems
// }

module.exports = Order;

// instanceMethods

// classMethods
