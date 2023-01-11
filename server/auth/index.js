const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    if (req.headers.authorization) { // if the requestor has a token
      const userObj = await User.findByToken(req.headers.authorization)
      if (userObj.isGuest()) {
        // A guest
        ""
      } else {
        // A Registered User
        ""
      }
    } else { 
      // if the requestor does not have a token
      // await User.create()  // Create a new user
      // send the user profile (whatever's needed) & token
      res.send({token: jwt.sign({id: "yamagochi"}, process.env.JWT_SECRET)}) // send the new user's token
    }
  }
  catch (ex) {
    next(ex);
  }
});
