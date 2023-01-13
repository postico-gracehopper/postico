const router = require('express').Router();
const {
  models: { User, Order, OrderItem, Product },
} = require('../db');
const {
  verifyInteger,
  verifyIsAdmin,
  verifyIsSpecificUserOrAdmin,
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

// Restrict to only Admin
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: PUBLIC_USER_FIELDS
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = req.body;
    await User.create(user);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    console.log(req.body)
    // $ add server-side verification
    const changedUsers = req.body
    if (Array.isArray(changedUsers)){
        changedUsers.forEach(async user => {
          await User.update(user, {where: {id: user.id}})
        })
    } else {
      await User.update(changedUsers, {where: {id: changedUsers.id}})
    }
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// Placeholder until API is restricted for production
router.use('/:id', verifyInteger, async (req, res, next) => {
  // Verifies Integer first
  // token = req.headers.authorization
  // find the user associated with said token;
  const token = 'tokenholder(placeholder)';
  console.log(`${token} accessing ${req.params.id}'s data`);
  next();
});

// Restrict only Specific User or Admin
router.get('/:id', verifyInteger, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      //attributes: PUBLIC_USER_FIELDS
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// JP: Blake's saved code >>>>>>>>>>>>
// Restrict only Specific User or Admin
// router.get('/:id/cart', verifyInteger, async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const user = await User.findByPk(id, {
//       attributes: PUBLIC_USER_FIELDS,
//     })
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })
//

//  fetch the order for a given user, including its associated orderItems
router.get('/:id/cart', verifyInteger, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const orders = await Order.findOne({
      where: { userId: user.id, orderPaid: false },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Restrict only Specific User or Admin
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;
    await User.update(updatedUser, { where: { id: id } });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

// Restrict only Specific User or Admin
router.delete('/:id', verifyInteger,  async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id: id } });
    res.status(200).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
