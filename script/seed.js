"use strict";

const {
  db,
  models: { User },
  // ASK JP: WHAT IS THE SKI MODEL CALLED? PRODUCT OR SOMETHING ELSE?
  // WHAT OTHER MODELS SHALL WE SEED?
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
      // firstName: name,
      // lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      // kill this later
      password: faker.internet.password(),
      // email: faker.internet.email(name).toLowerCase(),
      // addressLine1 // required, string
      // addressLine2 // not required, string
      // city // string
      // zipCode // integer
      // // CREDIT CARDS NOT REQUIRED
      // creditCardNumber // integer
      // creditCardName // string
      // creditCardExpiration // string -- MM/YY format
      // creditCardCVV //
      // // Admin
      // adminRights // boolean (seed one admin, everyoen else no, hardcode one admin, defaultValue false
    };

    users.push(newUser);
  }

  // MAKE 100 FAKE PRODUCTS
  // for (let i = 0; i < 100; i++) {
  //   let newProduct = {
  //     // what attributes?
  //   };

  //   products.push(newProduct);
  // }

  // For each user in the array, create a new user instance in the database
  users.forEach(async (user) => {
    await User.create(user);
  });

  console.log(`seeded ${users.length} users`);
  // console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  // The below seems unhelpful for large datasets.
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
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
