'use strict';
const {
  db,
  models: { User, Product, Order, OrderItem },
} = require('../server/db');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const genExpDate = () => {
  const month = Math.ceil(Math.random() * 12);
  const year = Math.floor(Math.random() * 6) + new Date().getFullYear();
  return String(month) + '/' + String(year % 100);
};

const genCategory = () => {
  const categories = ['Skis', 'Boots', 'Apparel'];
  return categories[Math.floor(Math.random() * categories.length)];
};

const genPhoto = (type) => {
  let samples = [];
  if (type === 'Skis') {
    samples = [
      'https://images.evo.com/imgp/700/226839/913503/lib-tech-yewps-skis-2023-.jpg',
      'https://images.evo.com/imgp/700/209780/852673/zag-h-106-nurse-skis-2023-.jpg',
      'https://i.ebayimg.com/images/g/ygEAAOSwfLNjNcSC/s-l1600.jpg',
      'https://images.evo.com/imgp/enlarge/201424/832801/clone.jpg',
    ];
  } else if (type === 'Boots') {
    samples = [
      'https://www.rossignol.com/media/catalog/product/resized/550x550/422943/rbj8050_speed_80_rgb72dpi_01.jpg',
      'https://content.backcountry.com/images/items/1200/TEC/TECR06R/ULTORA.jpg',
      'https://cdn.shopify.com/s/files/1/1373/6495/products/2022-HEAD-Raptor-WCR-120S-Ski-Boot_b2fa096d-6e58-47a1-b21d-6e0273434f45_1800x1800.jpg?v=1621280266',
      'https://i1.adis.ws/i/k2/k2_2122_mindbender_130_1?w=412&fmt=webp&fmt.interlaced=true&bg=white&dpi=144',
      'https://cdn11.bigcommerce.com/s-tq0ucjapr8/images/stencil/1280w/products/17711/513810/2b6e2596728d8d6cab0db529aaa4703dd26459b32ff1a935b8fe250430ff8b7b__77128.1672693129.jpg?c=1',
    ];
  } else {
    samples = [
      'https://ridestore.imgix.net/catalog/product/F0844_01_d06t9Lt.jpg?w=525&auto=format&q=70&dpr=2&usm=15&fit=max',
      'https://ridestore.imgix.net/catalog/product/F0848_01_3fDoxHb.jpg?w=525&auto=format&q=70&dpr=2&usm=15&fit=max',
      'https://ridestore.imgix.net/catalog/product/F0845_01_XbJSS3c.jpg?w=525&auto=format&q=70&dpr=2&usm=15&fit=max',
      'https://www.montecwear.com/images/H0917_01_eSu5W3d.jpg?w=525&dpr=2',
      'https://www.montecwear.com/images/H0906_01_u1WX2a1.jpg?w=525&dpr=2',
    ];
  }
  const randomNumber = Math.floor(Math.random() * samples.length);
  return samples[randomNumber];
};

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');
  const NUM_USERS_AND_PRODUCTS = 100;
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
      image: genPhoto(type),
      category: type,
    };

    products.push(newProduct);
  }

  // //create a random number of dummy shopping carts
  // for (let i = 0; i < NUM_USERS_AND_PRODUCTS * 2; i++) {
  //   //create a random userId
  //   const u = Math.floor(Math.random() * NUM_USERS_AND_PRODUCTS);
  //   //create a random productId
  //   const p = Math.floor(Math.random() * NUM_USERS_AND_PRODUCTS);

  //   //create an order that is associated with the randomly generated userId
  //   const [order, created] = await Order.findOrCreate({
  //     where: {
  //       userId: u,
  //       orderPaid: false,
  //     },
  //   });

  //   //if the order was created, now create an order item to populate the order
  //   if (created) {
  //     const orderItem = await OrderItem.create({
  //       quantity: 1,
  //       productId: p,
  //       orderId: order.id,
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
  //     });
  //   }
  // }

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
  });

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
  });

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
    username: 'guest1',
  });

  //const
  // Hardcode a single shopping cart and associate it with demo user.

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
