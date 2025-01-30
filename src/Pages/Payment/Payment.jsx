import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import axiosInstance from '../../Axios/AxiosInstance';
import Loading from '../../Components/Loading/Loading';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const [priceId, setPriceId] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    async function fetchPriceId() {
      const response = await axiosInstance.get('/payments/get-price');
      setPriceId(response.data.priceId);
    }

    fetchPriceId();
  }, []);

  useEffect(() => {
    if (priceId) {
      axiosInstance.post('/payments/create-payment-intent', { priceId })
        .then(response => setClientSecret(response.data.clientSecret))
        .catch(error => console.error(error));
    }
  }, [priceId]);

  return (
    <div className="App translate-y-1/2">
      {clientSecret && priceId ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm priceId={priceId} />
        </Elements>
      ) : (
        <Loading />
      )}

      {/* <SubscriptionStatus /> */}
    </div>
  );
};

export default Payment;