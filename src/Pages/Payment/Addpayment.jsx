import React, { useState, useEffect, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { IoIosLogOut } from 'react-icons/io';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import axiosInstance from '../../Axios/AxiosInstance';
import Loading from '../../Components/Loading/Loading';
import { AuthContext } from '../../Provider/AuthProvider';
import paypal from '../../assets/img/paypal.png';
import { Link, useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Addpayment = () => {
  const [priceId, setPriceId] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const { user, logout, refreshUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const customerId = user?.customerId

  if (user?.paypalSubsStatus === 'pending') {
    navigate('/payment-checking');
  }

  // Retrieve stored payment method or default to 'card'
  const [paymentMethod, setPaymentMethod] = useState(
    localStorage.getItem('paymentMethod') || 'card'
  );

//   if (user?.active === true || user?.role === 'admin' || new Date(user?.subscriptionEndDate) > new Date()) {
//     navigate('/dashboard');
//   }

  useEffect(() => {
    async function fetchPriceId() {
      const response = await axiosInstance.get('/payments/get-price');
      setPriceId(response.data.priceId);
    }

    fetchPriceId();
  }, []);

  // useEffect(() => {
  //   if (priceId) {
  //     axiosInstance
  //       .post('/payments/create-payment-intent', { priceId })
  //       .then(response => setClientSecret(response.data.clientSecret))
  //       .catch(error => console.error(error));
  //   }
  // }, [priceId]);

  // Handle switching payment methods and store in localStorage
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    localStorage.setItem('paymentMethod', method);
  };

  const handlePaypalPayment = () => {
    axiosInstance.post(`/paypalPayment/create-subscription-paypal/${user._id}`)
      .then(response => {
        const approvalUrl = response.data.links.find(link => link.rel === 'approve')?.href;
        if (approvalUrl) {
          window.location.href = approvalUrl;
        } else {
          console.error('PayPal approval URL not found');

        }
      })
      .catch(error => console.error(error));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className='animate-from-middle'>
      <div className='max-w-7xl mx-auto flex justify-between items-center mt-10 px-4 xl:px-0'>
        <h1 className='text-white text-center md:text-left text-2xl md:text-4xl font-bold '>Checkout</h1>
        <div className='flex justify-between items-center gap-2'>
          <div className='-space-y-1'>
            <p className='text-zinc-400 text-sm'>{user?.name}</p>
            <p className='text-zinc-400 text-xs'>{user?.email}</p>
          </div>
          <button onClick={handleLogout} className='text-white text-xl border border-zinc-600 rounded p-1 hover:bg-[#7e3aed] duration-300'><IoIosLogOut /></button>
        </div>
      </div>

      <div className="flex justify-center text-white px-4 md:p-4 xl:p-0">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 py-8 bg-rounded-lg w-full max-w-7xl">
          <div className="w-full md:w-1/2 p-6 bg-[#111111] rounded-lg border border-purple-700/30">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Upgrade to Ultra Plan</p>
              <p className="text-lg font-bold">$14.99/month</p>
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
              <li><span className="text-purple-700 mr-2">✔</span> Search Songs Using Your Beats</li>
            </ul>
            <hr className="border-purple-700/30 my-4" />
            <div className='flex justify-between items-center mt-4'>
              <p className=" text-lg font-bold">Total: $5.00 to Upgrade</p>
              <p className='text-gray-400 text-sm'>
                <Link to='/term-of-use' className='hover:underline'>Terms of Use</Link> and <Link to='/privacy' className='hover:underline'>Privacy Policy</Link>
              </p>
            </div>
          </div>

          <div className="payment-method w-full md:w-1/2 p-6 bg-[#111111] border border-purple-700/30 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Payment Method</h2>
            <div className="payment-method-toggle flex mb-4 bg-[#1a1a1a] rounded p-1">
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`flex-1 py-1 ${paymentMethod === 'card' ? 'primary-bg' : ''} rounded`}
              >
                Card
              </button>
              {/* 
              <button
                onClick={() => handlePaymentMethodChange('paypal')}
                className={`flex-1 py-1 ${paymentMethod === 'paypal' ? 'primary-bg' : ''} rounded`}
              >
                PayPal
              </button>
              */}
            </div>

            {priceId ? (
              paymentMethod === 'card' ? (
                <Elements stripe={stripePromise} >
                  <CheckoutForm priceId={priceId} action={"upgrade"} />
                </Elements>
              ) : (
                <div className='text-center text-white text-lg font-bold'>
                  Coming soon
                </div>
                // <div>
                //   <button
                //     onClick={handlePaypalPayment}
                //     className="flex justify-center items-center w-full py-3 px-4 bg-yellow-500 text-white font-semibold rounded-md transition duration-200"
                //   >
                //     <img src={paypal} alt="paypal" className='w-40 object-cover' />
                //   </button>
                // </div>
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

export default Addpayment;
