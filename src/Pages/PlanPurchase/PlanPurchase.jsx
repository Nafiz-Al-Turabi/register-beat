import React, { useState } from 'react'
import Faqs from '../../Components/PlanPurchase.jsx/Faqs'
import Loading from '../../Components/Loading/Loading';

const PlanPurchase = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePayment = () => {
        setShowPopup(true)
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 3000);
    }

  return (
    <div className='py-12 animate-from-middle'>
        <h1 className='text-4xl font-bold text-center'>Choose Your Plan</h1>
        <div className='max-w-2xl mx-auto my-24'>
            <div className='flex flex-col border-2 border-[#7837eb] rounded-md bg-[#0f1423]'>
                <div className='flex flex-row justify-between'>
                    <div></div>
                    <p className='px-3 py-1 bg-[#7837eb] rounded-bl-md text-sm font-semibold'>Popular</p>
                </div>
                <div className='px-6 pb-6 flex flex-col gap-4'>
                    <h3 className='text-xl font-bold'>Pro</h3>
                    <h3 className='text-2xl font-bold'>$9.99 <span className='font-normal text-sm'>/month</span></h3>
                    <ul role="list" className="flex flex-col gap-2">
                        <li className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span className="ml-3 text-sm">Register 20 Beats month</span>
                        </li>
                        <li className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span className="ml-3 text-sm">Advanced protection</span>
                        </li>
                        <li className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span className="ml-3 text-sm">Analytics Dashboard</span>
                        </li>
                        <li className="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span className="ml-3 text-sm">Copyright analysis</span>
                        </li>
                        <li className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" className="flex-shrink-0 w-6 h-6 text-emerald-500" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg><span className="ml-3 text-sm">Get Extra Credits to Register More Beats</span></li>
                    </ul>
                    <button className='py-2 bg-[#14a046] text-xs xl:text-base font-medium text-white rounded-full hover:bg-[#14a046] mt-3 active:translate-y-1 duration-200' onClick={handlePayment}>Get Pro</button>
                </div>
            </div>
        </div>
        <div>
            <Faqs />
        </div>
        {showPopup && (
        // {/* payment process popup */}
        <div className="animate-from-middle">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-12 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-black rounded-lg shadow-2xl border border-slate-900 z-50">
                {loading && (
                    <div className='flex flex-col items-center justify-center'>
                        <div className='grid justify-center'>
                            <Loading />
                        </div>
                        <h2 className='text-xl text-white font-semibold'>Processing Payment...</h2>
                    </div>
                )}
                {!loading && success && (
                    <div className='flex flex-col items-center justify-center gap-6'>
                        <h2 className='text-2xl text-white font-bold'>Purchase Successful!</h2>
                        {/* <div className='flex flex-col gap-2'> */}
                            <p className="mt-2 text-base text-gray-400 text-center">Your payment has been approved and 10 credits have been
                            added to your account.</p>
                        {/* </div> */}
                        <button onClick={() => setShowPopup(false)} className="bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition active:scale-95">
                            Close
                        </button>
                    </div>
                )}
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-[#05050a]"></div>
        </div>
        )}
    </div>
  )
}

export default PlanPurchase