"use strict";

const genExpDate = () => {
  const month = Math.ceil(Math.random() * 12);
  const year = Math.floor(Math.random() * 6) + new Date().getFullYear();
  return String(month) + "/" + String(year % 100);
};

const genCategory = () => {
  const categories = ["Skis", "Boots", "Apparel"];
  return categories[Math.floor(Math.random() * categories.length)];
};

const {
  db,
  models: { User, Product, ShoppingCart, ShoppingCartItem },
} = require("../server/db");
const { faker } = require("@faker-js/faker");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  let users = [];
  let products = [];

  // MAKE 100 FAKE USERS: We can change number of fake seeded users below, from 100.
  for (let i = 0; i < 100; i++) {
    const name = faker.name.firstName();

    let newUser = {
      firstName: name,
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(name).toLowerCase(),
      addressLine1: faker.address.buildingNumber() + faker.address.streetName(),
      // addressLine2: left blank intentionally for dummy data
      city: faker.address.cityName(),
      zipCode: faker.address.zipCode(),
      // CREDIT CARDS -- Not required info for a real user, but we're going to seed it.
      creditCardNumber: faker.finance.creditCardNumber(),
      creditCardName: faker.finance.creditCardIssuer(),
      creditCardExpiration: genExpDate(),
      creditCardCVV: faker.finance.creditCardCVV(),
      // ADMIN
      // AdminRights are "false" by default; no seeded attribute here. We've hardcoded one admin user below.
    };

    users.push(newUser);
  }

  // MAKE 100 FAKE PRODUCTS: Can change number of products below as well.
  for (let i = 0; i < 100; i++) {
    let newProduct = {
      name: faker.commerce.productAdjective() + "Skis",
      description: faker.lorem.sentence(12),
      price: faker.commerce.price(),
      image: faker.image.abstract(),
      category: genCategory(),
    };

    products.push(newProduct);
  }

  // For each item in the arrays we've made, create a new instance in the database.
  users.forEach(async (user) => {
    await User.create(user);
  });

  products.forEach(async (product) => {
    await Product.create(product);
  });

  // Hardcode a single admin user in the seed.
  User.create({
    firstName: "Admin1",
    lastname: "Postico",
    username: "Admin1",
    email: "admin1@posticogroup.com",
    addressLine1: "123 Admin Road",
    city: "New York",
    zipCode: "10002",
  });

  // Hardcode a single demo user to test cart functionality.
  const demoUser = User.create({
    firstName: "David",
    lastname: "Demoson",
    username: "demo_user",
    password: "blackdiamond",
    email: "demo_user@posticogroup.com",
    addressLine1: "1001 Demo Road",
    city: "Houston",
    zipCode: "77056",
  });

  // Hardcode a single demo product to test cart functionality.
  const demoProduct = Product.create({
    name: "Demo skis",
    description:
      "This is an actual type of ski rental but in this case just a dummy product :(",
    price: 499.99,
    image:
      "https://www.basemountainsports.com/wp-content/uploads/2021/02/ski-rentals-base-mounatin-sports-co.jpg",
    category: "Skis",
  });

  // Hardcode a single shopping cart and associate it with demo user.
  const demoCart = ShoppingCart.create();
  demoCart.setUser(demoUser);

  // Hardcode a single shopping cart item and associate it with demo cart we just made.
  const demoItem = ShoppingCartItem.create();
  demoItem.setShoppingCart(demoCart);
  demoItem.setProduct(demoProduct);

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
  console.log("seeding...");
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
