const { useRowSelect } = require('react-table');
const {
    db,
    models: { User, Product, Order, OrderItem  },
  } = require('../server/db');
const axios = require("axios")


async function action() {

    const allUsers = await User.findAll()
    const allProducts = await Product.findAll()
    const nUsers = allUsers.length
    const nProducts = allProducts.length

    const addRandItem = async () => {
        const prod = Math.ceil(Math.random() * nProducts + 1)
        const usr = Math.ceil(Math.random()* nUsers + 1)
        const qty = Math.ceil(Math.random()*5)
        await OrderItem.addToCart(usr, prod, qty);
        console.log("added item to cart")
    }
    
    setInterval(() =>{
      addRandItem()
    }, 5000)
    

} 


if (module === require.main) {
    action();
  }
  