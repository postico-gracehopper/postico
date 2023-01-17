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

OrderItem.addToCart = async function (userId, productId, quantity) {
  console.log('Add-to-cart userId', userId);
  console.log('Add-to-cart productId', productId);
  console.log('Add-to-cart quantity', quantity);
  const [order, createdOrder] = await Order.findOrCreate({
    where: {
      userId: userId,
      orderPaid: false,
    },
  });
  if (createdOrder) {
    // If an order was created...
    // Create its first OrderItem and associate it with the order and product and assign quantity from add-to-cart button
    console.log(
      `New order created for userId: ${userId} -- orderId: ${order.id}`
    );
    const orderItem = await OrderItem.create({
      quantity: quantity,
      productId: productId,
      orderId: order.id,
    });
    console.log(
      `Order created. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${order.id} -- orderItem.id ${orderItem.id}`
    );
  } else {
    // If an order wasn't created, it means the order already exists and was returned to "order".
    // Check to see if an OrderItem exists for this product already exists or create it
    const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: productId,
      },
      defaults: {
        // if it is created...
        orderId: order.id, // associate the order
        productId: productId, // associate the product
        quantity: quantity, // set it's quantity
      },
    });
    if (createdOrderItem) {
      console.log(
        `Order exists. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
      );
    } else {
      // if the order item wasn't created, update it's quantity
      orderItem.quantity += quantity;
      console.log(
        `Order exists. OrderItem UPDATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
      );
      await orderItem.save();
    }
  }
};

/**
 * hooks
 */

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
  const orderToUpdate = await Order.findByPk(orderItem.orderId);
  const previousSubTotal = orderToUpdate.total;
  orderToUpdate.total = newPrice;
  console.log(
    `order.id: ${orderToUpdate.id} -- order subtotal changed by ${
      orderToUpdate.total - previousSubTotal
    } from ${previousSubTotal} to ${orderToUpdate.total}`
  );
  await orderToUpdate.save();
};

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
