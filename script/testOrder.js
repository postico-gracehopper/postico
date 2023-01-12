const {
    db,
    models: { User, Product, Order, OrderItem  },
  } = require('../server/db');

async function action() {

    await Order.create({total: 11.23, orderPaid: false})
} 


if (module === require.main) {
    action();
  }
  