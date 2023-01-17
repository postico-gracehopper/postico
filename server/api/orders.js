const router = require('express').Router();
const {
  models: { Order, OrderItem, Product, User },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyOwnsOrderOrIsAdmin,
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
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    await OrderItem.addToCart(userId, productId, quantity);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// change quantity
router.put('/', async (req, res, next) => {
  try {
    // console.log('****** PUT ROUTE ENTER *******');
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
