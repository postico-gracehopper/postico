const {
    db,
    models: { User, Product, Order, OrderItem  },
  } = require('../server/db');



async function action() {
    const u = await User.findOne({where: {id: 78}}) //Math.floor(Math.random() * 99) + 1}})
    //console.log(u)
    // const p = await Product.findOne({where: {id: Math.floor(Math.random() * 100)}})
    //console.log(p.id, p)
    // const o = await Order.create({total: 34.32, orderPaid: false, userId: u.id})
    // await OrderItem.create({
    //     totalItemPrice: 13.12,
    //     quantity: 2,
    //     productId: p.id,
    //     orderId: o.id,
    // })
    let cart = await u.getUnwrappedCart()
    console.log(cart)
    // return cart

} 


if (module === require.main) {
    action();
  }
  