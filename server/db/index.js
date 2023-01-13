//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

//associations!
User.hasMany(Order);
Order.belongsTo(User);
//
Product.hasOne(OrderItem);
OrderItem.belongsTo(Product);
//
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
//


User.prototype.addToCart = async function(productId, qty){
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
      quantity: (oItemWasCreated ? qty : oItem.quantity + qty),
      totalItemPrice: (oItemWasCreated ? product.price 
        : oItem.totalItemPrice + product.price*qty)
    })
}

User.prototype.getCart = async function(){
  const [cart, wasCreated] = await Order.findOne({
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


module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
};
