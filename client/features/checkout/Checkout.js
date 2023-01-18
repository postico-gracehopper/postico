import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const CURRENCY = 'USD';

const successPayment = () => {
  alert('Thank you! Your order has been successfully processed.');
};

const errorPayment = (err) => {
  alert("We're sorry, an error occurred with your payment information.");
  console.log(err);
};

const onToken = (amount, description, orderId) => (token) => {
  try {
    axios.all([
      axios.put(
        `/api/orders/${orderId}`,
        {
          orderPaid: true,
        },
        { headers: { authorization: window.localStorage.getItem('token') } }
      ),
      axios.post(
        '/api/stripe/checkout',
        {
          description,
          source: token.id,
          currency: CURRENCY,
          amount,
        },
        { headers: { authorization: window.localStorage.getItem('token') } }
      ),
    ]);
    successPayment();
    // handleCheckoutSuccess();
  } catch (err) {
    errorPayment(err);
  }
};

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
        stripeKey="pk_test_51MP7w1FWXTILHlSV3vokErIg8Nam9egRpydJIBKI5Z6AKWYhERRFUdPZoDiivAwN2exAevWsqG6kuHAqRg4L5KAp00alD9lZt9"
        label="Pay with 💳"
      />
    </div>
  );
};

export default Checkout;
