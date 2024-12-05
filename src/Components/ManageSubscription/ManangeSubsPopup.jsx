import React, { useState } from 'react'
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FiCheckCircle } from 'react-icons/fi';
import { PiWarningBold } from 'react-icons/pi';

const ManangeSubsPopup = ({ setShowPopup }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showBenefit, setShowBenefit] = useState(false);
    const [showCancelSuccess, setShowCancelSuccess] = useState(false);

    const subscription = {
        plan: "Standard",
        renewalDate: 'September 28th, 2024',
        credits: 12,
        protectedBeats: 50,
        paymentMethod: '1234 5678 9101 1213'
    }

    function maskCardNumber(cardNumber) {
        // Ensure the card number is a string
        const str = cardNumber.toString();
        return str.slice(0, -4).replace(/\d/g, '*') + str.slice(-4);
      }

      const handleConfirmation = () => {
        setShowBenefit(false);
        setShowCancelSuccess(true);
      }

  return (
    <div>
        <div className="animate-from-middle justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[99999] outline-none focus:outline-none">
            <div className="relative w-4/5 md:w-1/2 xl:w-1/4 my-6 ">
                {/*content*/}
                <div className=" p-5 border-0 rounded-lg shadow-lg relative flex flex-col gap-2 w-full bg-[#141e2d] outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between rounded-t my-4">
                        <h3 className="text-xl md:text-3xl font-bold flex flex-col items-center">
                            Manage Subscription
                        </h3>
                        <button className=" text-3xl" onClick={() => setShowPopup(false)}>×</button>
                    </div>
                    {showConfirmation ? (
                        <div className='animate-from-middle'>
                            {showBenefit ? (
                                <div className='flex flex-col gap-5 animate-from-middle'>
                                    <p className='text-base md:text-xl font-normal'>Benefits you will lose</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='flex items-center gap-2 text-slate-300'><PiWarningBold className='text-yellow-500 text-xl' /> No access to new beats</p>
                                        <p className='flex items-center gap-2 text-slate-300'><PiWarningBold className='text-yellow-500 text-xl' /> Your beats will be exposed to the public</p>
                                        <p className='flex items-center gap-2 text-slate-300'><PiWarningBold className='text-yellow-500 text-xl' /> No premium access to features</p>
                                    </div>
                                    <button className='w-full bg-red-600 font-semibold rounded-full py-2 mt-2 active:scale-95' onClick={handleConfirmation}>Confirm Cancellation</button>
                                </div>
                            ) : showCancelSuccess ? ( 
                                <div className='flex flex-col items-center justify-center gap-6'>
                                    <div className='grid justify-center'>
                                        <FiCheckCircle className='text-6xl text-green-600' />
                                    </div>
                                    <h2 className='text-2xl text-white font-bold'>Membership Cancelled</h2>
                                    {/* <div className='flex flex-col gap-2'> */}
                                        <p className="mt-2 text-base text-gray-400 text-center">Your membership has been successfully cancelled
                                        Redirecting to dashboard...</p>
                                    {/* </div> */}
                                    <button onClick={() => setShowPopup(false)} className="bg-purple-600 text-white font-bold px-8 py-3 rounded-full w-full hover:bg-purple-700 transition active:scale-95">
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-5 animate-from-middle'>
                                    <p className='text-base md:text-xl font-normal'>Are you sure you want to cancel your
                                    subscription?</p>
                                    <div className='flex gap-4 justify-between'>
                                        <button className='w-full bg-red-600 font-semibold rounded-full py-2 mt-2 active:scale-95' onClick={() => setShowBenefit(true)}>Yes, cancel</button>
                                        <button className='w-full bg-purple-600 font-semibold rounded-full py-2 mt-2 active:scale-95' onClick={() => setShowConfirmation(false)}>No, keep it</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="p-6 bg-[#192332] rounded-lg flex flex-col gap-4 animate-from-middle">
                                <h3 className='text-xl font-semibold'>Subscription summary</h3>
                                <ul className='flex flex-col gap-2'>
                                    <li className='flex justify-between'><p className='text-xs md:text-base text-slate-400'>Current Plan:</p> <p className='text-xs md:text-base'>{subscription.plan}</p></li>
                                    <li className='flex justify-between'><p className='text-xs md:text-base text-slate-400'>Renewal Date:</p> <p className='text-xs md:text-base'>{subscription.renewalDate}</p></li>
                                    <li className='flex justify-between'><p className='text-xs md:text-base text-slate-400'>Available Credits:</p> <p className='text-xs md:text-base'>{subscription.credits}</p></li>
                                    <li className='flex justify-between'><p className='text-xs md:text-base text-slate-400'>Protected Beats:</p> <p className='text-xs md:text-base'>{subscription.protectedBeats}</p></li>
                                    <li className='flex justify-between'><p className='text-xs md:text-base text-slate-400'>Payment Method:</p> <p className='text-xs md:text-base'>{maskCardNumber(subscription.paymentMethod)}</p></li>
                                </ul>
                            </div>
                            <button className='bg-red-600 font-semibold rounded-full py-3 mt-2 active:scale-95' onClick={() => setShowConfirmation(true)}>Cancel Subscription</button>
                            <button className='bg-slate-700 font-semibold rounded-full py-3 mt-2 active:scale-95' onClick={''}>Contact Support</button>
                        </>
                    )}
                </div>
            </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-[9999] bg-black"></div>
    </div>
  )
}

export default ManangeSubsPopup