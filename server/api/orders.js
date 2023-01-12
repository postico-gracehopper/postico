const router = require('express').Router();
const {
  models: { Order, OrderItem, Product, User },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyIsSpecificUserOrAdmin,
} = require('./apiHelpers');

const PUBLIC_ORDER_FIELDS = [
  'total',
  'email',
  'addressLine1',
  'addressLine2',
  'city',
  'zipCode',
];

// ADMIN only
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: PUBLIC_ORDER_FIELDS,
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
  // Determine whether user has an order already and add appropriately to Order and OrderItem models
  // First time
  // Second time, new product
  // Second time, previous product
  try {
    const { userId, productId, quantity } = req.body;
    // Check to see if an Order exists or create it and associate with a user
    const [order, createdOrder] = await Order.findOrCreate({
      where: {
        userId: userId,
        orderPaid: false,
      },
    });
    if (createdOrder) {
      // If an order was created...
      // Create its first OrderItem and associate it with the order and product and assign quantity from add-to-cart button
      const orderItem = await OrderItem.create({
        quantity: quantity,
        productId: productId,
        orderId: orderId,
      });
      // Update the orderItem's total price using the model's instance method
      orderItem.updateTotalPrice();
    } else {
      // If an order wasn't created...
      // Check to see if an OrderItem exists for this product already exists or create it
      // If creating, associate with
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
      if (!createdOrderItem) {
        // if the order item wasn't created, update it's quantity
        orderItem.quantity += quantity;
      }
      // Update the orderItem's total price using the model's instance method
      orderItem.updateTotalPrice();
    }
    // Update the order's price using the model's instance method
    order.updatePrice();
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// JP: Saving Blake's post route code, for deletion.
// router.post('/', async (req, res, next) => {
//   try {
//     const order = req.body;
//     await Order.create(order);
//     res.status(201).send();
//   } catch (err) {
//     next(err);
//   }
// });

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
