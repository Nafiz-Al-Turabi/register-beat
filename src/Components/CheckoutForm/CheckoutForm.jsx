import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutForm = ({ priceId }) => {
  const [email, setEmail] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Create customer and handle payment method
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setPaymentMethodId(paymentMethod.id);

    try {
      // Call backend to create customer
      const response = await axiosInstance.post(`/payments/create-customer/${user._id}`, {
        email,
        paymentMethodId: paymentMethod.id,
      });

      const customerId = response.data.customerId;

      // Now, create the subscription
      const subscriptionResponse = await axiosInstance.post(`/payments/create-subscription/${user._id}`, {
        customerId,
        priceId,
      });

      if (subscriptionResponse.status === 200) {
        toast.success('Subscription created successfully!');

        navigate('/');
      } else {
        toast.error('Subscription creation failed!');
      }
    } catch (error) {
      console.error("Error during subscription creation: ", error);
      toast.error(`${error.response.data.message || error.response.data.error || 'An unknown error occurred.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-lg shadow-lg"
      >
        <h3 className="text-center text-xl font-semibold text-gray-100 mb-6">
          Subscribe Now
        </h3>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-3 rounded-md bg-transparent border border-slate-600 
               text-white placeholder-gray-400 focus:outline-none"
        />

        <div className="mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#ecf0f1',
                  '::placeholder': {
                    color: '#94a3b8'
                  }
                },
                invalid: {
                  color: '#ef4444'
                }
              }
            }}
            className="p-3 rounded-md bg-transparent border border-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium text-base
                 ${loading
              ? 'bg-violet-400 cursor-not-allowed'
              : 'bg-violet-500 hover:bg-violet-600 active:bg-violet-700'} 
                 transition duration-200 focus:outline-none focus:ring-2 
                 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
        >
          {loading ? 'Processing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
