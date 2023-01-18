require('dotenv').config();
const configureStripe = require('stripe');
// const stripe = configureStripe(process.env.STRIPE_SECRET_KEY)
const stripe = configureStripe(
  'sk_test_51MP7w1FWXTILHlSVOugGSWodZoa2JvDhQ1kfJpNa5P1tNn30JDTjZUxVQ7x3uklUyF47K7Nf8vZgzsVt7FHH3osg00E9oLWXeW'
);
const router = require('express').Router();

const postStripeCharge = (res) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.post('/checkout', (req, res, next) => {
  try {
    stripe.charges.create(req.body, postStripeCharge(res));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
