const {
    db,
    models: { User, Product, Order, OrderItem  },
  } = require('../server/db');



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
  