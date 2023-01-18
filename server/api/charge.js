// TODO: Move secret key to another file.
const stripe = require('stripe')(
  'sk_test_51MP7w1FWXTILHlSVOugGSWodZoa2JvDhQ1kfJpNa5P1tNn30JDTjZUxVQ7x3uklUyF47K7Nf8vZgzsVt7FHH3osg00E9oLWXeW'
);
const router = require('express').Router();

router.post('/', async (req, res) => {
  console.log(req.body);

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'USD',
      description: 'An example charge',
      source: req.body.token,
    });
    console.log(status);
    res.send(status);
  } catch (err) {
    res.status(500).end();
  }
});

module.exports = router;
