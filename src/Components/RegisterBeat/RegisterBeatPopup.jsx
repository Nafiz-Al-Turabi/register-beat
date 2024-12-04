import React from 'react';

const RegisterBeatPopup = ({ success, progress }) => {
  return (
    <div className="animate-from-middle">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 w-full md:w-2/3 lg:w-1/3 bg-black rounded-lg shadow-lg z-50 border border-slate-900">
            <h2 className='text-2xl text-white font-bold'>Registering Your Beat</h2>
            <div className='flex flex-col gap-2 mt-8'>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 bg-green-500`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2 text-base text-gray-400 text-center">
                    {success ? 'Beat Registred Successfully!' : `Please wait while we register your beat...`}
                    
                </p>
            </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default RegisterBeatPopup;
