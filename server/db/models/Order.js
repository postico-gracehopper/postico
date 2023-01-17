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
// Order.prototype.calcSubTotal = async function () {
//   const orderItemArray = await this.getOrderItems();
//   return orderItemArray.reduce((acc, item) => {
//     acc + item.totalItemPrice;
//   }, 0);
// };

// classMethods

// Order.getOrderByPk = async function (orderId) {
//   try {
//     return await Order.findByPk(orderId);
//   } catch (err) {
//     console.error('Failed to getOrderByPk: ', err);
//     error.innerText = err.response
//       ? err.response.data.message
//       : 'Request Timed Out';
//   }
// };

// Order.addToCart = async function (userId, productId, quantity) {
//   console.log('Add-to-cart userId', userId);
//   console.log('Add-to-cart productId', productId);
//   console.log('Add-to-cart quantity', quantity);
//   const [order, createdOrder] = await Order.findOrCreate({
//     where: {
//       userId: userId,
//       orderPaid: false,
//     },
//   });
//   if (createdOrder) {
//     // If an order was created...
//     // Create its first OrderItem and associate it with the order and product and assign quantity from add-to-cart button
//     console.log(
//       `New order created for userId: ${userId} -- orderId: ${order.id}`
//     );
//     const orderItem = await OrderItem.create({
//       quantity: quantity,
//       productId: productId,
//       orderId: order.id,
//     });
//     console.log(
//       `Order created. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${order.id} -- orderItem.id ${orderItem.id}`
//     );
//   } else {
//     // If an order wasn't created, it means the order already exists and was returned to "order".
//     // Check to see if an OrderItem exists for this product already exists or create it
//     const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
//       where: {
//         orderId: order.id,
//         productId: productId,
//       },
//       defaults: {
//         // if it is created...
//         orderId: order.id, // associate the order
//         productId: productId, // associate the product
//         quantity: quantity, // set it's quantity
//       },
//     });
//     if (createdOrderItem) {
//       console.log(
//         `Order exists. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
//       );
//     } else {
//       // if the order item wasn't created, update it's quantity
//       orderItem.quantity += quantity;
//       console.log(
//         `Order exists. OrderItem UPDATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
//       );
//       await orderItem.save();
//     }
//   }
//   await order.calcSubTotal();
// };
