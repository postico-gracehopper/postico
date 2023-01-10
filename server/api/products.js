const router = require('express').Router()
const { models: { Product }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'description', 'price', 'image']   //! revisit 
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})


router.post('/', async (req, res, next) => {
  try {
    const product = req.body
    const productObj = await Product.create(product)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id, {
      attributes: ['id', 'name', 'description', 'price', 'image']
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedProduct = req.body
    await Product.update(updatedProduct, {where: {id: id}})
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await Product.destroy({where: {id: id}})
    res.status(200).send()
  }catch(err){
    next(err)
  }
})


module.exports = router