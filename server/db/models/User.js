const Sequelize = require('sequelize');
const db = require('../db');
const {
  models: { Order, OrderItem, Product },
} = require('../index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = User;

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

// Finds and returns a user's active order Id
User.prototype.getCartId = async function () {
  const orderId = await Order.findOne({
    where: { userId: this.id, orderPaid: false },
    attributes: ['id'],
  });
  if (orderId === null) {
    console.log('No active cart Id found for this user!');
  } else {
    console.log('User active cartId: ', orderId);
  }
  return orderId;
};

// Finds and returns a user's active order instance, including it's associated OrderItems and those OrderItem's associated products
User.prototype.getCart = async function () {
  const order = await Order.findOne({
    where: { userId: this.id, orderPaid: false },
    include: {
      model: OrderItem,
      include: Product,
    },
  });
  if (order === null) {
    console.log('No active cart found for this user!');
  } else {
    console.log('User active cart: ', order);
  }
  return order;
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
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
