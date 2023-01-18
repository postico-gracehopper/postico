const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');

require('dotenv').config();

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    // TODO require unique?
    validate: {
      isEmail: true,
    },
  },
  addressLine1: {
    type: Sequelize.STRING,
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
  },
  //TODO validate that it is 5-digits?
  //TODO likely remove all payments because using stripe
  creditCardNumber: {
    type: Sequelize.STRING,
  },
  creditCardName: {
    type: Sequelize.STRING,
  },
  creditCardExpiration: {
    type: Sequelize.STRING,
  },
  creditCardCVV: {
    type: Sequelize.INTEGER,
  },
  adminRights: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isGuest: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username: username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error('Incorrect username/password');
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  if (token === null || token === undefined) return null;
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw 'No user found with id';
    }
    return user;
  } catch (ex) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

User.getUnwrappedCartForUserId = async function (usrId) {
  const cart = await Order.findOne({
    where: {
      userId: usrId,
      orderPaid: false,
    },
    include: {
      model: OrderItem,
      // required: false,
      include: {
        model: Product,
      },
    },
  });
  return cart
    ? {
        //UNPACKAGED CART
        cartId: cart.id,
        orderId: cart.id,
        total: cart.total,
        orderPaid: cart.orderPaid,
        orderItems:
          cart.orderItems && cart.orderItems.length
            ? cart.orderItems.map((item) => {
                return {
                  productId: item.product.id, // if order items, map them and return the following fields
                  name: item.product.name,
                  description: item.product.description,
                  price: item.product.price,
                  image: item.product.image,
                  category: item.product.category,
                  orderItemId: item.id,
                  quantity: item.quantity,
                  totalItemPrice: item.totalItemPrice,
                };
              })
            : [], // if there is a cart, but no items
      }
    : {
        userId: usrId,
        cartId: null,
        orderId: null,
        total: '00.00', // DEFAULT NULL CART
        orderPaid: false,
        orderItems: [],
      };
};

User.prototype.getUnwrappedCart = async function () {
  return User.getUnwrappedCartForUserId(this.id);
};

User.prototype.addToCart = async function (
  productId,
  qty,
  op = (a, b) => a + b
) {
  const cart = await this.getCart();
  const product = await Product.findOne({ where: { id: productId } });
  const [oItem, oItemWasCreated] = await OrderItem.findOrCreate({
    where: {
      orderId: cart.id,
      productId: product.id,
    },
    defaults: {
      productId: product.id,
      orderId: cart.id,
    },
  });
  await oItem.update({
    quantity: oItemWasCreated ? qty : op(oItem.quantity, qty),
    totalItemPrice: oItemWasCreated
      ? product.price * qty
      : String(op(Number(oItem.totalItemPrice), product.price * qty)),
  });
  await cart.update({
    total: String(op(Number(cart.total), product.price * qty)),
  });
};

User.prototype.removeFromCart = async function (productId, qty) {
  this.addToCart(productId, qty, (a, b) => a - b);
};

User.prototype.getCart = async function () {
  const [cart, wasCreated] = await Order.findOrCreate({
    where: {
      userId: this.id,
      orderPaid: false,
    },
  });
  return cart;
};

User.prototype.getOrderNumbers = async function () {
  const orders = await Order.findAll({
    where: { userId: this.id },
    attributes: ['id'],
  });
  return orders && orders.length ? orders.map((obj) => obj['id']) : [];
};

User.prototype.getOrderNumbers = async function () {
  const orders = await Order.findAll({
    where: { userId: this.id },
    attributes: ['id'],
  });
  return orders && orders.length ? orders.map((obj) => obj['id']) : [];
};

User.prototype.getAllActiveOrderItemNumbers = async function () {
  const order = await Order.findOne({
    where: { userId: this.id, orderPaid: false },
    include: {
      model: OrderItem,
      attributes: ["id"]
    },
  });
  return order && order.orderItems && order.orderItems.length ? 
      order.orderItems.map(orderI => orderI["id"]) :
      []
};

module.exports = User;
