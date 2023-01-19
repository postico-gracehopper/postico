const router = require('express').Router();
const {
  models: { Order, OrderItem, Product, User },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyOwnsOrderOrIsAdmin,
  verifyOwnsOrderItemOrIsAdmin,
} = require('./apiHelpers');

// ADMIN only
router.get('/', verifyIsAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAllWithProducts();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// ADMIN or Specific User - need to add middleware
router.get(
  '/:id',
  verifyInteger,
  verifyOwnsOrderOrIsAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await Order.findOneWithProducts(id);
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity, userId } = req.body;
    // custom middleware
    if (!req.user.adminRights) {
      if (Number(userId) !== Number(req.user.id))
        throw new Error('User does not own the cart');
    }
    await OrderItem.addToCart(userId, productId, quantity);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// change quantity
router.put('/', verifyOwnsOrderItemOrIsAdmin, async (req, res, next) => {
  try {
    const { orderItemId, num } = req.body;
    const data = await OrderItem.changeQuantity(orderItemId, num);
    const { orderItem, orderSubTotal } = data;
    res.json({ orderItem, orderSubTotal });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', verifyInteger, verifyIsAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedOrder = req.body;
    await Order.update(updatedOrder, { where: { id: id } });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.delete('/', verifyOwnsOrderItemOrIsAdmin, async (req, res, next) => {
  try {
    const { orderItemId } = req.body;
    const data = await OrderItem.removeItemFromOrder(orderItemId);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', verifyInteger, verifyIsAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.destroy({ where: { id: id } });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
