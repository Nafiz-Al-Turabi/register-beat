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
  const [paymentMethod, setPaymentMethod] = useState('card');

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

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className='animate-from-middle'>
      <h1 className='text-white text-center md:text-left text-4xl font-bold max-w-7xl mx-auto mt-10 px-4 xl:px-0'>Checkout</h1>
      <div className="flex justify-center text-white px-4 md:p-4 xl:p-0">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 py-8 bg-rounded-lg w-full max-w-7xl">
          <div className="w-full md:w-1/2 p-6 bg-[#111111] rounded-lg border border-purple-700/30">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Standard Plan</p>
              <p className="text-lg font-bold">$9.99/month</p>
            </div>
            <hr className="border-purple-700/30 my-4" />
            <p className='text-lg'>What includes:</p>
            <ul className="mt-4 space-y-2">
              <li><span className="text-purple-700 mr-2">✔</span> Register 20 Beats per month</li>
              <li><span className="text-purple-700 mr-2">✔</span> Advanced blockchain protection</li>
              <li><span className="text-purple-700 mr-2">✔</span> Analytics Dashboard</li>
              <li><span className="text-purple-700 mr-2">✔</span> Legal Proof for YouTube & Spotify Disputes</li>
              <li><span className="text-purple-700 mr-2">✔</span> Certification for Every beat</li>
              <li><span className="text-purple-700 mr-2">✔</span> Get Extra Credits to Register More Beats</li>
            </ul>
            <hr className="border-purple-700/30 my-4" />
            <p className="mt-4 text-lg font-bold">Total: $9.99/month</p>
          </div>

          <div className="payment-method w-full md:w-1/2 p-6 bg-[#111111] border border-purple-700/30 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="payment-method-toggle flex mb-4 bg-[#1a1a1a] rounded-lg p-1">
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex-1 py-1 ${paymentMethod === 'card' ? 'primary-bg' : ''} rounded-lg`}
              >
                Card
              </button>
              <button
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`flex-1 py-1 ${paymentMethod === 'paypal' ? 'primary-bg' : ''} rounded-lg`}
              >
                PayPal
              </button>
            </div>

            {clientSecret && priceId ? (
              paymentMethod === 'card' ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm priceId={priceId} />
                </Elements>
              ) : (
                <div>
                  {/* PayPal integration goes here */}
                  <p>PayPal payment form</p>
                </div>
              )
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;