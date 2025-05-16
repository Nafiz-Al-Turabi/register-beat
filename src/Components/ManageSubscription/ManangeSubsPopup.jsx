import React, { useContext, useState, useEffect } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import moment from 'moment';
import { FiCheckCircle } from "react-icons/fi";

const ManageSubscriptionPopup = ({ setShowPopup }) => {
    const { user, refreshUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1); // Step 1 = Details, Step 2 = Confirm, Step 3 = Warning, Step 4 = Success, Step 5 = Downgrade Confirm

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return moment(dateString).format('MMMM Do, YYYY');
    };

    const handleCancelClick = () => {
        setStep(2); // Move to "Are you sure?" step
    };

    const confirmCancellation = async () => {
        if (!user?._id) {
            toast.error("User not found");
            return;
        }

        setIsLoading(true);
        try {
            let response;
            if (user.paymentMethod === 'stripe') {
                response = await axiosInstance.delete(`/payments/cancelSubscription/${user._id}`);
            } else if (user.paymentMethod === 'paypal') {
                response = await axiosInstance.post(`/paypalPayment/cancel-subscription-paypal/${user._id}`);
            } else {
                throw new Error('Invalid payment method');
            }

            setTimeout(() => {
                setStep(4); 
            }, 500);
        } catch (error) {
            toast.error('Failed to cancel subscription. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactClick = () => {
        setShowPopup(false);
        navigate('/dashboard/contact');
    };

   const handlecloseToHome = () => {
    setShowPopup(false);
    navigate('/dashboard');
   }

   const handleCancelClickDwongraded = () => {
        setStep(5); // Move to downgrade confirmation step
   }

   const confirmDowngrade = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.post(`/payments/create-subscription/${user._id}`, {
                customerId: user.customerId,
                action: "downgrade"
            });
            toast.success('Successfully downgraded to Pro plan');
            refreshUserInfo();
            setShowPopup(false);
        } catch (error) {
            toast.error('Failed to downgrade plan. Please try again.');
        } finally {
            setIsLoading(false);
        }
   }

    return (
        <div>

            <div className="animate-from-middle justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] outline-none focus:outline-none">
                <div className="relative w-full md:w-1/2 xl:w-1/4 my-6 px-4 lg:px-0">
                    <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-[#141e2d] outline-none focus:outline-none">
                        <div className="flex items-start justify-between rounded-t my-4">
                            <h3 className="text-xl md:text-3xl font-bold flex flex-col items-center">
                                Manage Subscription
                            </h3>
                            <button
                                className="text-3xl absolute top-1 right-5"
                                onClick={() => setShowPopup(false)}
                                aria-label="Close popup"
                            >
                                ×
                            </button>
                        </div>

                        {/* Step 1: Subscription Details */}
                        {step === 1 && (
                            <>
                                <div className="p-6 bg-[#192332] rounded-lg flex flex-col gap-4 animate-from-middle">
                                    <h3 className="text-xl font-semibold">Subscription summary</h3>
                                    <ul className="flex flex-col gap-2">
                                        <li className="flex justify-between">
                                            <p className="text-xs md:text-base text-slate-400">Status:</p>
                                            <p className={`text-xs md:text-base ${user?.active ? 'text-green-500' : 'text-red-500'}`}>
                                                {user?.active ? 'Active' : 'Inactive'}
                                            </p>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="text-xs md:text-base text-slate-400">Subscription End Date:</p>
                                            <p className="text-xs md:text-base">
                                                {formatDate(user?.subscriptionEndDAte)}
                                            </p>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="text-xs md:text-base text-slate-400">Available Credits:</p>
                                            <p className="text-xs md:text-base">{user?.credit || 0}</p>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="text-xs md:text-base text-slate-400">Country:</p>
                                            <p className="text-xs md:text-base">{user?.country || 'N/A'}</p>
                                        </li>
                                        <li className="flex justify-between">
                                            <p className="text-xs md:text-base text-slate-400">Member Since:</p>
                                            <p className="text-xs md:text-base">
                                                {formatDate(user?.createdAt)}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                {(user?.active && user?.planType === "ultra") && (
                                    <button
                                        className="bg-[#712dde] font-semibold rounded-full py-3 mt-2 active:scale-95"
                                        onClick={handleCancelClickDwongraded}
                                    >
                                        Downgrade to Pro
                                    </button>
                                )}
                                {user?.active && (
                                    <button
                                        className="bg-red-600 font-semibold rounded-full py-3 mt-2 active:scale-95"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel Subscription
                                    </button>
                                )}
                                <button
                                    className="bg-slate-700 font-semibold rounded-full py-3 mt-2 active:scale-95"
                                    onClick={handleContactClick}
                                >
                                    Contact Support
                                </button>
                            </>
                        )}

                        {/* Step 2: "Are you sure?" */}
                        {step === 2 && (
                            <div className="rounded-lg flex flex-col gap-4 animate-from-middle">
                                <h3 className="text-xl font-semibold">Are you sure you want to cancel your subscription?</h3>
                                <div className="flex gap-4 justify-between">
                                    <button
                                        className="bg-red-600 font-semibold rounded-full py-2 w-full px-5 active:scale-95"
                                        onClick={() => setStep(3)}
                                    >
                                        Yes, cancel
                                    </button>
                                    <button
                                        className="primary-bg font-semibold rounded-full py-2 w-full px-5 active:scale-95"
                                        onClick={() => setStep(1)}
                                    >
                                        No, go back
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: "Benefits you will lose" */}
                        {step === 3 && (
                            <div className="rounded-lg flex flex-col gap-4 animate-from-middle">
                                <h3 className="text-xl font-semibold">Benefits you will lose</h3>
                                <ul className="text-slate-400">
                                    <li>⚠️ You will no longer be able to register new beats.</li>
                                    <li>⚠️ Your beats will be exposed to the public.</li>
                                    <li>⚠️ You won't be able to submit YouTube claims for unauthorized use of your beats.</li>
                                </ul>
                                <button
                                    className="bg-red-600 font-semibold rounded-full py-3 mt-4 active:scale-95"
                                    onClick={confirmCancellation}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Cancelling...' : 'Confirm Cancellation'}
                                </button>
                            </div>
                        )}

                        {/* Step 4: "Membership Cancelled" */}
                        {step === 4 && (
                            <div className="rounded-lg flex flex-col gap-4 animate-from-middle items-center">
                                <div className="text-green-500 text-7xl"><FiCheckCircle /></div>
                                <h3 className="text-xl font-semibold">Membership Cancelled</h3>
                                <p className="text-slate-400">Your membership has been successfully cancelled.</p>
                                {/* <p className="text-slate-400">Redirecting to dashboard...</p> */}
                                <button
                                    className="primary-bg w-full font-semibold rounded-full py-3 mt-4 active:scale-95"
                                    onClick={handlecloseToHome}
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {/* Step 5: Downgrade Confirmation */}
                        {step === 5 && (
                            <div className="rounded-lg flex flex-col gap-4 animate-from-middle">
                                <h3 className="text-xl font-semibold">Are you sure you want to downgrade to Pro plan?</h3>
                                <div className="flex gap-4 justify-between">
                                    <button
                                        className="bg-[#712dde] font-semibold rounded-full py-2 w-full px-5 active:scale-95"
                                        onClick={confirmDowngrade}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Processing...' : 'Yes, downgrade'}
                                    </button>
                                    <button
                                        className="primary-bg font-semibold rounded-full py-2 w-full px-5 active:scale-95"
                                        onClick={() => setStep(1)}
                                    >
                                        No, go back
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-[9999] bg-black"></div>
        </div>
    );
};

export default ManageSubscriptionPopup;
