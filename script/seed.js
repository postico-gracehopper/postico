'use strict';
const {
  db,
  models: { User, Product, Order, OrderItem  },
} = require('../server/db');
const { faker } = require('@faker-js/faker');
require("dotenv").config()


const genExpDate = () => {
  const month = Math.ceil(Math.random() * 12);
  const year = Math.floor(Math.random() * 6) + new Date().getFullYear();
  return String(month) + '/' + String(year % 100);
};

const genCategory = () => {
  const categories = ['Skis', 'Boots', 'Apparel'];
  return categories[Math.floor(Math.random() * categories.length)];
};


async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');
  const NUM_USERS_AND_PRODUCTS = 100
  let users = [];
  let products = [];

  // MAKE 100 FAKE USERS: We can change number of fake seeded users below, from 100.
  for (let i = 0; i < NUM_USERS_AND_PRODUCTS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      username: faker.internet.userName(firstName, lastName),
      password: faker.internet.password(),
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      addressLine1:
        faker.address.buildingNumber() + ' ' + faker.address.street(),
      // addressLine2: left blank intentionally for dummy data
      city: faker.address.cityName(),
      zipCode: faker.address.zipCode('#####'),
      isGuest: false,
      // CREDIT CARDS -- Not required info for a real user, but we're going to seed it.
      creditCardNumber: faker.finance.creditCardNumber('visa'),
      creditCardName: faker.finance.creditCardIssuer(),
      creditCardExpiration: genExpDate(),
      creditCardCVV: faker.finance.creditCardCVV(),
      // ADMIN
      // AdminRights are "false" by default; no seeded attribute here. We've hardcoded one admin user below.
    };

    users.push(newUser);
  }

  // MAKE 100 FAKE PRODUCTS: Can change number of products below as well.
  for (let i = 0; i < NUM_USERS_AND_PRODUCTS; i++) {
    let type = genCategory();
    let newProduct = {
      name: faker.commerce.productAdjective() + ' ' + type,
      description: faker.lorem.sentence(12),
      price: faker.commerce.price(),
      image: faker.image.abstract(),
      category: type,
    };

    products.push(newProduct);
  }

  // for (let i=0; i<NUM_USERS_AND_PRODUCTS*2; i++){
  //   const u = Math.floor(Math.random()*NUM_USERS_AND_PRODUCTS)
  //   const p = Math.floor(Math.random()*NUM_USERS_AND_PRODUCTS)
  //   const [order, created] = await Order.findOrCreate({
  //     where: {
  //       userId: u,
  //       orderPaid: false,
  //     }
  //   })
  //   if (created) {
  //     const orderItem = await OrderItem.create({
  //       quantity: 1,
  //       productId: p,
  //       orderId: order.id
  //     });
  //   } else {
  //     const [orderItem, createdOrderItem] = await OrderItem.findOrCreate({
  //       where: {
  //         orderId: order.id,
  //         productId: p,
  //       },
  //       defaults: {
  //         // if it is created...
  //         orderId: order.id, // associate the order
  //         productId: p, // associate the product
  //         quantity: 1, // set it's quantity
  //       },
  //   })
  // }}

  // For each item in the arrays we've made, create a new instance in the database.
  users.forEach(async (user) => {
    await User.create(user);
  });

  products.forEach(async (product) => {
    await Product.create(product);
  });

  // Hardcode a single admin user in the seed.
  const adminUser = User.create({
    firstName: 'Admin1',
    lastName: 'Postico',
    username: 'Admin1',
    password: process.env.DEFAULT_PASSWORD,
    email: 'admin1@posticogroup.com',
    addressLine1: '123 Admin Road',
    city: 'New York',
    zipCode: '10002',
    adminRights: true,
    isGuest: false,
  })

  // Hardcode a single demo user to test cart functionality.
  const demoUser = User.create({
    firstName: 'David',
    lastName: 'Demoson',
    username: 'demo_user',
    password: process.env.DEFAULT_PASSWORD,
    email: 'demo_user@posticogroup.com',
    addressLine1: '1001 Demo Road',
    city: 'Houston',
    zipCode: '77056',
    isGuest: false,
  })

  

  // Hardcode a single demo product to test cart functionality.
  const demoProduct = Product.create({
    name: 'Demo skis',
    description:
      'This is an actual type of ski rental but in this case just a dummy product :(',
    price: 499.99,
    image:
      'https://www.basemountainsports.com/wp-content/uploads/2021/02/ski-rentals-base-mounatin-sports-co.jpg',
    category: 'Skis',
  });

  const guest1 = User.create({
    username: "guest1"
  })

  // Hardcode a single shopping cart and associate it with demo user.
  // TODO: Troubleshoot use of magic methods for associated models (see console log below).
  // const demoCart = ShoppingCart.create();
  // console.log(
  //   "ShoppingCart's methods are " + Object.keys(ShoppingCart.__proto__)
  // );
  // demoCart.setUser(demoUser);

  // // Hardcode a single shopping cart item and associate it with demo cart we just made.
  // const demoItem = ShoppingCartItem.create();
  // demoItem.setShoppingCart(demoCart);
  // demoItem.setProduct(demoProduct);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
    // MV: Troubleshooting "finally" below. Seed won't run with it,
    // likely due to async.
    // } finally {
    //   console.log("closing db connection");
    //   await db.close();
    //   console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
