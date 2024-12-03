import React from 'react';

const DashboardContents = () => {
    return (
        <div className='xl:px-10 xl:pt-20'>
            <h1 className='text-5xl font-bold'> <span className="bg-gradient-to-r from-violet-500  to-violet-300 text-transparent bg-clip-text">
                Dashboard
            </span></h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 '>
                <div className='bg-gradient-to-tl to-[#192332] via-[#1e2c42] from-[#141928] p-6'>
                    <h1 className='text-3xl mb-4'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold'>15</p>
                </div>
                
            </div>
        </div>
    );
};

export default DashboardContents;
