const router = require('express').Router()
const { models: { Order }} = require('../db')

const ORDER_FIELDS = ['total', 'email', 'addressLine1', 'addressLine2', 'city', 'zipCode']

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ORDER_FIELDS
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  try {
    const order = req.body
    const orderObj = await Order.create(order)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const order = await Order.findByPk(id, {
      attributes: ORDER_FIELDS
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

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