const router = require('express').Router()
const { attachUserDataToReq } = require("./apiHelpers")


router.use(attachUserDataToReq);
router.use('/products', require('./products')); 
router.use('/users', require('./users')); 
router.use('/orders', require('./orders')); 
router.use('/stripe', require('./stripe'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router;
