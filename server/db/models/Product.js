const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Product name cannot be empty.',
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png', //Generic product photo
  },
  category: {
    type: Sequelize.TEXT, //TODO we should have the seed default to 'Ski'
  },
});

module.exports = Product;
