const router = require('express').Router()
const { models: { Product }} = require('../db')
const { verifyInteger, 
        verifyIsAdmin, 
        verifyIsSpecificUserOrAdmin } = require("./apiHelpers")


const PUBLIC_PRODUCT_FIELDS = ['id', 'name', 'description', 'price', 'image', 'category'] 



router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: PUBLIC_PRODUCT_FIELDS  //! revisit 
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// restricted to ADMIN 
router.post('/', async (req, res, next) => {
  try {
    const product = req.body
    await Product.create(product)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    // $ add server-side verification
    const changedProducts = req.body
    if (Array.isArray(changedProducts)){
        changedProducts.forEach(async user => {
          await Product.update(user, {where: {id: user.id}})
        })
    } else {
      await Product.update(changedProducts, {where: {id: changedProducts.id}})
    }
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id, {
      attributes: PUBLIC_PRODUCT_FIELDS
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// Restricted to ADMIN 
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

// Restricted to ADMIN 
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