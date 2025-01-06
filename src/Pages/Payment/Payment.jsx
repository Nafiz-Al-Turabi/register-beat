import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import axios from 'axios';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha");

const Payment = () => {
  const [priceId, setPriceId] = useState(null);  
  const [clientSecret, setClientSecret] = useState(''); 

  useEffect(() => {
    async function fetchPriceId() {
      // Example: Replace with your backend route that returns a priceId
      const response = await axios.get('http://localhost:3001/api/payments/get-price');
      setPriceId(response.data.priceId);
      console.log(response.data.priceId);
    }

    fetchPriceId();
  }, []);

  useEffect(() => {
    // Create a new PaymentIntent after priceId is set
    if (priceId) {
      axios.post('http://localhost:3001/api/payments/create-payment-intent', { priceId })
        .then(response => setClientSecret(response.data.clientSecret))
        .catch(error => console.error(error));
    }
  }, [priceId]);

  return (
    <div className="App">
      <h1>Stripe Subscription</h1>
      {clientSecret && priceId ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm priceId={priceId} />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}

      {/* <SubscriptionStatus /> */}
    </div>
  );
};

export default Payment;