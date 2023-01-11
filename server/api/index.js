const router = require('express').Router()
const { attachUserDataToReq } = require("./apiHelpers")

// attachUserDataTo Req

router.use('/products', require("./products")) // should be wide open, besides put, delete, and post
router.use('/users', require('./users')) // restrict to user
router.use('/orders', require("./products")) // restrict to user

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})




module.exports = router


