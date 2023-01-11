const router = require('express').Router()
const { models: { User }} = require('../db')
const ShoppingCart = require('../db/models/ShoppingCart')


const USER_FIELDS = ['id', 'username', 'firstName', 'lastname', 'email', 
  'addressLine1', 'addressLine2', 'city', 'zipCode', 'adminRights']
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: USER_FIELDS
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


 
router.post('/', async (req, res, next) => {
  try {
    const user = req.body
    const userObj = await User.create(user)
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})



router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id, {
      attributes: USER_FIELDS
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


router.get('/:id/cart', async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id, {
      attributes: USER_FIELDS,
      include: ShoppingCart
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})


router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedUser = req.body
    await User.update(updatedUser, {where: {id: id}})
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await User.destroy({where: {id: id}})
    res.status(200).send()
  }catch(err){
    next(err)
  }
})


module.exports = router