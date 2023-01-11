const router = require('express').Router()
const { models: { Order }} = require('../db')
const { verifyInteger, 
        verifyIsAdmin, 
        verifyIsSpecificUserOrAdmin } = require("./apiHelpers")



const PUBLIC_ORDER_FIELDS = ['total', 'email', 'addressLine1', 'addressLine2', 'city', 'zipCode']


// ADMIN only
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: PUBLIC_ORDER_FIELDS
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// Specific user only
router.post('/', async (req, res, next) => {
  try {
    const order = req.body
    await Order.create(order)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

// ADMIN or Specific User
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findByPk(id, {
      attributes: PUBLIC_ORDER_FIELDS
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// Admin only
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedOrder = req.body
    await Order.update(updatedOrder, {where: {id: id}})
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

// Admin only
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Order.destroy({where: {id: id}})
    res.status(200).send()
  }catch(err){
    next(err)
  }
})


module.exports = router