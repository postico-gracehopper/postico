const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    //TODO can we have null passwords?
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'User first name cannot be empty.',
      },
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'User last name cannot be empty.',
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    // TODO require unique?
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
      notNull: {
        msg: 'User email cannot be empty.',
      },
    },
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'User email cannot be empty.',
      },
    },
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'User city cannot be empty.',
      },
    },
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true, //TODO validate that it is 5-digits
      notNull: {
        msg: 'User zip code cannot be empty.',
      },
    },
  },
  //TODO require payment info?
  creditCardNumber: {
    type: Sequelize.INTEGER,
    //TODO set validation to length 16
    //TODO hash the credit card number?
  },
  creditCardName: {
    type: Sequelize.STRING,
    //TODO hash the credit card name?
  },
  creditCardExpiration: {
    type: Sequelize.STRING, //TODO determine if correct?
    //TODO hash the credit card expiry?
    //TODO validation for format MM/YY?
  },
  creditCardCVV: {
    type: Sequelize.INTEGER,
    //TODO hash the credit card CVV?
    //TODO validation for length 3?
  },
  adminRights: {
    type: Sequelize.BOOLEAN,
    defaultValue: false, //TODO check if this is right or if should be string
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
