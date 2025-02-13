import React, { useContext, useEffect, useState } from "react";
import { ImCreditCard } from "react-icons/im";
import axiosInstance from "../../Axios/AxiosInstance";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PlanBillsModal = ({ setShowModal, showModal }) => {
    const [input, setInput] = useState(1);
    const [credits, setCredits] = useState(10);
    const [amount, setAmount] = useState(5);
    const { user,refreshUserInfo } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(
        user?.paymentMethod || "stripe"
    );
    const [redirectLoading, setRedirectLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCredits(input * 10);
        setAmount(input * 5);
    }, [input]);

    const handleCreditPurchase = () => {
        setShowModal(false);
    };

    const handleStripePayment = async (data) => {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
            sessionId: data.id,
        });

        if (result.error) {
            toast.error("Payment failed. Please try again.");
        } else {
            toast.success("Credits purchased successfully!");
            setShowModal(false);
        }
    };

    const handlePayPalPayment = async () => {
        try {
            const response = await axiosInstance.post(
                `/paypalPayment/purchase-credits-paypal/${user?._id}`,
                {
                    amount: amount,
                    credits: credits,
                    paymentMethod: paymentMethod,
                }
            );
            console.log("PayPal Response:", response.data);

            if (
                !response.data?.data?.links ||
                !Array.isArray(response.data.data.links)
            ) {
                toast.error("PayPal response is missing links.");
                return;
            }
            const approvalUrl = response.data.data.links.find(
                (link) => link.rel === "approve"
            )?.href;

            if (approvalUrl) {
                window.location.href = approvalUrl;
            } else {
                toast.error("Failed to retrieve PayPal approval URL.");
            }
        } catch (error) {
            console.error(
                "Error purchasing credits via PayPal: ",
                error.response ? error.response.data : error.message
            );
            toast.error("Payment failed. Please try again.");
        }
    };

    const handleCredit = async () => {
        setIsLoading(true);
        try {
            const data = {
                amount: amount,
                credits: credits,
                paymentMethod: paymentMethod,
            };

            const response = await axiosInstance.post(
                `/credit/purchase-credits/${user?._id}`,
                data
            );

            if (response.data?.id || response.data?.approvalUrl) {
                if (paymentMethod === "stripe") {
                    await handleStripePayment(response.data);
                } else if (paymentMethod === "paypal") {
                    await handlePayPalPayment(response.data);
                }
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(
                "Error purchasing credits: ",
                error.response ? error.response.data : error.message
            );
            toast.error("Payment failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const createOrder = async () => {
        console.log("Creating order...");
        try {
            const response = await axiosInstance.post(
                `/paypalPayment/purchase-credits-paypal/${user?._id}`,
                { amount },
                { headers: { "Content-Type": "application/json" } }
            );
            return response.data.data.id; // Return PayPal order ID
        } catch (error) {
            console.error("Error creating PayPal order:", error);
            alert("Failed to create PayPal order.");
        }
    };

    const captureOrder = async (orderID) => {
        try {
            const response = await axiosInstance.post(
                `/paypalPayment/finalbuycredit`,
                { orderID },
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Credits purchased successfully!");
            setShowModal(false);
            setRedirectLoading(true); 

            setTimeout(() => {
                setRedirectLoading(false);
                navigate("/");
            }, 30000);
            setTimeout(() => {
                refreshUserInfo();
            }, 30000); 
        } catch (error) {
            console.error("Error capturing payment:", error);
            toast.error("Payment capture failed.");
        }
    };

    return (
        <>
            {redirectLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md z-50">
                    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 rounded-lg flex flex-col items-center  shadow-2xl border border-gray-800/50">
                        <h2 className="text-lg text-gray-400 font-semibold mb-2">Your Payment is being proccessing...</h2>
                        <span className="loader"></span>
                    </div>
                </div>
            )}
            {showModal ? (
                <>
                    <div className="animate-from-middle justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-lg">
                            {/*content*/}
                            <div className=" px-4 py-5 border-0 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-[#0f0f0f] outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t">
                                    <h3 className="text-2xl font-medium">Purchase Credits</h3>
                                    <button
                                        className=" text-xl"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="">
                                    <p className="text-base text-[#797979] font-bold">
                                        Buy packages of 10 credits for $5 USD to your 1 credit
                                        equals 1 registration.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-base">Number of packages:</h4>
                                    <div className="flex flex-row gap-2">
                                        <button
                                            className={`px-3 flex items-center rounded bg-[#8c50ff] ${input === 1 && "opacity-50"
                                                }`}
                                            onClick={() => setInput(input - 1)}
                                            disabled={input === 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={input}
                                            className="w-10 rounded bg-[#282828] px-2 py-1 outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <button
                                            className="px-3 flex items-center rounded bg-[#8c50ff]"
                                            onClick={() => setInput(input + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-base text-[#797979]">
                                            Total Credits: {credits}
                                        </p>
                                        <h3 className="text-lg font-bold">
                                            Total Cost: ${amount} USD
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 bg-[#282828] p-4 rounded mt-2">
                                    <p className="text-base">Payment Method</p>
                                    <div className="flex gap-4">
                                        <button
                                            className={`flex gap-2 items-center p-2 rounded ${paymentMethod === "stripe"
                                                ? "bg-[#8c50ff]"
                                                : "bg-[#3a3a3a]"
                                                }`}
                                            onClick={() => setPaymentMethod("stripe")}
                                        >
                                            <ImCreditCard className="text-[#c4bb8f] text-xl" />
                                            <span>Stripe</span>
                                        </button>
                                        <button
                                            className={`flex gap-2 items-center p-2 rounded ${paymentMethod === "paypal"
                                                ? "bg-[#8c50ff]"
                                                : "bg-[#3a3a3a]"
                                                }`}
                                            onClick={() => setPaymentMethod("paypal")}
                                        >
                                            <ImCreditCard className="text-[#c4bb8f] text-xl" />
                                            <span>PayPal</span>
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="bg-[#8c50ff] rounded py-3 mt-2 active:scale-95"
                                    onClick={handleCredit}
                                    disabled={isLoading}
                                    style={{ display: paymentMethod === 'stripe' ? 'block' : 'none' }}
                                >
                                    {isLoading ? "Processing..." : "Purchase Credits"}
                                </button>

                                {paymentMethod === "paypal" && (
                                    <div className="w-full h-12 overflow-hidden mt-2">
                                        <PayPalButtons
                                            style={{
                                                layout: "vertical",
                                                size: "responsive",
                                                shape: "rect",
                                                color: "gold",
                                                label: "paypal",
                                            }}

                                            createOrder={createOrder}
                                            onApprove={(data) => captureOrder(data.orderID)}
                                        />
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};

export default PlanBillsModal;