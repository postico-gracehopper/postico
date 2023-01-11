const router = require('express').Router()
const { models: { Product }} = require('../db')

const PRODUCT_FIELDS = ['id', 'name', 'description', 'price', 'image', 'category'] 

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: PRODUCT_FIELDS  //! revisit 
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
      attributes: PRODUCT_FIELDS
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