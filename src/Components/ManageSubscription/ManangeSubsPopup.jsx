import React, { useContext, useState } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManageSubscriptionPopup = ({ setShowPopup }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const subscription = {
        plan: "Standard",
        renewalDate: 'September 28th, 2024',
        credits: 12,
        protectedBeats: 50,
        paymentMethod: '1234 5678 9101 1213'
    };

    function maskCardNumber(cardNumber) {
        if (!cardNumber) return '';
        const str = cardNumber.toString();
        return str.slice(0, -4).replace(/\d/g, '*') + str.slice(-4);
    }

    const handleCancelClick = async () => {
        if (!user?._id) {
            toast.error("User not found");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/payments/cancelSubscription/${user._id}`);
            console.log(response.data)
            toast.success('Subscription cancelled successfully');
            setShowPopup(false);
        } catch (error) {
            console.error("Error while cancelling: ", error.message);
            toast.error('Failed to cancel subscription. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleContactClick = () => {
        setShowPopup(false);
        navigate('/contact');
    };

    return (
        <div>
            <div className="animate-from-middle justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] outline-none focus:outline-none">
                <div className="relative w-4/5 md:w-1/2 xl:w-1/4 my-6">
                    <div className="p-5 border-0 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-[#141e2d] outline-none focus:outline-none">
                        <div className="flex items-start justify-between rounded-t my-4">
                            <h3 className="text-xl md:text-3xl font-bold flex flex-col items-center">
                                Manage Subscription
                            </h3>
                            <button
                                className="text-3xl"
                                onClick={() => setShowPopup(false)}
                                aria-label="Close popup"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 bg-[#192332] rounded-lg flex flex-col gap-4 animate-from-middle">
                            <h3 className="text-xl font-semibold">Subscription summary</h3>
                            <ul className="flex flex-col gap-2">
                                <li className="flex justify-between">
                                    <p className="text-xs md:text-base text-slate-400">Current Plan:</p>
                                    <p className="text-xs md:text-base">{subscription.plan}</p>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-xs md:text-base text-slate-400">Renewal Date:</p>
                                    <p className="text-xs md:text-base">{subscription.renewalDate}</p>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-xs md:text-base text-slate-400">Available Credits:</p>
                                    <p className="text-xs md:text-base">{subscription.credits}</p>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-xs md:text-base text-slate-400">Protected Beats:</p>
                                    <p className="text-xs md:text-base">{subscription.protectedBeats}</p>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-xs md:text-base text-slate-400">Payment Method:</p>
                                    <p className="text-xs md:text-base">{maskCardNumber(subscription.paymentMethod)}</p>
                                </li>
                            </ul>
                        </div>
                        {
                            user?.active === true ? <button
                                className="bg-red-600 font-semibold rounded-full py-3 mt-2 active:scale-95"
                                onClick={handleCancelClick}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Cancelling...' : 'Cancel Subscription'}
                            </button> : ''
                        }
                        <button
                            className="bg-slate-700 font-semibold rounded-full py-3 mt-2 active:scale-95"
                            onClick={handleContactClick}
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-[9999] bg-black"></div>
        </div>
    );
};

export default ManageSubscriptionPopup;