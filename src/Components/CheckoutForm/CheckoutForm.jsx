import React, { act, useContext, useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trackEvent } from '../../facebookPixel/facebookPixel';

const CheckoutForm = ({ priceId, action }) => {
  const [email, setEmail] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user, refreshUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  let show;
  if(action === 'upgrade') {
    show = 'Pay $4.99';
  } else{
    show = 'Pay $9.99';
  }

  // Track event when button is clicked for meta pixel
  const handleButtonClick = () => {
    trackEvent("SubscribedButtonClick", { buttonName: "subscribe" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Create payment method with separate card elements
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        email: email,
      },
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
        //priceId,
        action
      });
      
      if (subscriptionResponse.status === 200) {
        toast.success('Subscription created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
          refreshUserInfo();
        }, 4500);
      } else {
        toast.error('Subscription creation failed!');
      }
    } catch (error) {
      console.error("Error during subscription creation: ", error);
      setErrorMessage(error.response?.data?.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };


  const handleCredit = async () => {
    try {
      const response = await axiosInstance.post(`/credit/purchase-credits/${user?._id}`);


      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        console.error('Redirect URL not found in the response');
      }
    } catch (error) {
      console.error("Error purchasing credits: ", error.response ? error.response.data : error.message);
    }
  };


  return (
    <div>

      <form
        onSubmit={handleSubmit}
        className=""
      >
        
        <label htmlFor="email" className="text-md text-zinc-300">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 px-4 py-2 mt-1 rounded-md bg-transparent border border-purple-700/20 
               text-white placeholder-gray-400 focus:outline-none"
        />

        <div className="mb-3">
          <label htmlFor="card-number" className="text-md text-zinc-300">Card Number</label>
          <CardNumberElement
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
            className="p-2 mt-1 rounded-md bg-transparent border border-purple-700/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="mb-6 ">
            <label htmlFor="card-expiry" className="text-md text-zinc-300">Expiry Date</label>
            <CardExpiryElement
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
              className="p-2 mt-1 w-full rounded-md bg-transparent border border-purple-700/20"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="card-cvc" className="text-md text-zinc-300">CVC</label>
            <CardCvcElement
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
              className="p-2 mt-1 rounded-md bg-transparent border border-purple-700/20"
            />
          </div>
        </div>

        <button
          onClick={handleButtonClick}
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium text-base
                 ${loading
              ? 'bg-violet-400 cursor-not-allowed'
              : 'primary-bg'} 
                 transition duration-200 focus:outline-none focus:ring-2 
                 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
        >
          {loading ? 'Processing...' : show}
        </button>
      </form>
      {errorMessage && (
        <div className="text-blue-500 bg-blue-500/10 border border-blue-500 p-4 text-sm text-center mb-4 max-w-md rounded-md mx-auto mt-5 flex flex-col justify-center">{errorMessage}
          <button onClick={handleCredit} className='block text-green-500 hover:underline mt-2'>Click here</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
