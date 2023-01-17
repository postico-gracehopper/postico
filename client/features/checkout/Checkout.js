import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const stripePublishable =
  'pk_test_51MP7w1FWXTILHlSV3vokErIg8Nam9egRpydJIBKI5Z6AKWYhERRFUdPZoDiivAwN2exAevWsqG6kuHAqRg4L5KAp00alD9lZt9';
const PAYMENT_SERVER_URL = 'http://localhost:8080';
const CURRENCY = 'USD';

const successPayment = (data) => {
  alert('Thank you! Payment was successfully processed');
};

const errorPayment = (data) => {
  alert("We're sorry, an error occurred with your payment information.");
};

const onToken = (amount, description, orderId) => (token) =>
  axios
    .put(`/api/orders/${orderId}`, {
      orderPaid: true,
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({
  name,
  description,
  amount,
  orderId,
  handleCheckoutSuccess,
}) => {
  return (
    <div>
      <StripeCheckout
        name={name}
        description={description}
        amount={amount}
        token={onToken(amount, description, orderId, handleCheckoutSuccess)}
        currency={CURRENCY}
        billingAddress
        shippingAddress
        stripeKey="pk_test_Tm68jOcpaletOdKFzp80ochj00YAnOJpLE"
        label="Pay with 💳"
      />
    </div>
  );
};

export default Checkout;

// const onToken = (amount, description) => (token) =>
//   axios
//     .put('http://localhost:8080', {
//       description,
//       source: token.id,
//       currency: CURRENCY,
//       amount: dollarsToCents(amount),
//     })
//     .then(successPayment)
//     .catch(errorPayment);
