import React from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const CompletedPopup = () => {
  return (
    <div className="animate-from-middle">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-12 w-full md:w-2/3 lg:w-1/3 bg-black rounded-lg shadow-2xl border border-slate-900 z-50">
            <div className='flex flex-col items-center justify-center gap-6'>
                <div className='grid justify-center'>
                    <FaRegCircleCheck className='text-5xl text-green-600' />
                </div>
                <h2 className='text-2xl text-white font-bold'>Registration Completed!</h2>
                {/* <div className='flex flex-col gap-2'> */}
                    <p className="mt-2 text-base text-gray-400 text-center">Please allow up to 48 hours to complete the registration
                    process.</p>
                {/* </div> */}
                <button 
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    className="bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition active:scale-95"
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-[#05050a]"></div>
    </div>
  )
}

export default CompletedPopup