const router = require('express').Router();
const {
  models: { Order, OrderItem, Product, User },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyIsSpecificUserOrAdmin,
} = require('./apiHelpers');

const PUBLIC_ORDER_FIELDS = ['id', 'total', 'orderPaid', 'userId'];

// ADMIN only
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      // attributes: PUBLIC_ORDER_FIELDS,
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// ADMIN or Specific User
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      attributes: PUBLIC_ORDER_FIELDS,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Specific user only
router.post('/', async (req, res, next) => {
  console.log('ENTERED ADD-TO-CART API');
  // Determine whether user has an order already and add appropriately to Order and OrderItem models
  // First time
  // Second time, new product
  // Second time, previous product
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    console.log('REQ.USER.ID: ', req.user.id);
    OrderItem.addToCart(userId, productId, quantity);

    // console.log('Router quantity', quantity);
    // console.log('Router productId', productId);
    // console.log('Router userId', userId);

    // // Check to see if an Order exists or create it and associate with a user
    // const [order, createdOrder] = await Order.findOrCreate({
    //   where: {
    //     userId: userId,
    //     orderPaid: false,
    //   },
    // });
    // if (createdOrder) {
    //   // If an order was created...
    //   // Create its first OrderItem and associate it with the order and product and assign quantity from add-to-cart button
    //   console.log(
    //     `New order created for userId: ${userId} -- orderId: ${order.id}`
    //   );
    //   const orderItem = await OrderItem.create({
    //     quantity: quantity,
    //     productId: productId,
    //     orderId: order.id,
    //   });
    //   console.log(
    //     `Order created. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${order.id} -- orderItem.id ${orderItem.id}`
    //   );
    // } else {
    //   // If an order wasn't created, it means the order already exists and was returned to "order".
    //   // Check to see if an OrderItem exists for this product already exists or create it
    //   const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
    //     where: {
    //       orderId: order.id,
    //       productId: productId,
    //     },
    //     defaults: {
    //       // if it is created...
    //       orderId: order.id, // associate the order
    //       productId: productId, // associate the product
    //       quantity: quantity, // set it's quantity
    //     },
    //   });
    //   if (createdOrderItem) {
    //     console.log(
    //       `Order exists. New orderItem CREATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
    //     );
    //   } else {
    //     // if the order item wasn't created, update it's quantity
    //     orderItem.quantity += quantity;
    //     console.log(
    //       `Order exists. OrderItem UPDATED productId: ${orderItem.productId} associated with orderId: ${orderItem.orderId} -- orderItem.id ${orderItem.id}`
    //     );
    //     await orderItem.save();
    //   }
    // }
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// ADMIN or Specific User
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      attributes: PUBLIC_ORDER_FIELDS,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// change quantity
router.put('/', async (req, res, next) => {
  try {
    console.log('****** PUT ROUTE ENTER *******');
    const { id, num } = req.body;
    console.log('🚀 ~ file: orders.js:136 ~ router.put ~ req.body', req.body);
    console.log('🚀 ~ file: orders.js:136 ~ router.put ~ num', num);
    console.log('🚀 ~ file: orders.js:136 ~ router.put ~ id', id);
    const orderItem = await OrderItem.findByPk(id, { include: Product });
    orderItem.quantity += num;
    await orderItem.save();
    const orderSubTotal = await Order.findByPk(orderItem.orderId);
    res.json({ orderItem, orderSubTotal });
  } catch (err) {
    next(err);
  }
});

// Admin only
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    await Order.update(updatedOrder, { where: { id: id } });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// Admin only
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.destroy({ where: { id: id } });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
