const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;
const jwt = require("jsonwebtoken")
require("dotenv").config()

router.post('/login', async (req, res, next) => {
  try {
    // const permanentAccount = await User.authenticate(req.body)
    // const token = req.headers.authorization 
    // const tokenAccount = await User.findByToken(token)
    // if (tokenAccount.isGuest && !tokenAccount.password){
    //   await User.destroy({where: {id: tokenAccount.id}}) // guest -> login, destroy the guest account
    // } 
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

function filterUserPublic(usr){
  const PUBLIC_FIELDS = ['id', 'username', 'lastname', 'email', 'addressLine1', 
    'addressLine2', 'city', 'zipCode', 'creditCardNumber', 'creditCardName',
    'creditCardExpiration', 'creditCardCVV', 'adminRights', 'isGuest']
  return Object.keys(usr.dataValues).filter(key => PUBLIC_FIELDS.includes(key))
              .reduce((obj, key) => Object.assign(obj, {[key]: usr[key]}), {})
}

function filterGuestPublic(usr){
  const PUBLIC_FIELDS = ['isGuest']
  return Object.keys(usr.dataValues).filter(key => PUBLIC_FIELDS.includes(key))
            .reduce((obj, key) => Object.assign(obj, {[key]: usr[key]}), {})
}
router.get('/me', async (req, res, next) => {
  try {
    if (req.headers.authorization) { // if the requestor has a token
      let userObj = await User.findByToken(req.headers.authorization)

      if (userObj.isGuest) {
        // A guest
       res.send(filterGuestPublic(userObj))
      } else {
        // A Registered User
        res.send(filterUserPublic(userObj))
      }
    } else { 
      // if the requestor does not have a token
      // await User.create()  // Create a new user
      const guest = await User.create({})
      // send the user profile (whatever's needed) & token
      res.send({token: await guest.generateToken()}) // send the new user's token
    }
  }
  catch (ex) {
    next(ex);
  }
});
