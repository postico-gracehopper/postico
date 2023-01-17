const {
    db,
    models: { User, Product, Order, OrderItem  },
  } = require('../server/db');


User.prototype.addToCart = async function(productId, qty, op=(a, b) => a + b){
  const cart = await this.getCart()
  const product = await Product.findOne({where: {id: productId}})
  const [oItem, oItemWasCreated]= await OrderItem.findOrCreate({
    where: {
      orderId: cart.id,
      productId: product.id
    },
    defaults: {
      productId: product.id,
      orderId: cart.id,
    }})
  await oItem.update({
    quantity: (oItemWasCreated ? qty : op(oItem.quantity, qty)),
    totalItemPrice: (oItemWasCreated ? product.price*qty 
      : op(Number(oItem.totalItemPrice),  product.price*qty))
  })
  await cart.update({
    total: op(Number(cart.total), product.price*qty)
  })
}

User.prototype.removeFromCart = async function(productId, qty){
  this.addToCart(productId, qty, (a, b) => a - b)
}
  

User.prototype.getCart = async function(){
  const [cart, wasCreated] = await Order.findOrCreate({
    where: {
      userId: this.id,
      orderPaid: false
    }})
  return cart
}

User.prototype.getUnwrappedCart = async function(){
  return User.getUnwrappedCartFor(this.id)
}

User.getUnwrappedCartFor = async function(usrId){
  const cart = await Order.findOne({
    where: {
      userId: usrId,
      orderPaid: false
    },
    include: {
      model: OrderItem,
      required: false,
      include: {
        model: Product
      },
    },
  })
  return cart ? {       //UNPACKAGED CART
    userId: usrId,
    cartId: cart.id,
    orderId: cart.id,
    total: cart.total,
    orderPaid: cart.orderPaid,
    orderItems: cart.orderItems && cart.orderItems.length ? cart.orderItems.map(item => {
      return {
        productId: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        image: item.product.image,
        category: item.product.category,
        orderItemId: item.id,
        quantity: item.quantity,
        totalItemPrice: item.totalItemPrice,
      }
    }) : [] // if there is a cart, but no items
  } : {
    userId: usrId,
    cartId: null,
    orderId: null,
    total: "00.00",        // DEFAULT CART
    orderPaid: false,
    orderItems: []
  }
} 


async function action() {

    const addRandItem = async () => {
        const u = await User.findOne({where: {id: Math.floor(Math.random() * 5 + 1)}})
        const p = Math.floor(Math.random() * 5 + 1)
        const n = Math.floor(Math.random()*5 + 1)
        console.log(`user: ${u.id} ${u.firstName} bought ${n} of productNo. ${p}`)
        // const p = await Product.findOne({where: {id: Math.floor(Math.random() * 99)}})
        await u.addToCart(p, n)
        console.log("added to cart")
    }


    // let cart = await u.getUnwrappedCart()
    // console.log(cart)
    // // return cart
    
    setInterval(() =>{
      addRandItem()
    }, 5000)
    

} 


if (module === require.main) {
    action();
  }
  