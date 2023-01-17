const router = require('express').Router();
const {
  models: { User, Order, OrderItem, Product },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyIsSpecificUserOrAdmin,
  verifyNotGuest,
} = require('./apiHelpers');

const PUBLIC_USER_FIELDS = [
  'id',
  'username',
  'firstName',
  'lastname',
  'email',
  'addressLine1',
  'addressLine2',
  'city',
  'zipCode',
  'adminRights',
];

router.get('/', verifyIsAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      //attributes: PUBLIC_USER_FIELDS
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', verifyIsAdmin, async (req, res, next) => {
  try {
    const user = req.body;
    await User.create(user);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.put('/', verifyIsAdmin, async (req, res, next) => {
  try {
    // $ add server-side verification
    const changedUsers = req.body;
    if (Array.isArray(changedUsers)) {
      changedUsers.forEach(async (user) => {
        await User.update(user, { where: { id: user.id } });
      });
    } else {
      await User.update(changedUsers, { where: { id: changedUsers.id } });
    }
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.get(
  '/:id',
  verifyInteger,
  verifyIsSpecificUserOrAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        //attributes: PUBLIC_USER_FIELDS
      });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

//  fetch the order for a given user, including its associated orderItems
router.get(
  '/:id/cart',
  verifyInteger,
  verifyIsSpecificUserOrAdmin,
  async (req, res, next) => {
    try {
      // const user = await User.findByPk(req.params.id);
      // const orders = await Order.findOne({
      //   where: { userId: user.id, orderPaid: false },
      //   include: {
      //     model: OrderItem,
      //     include: {
      //       model: Product,
      //     },
      //   },
      // });
      const cart = await User.getUnwrappedCartForUserId(req.user.id);
      res.json(cart);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  verifyInteger,
  verifyNotGuest,
  verifyIsSpecificUserOrAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      await User.update(updatedUser, { where: { id: id } });
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  verifyInteger,
  verifyNotGuest,
  verifyIsSpecificUserOrAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id: id } });
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
