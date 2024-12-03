import React from 'react';

const DashboardContents = () => {
    return (
        <div className='px-4 lg:px-4 xl:px-10 xl:pt-20 '>
            <h1 className='text-5xl font-bold'> <span className="bg-gradient-to-r from-violet-500  to-violet-300 text-transparent bg-clip-text">
                Dashboard
            </span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10  '>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl'>
                    <h1 className='text-3xl mb-4 font-bold text-[#a1afc5]'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">15</span></p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl'>
                    <h1 className='text-3xl mb-4 font-bold text-[#a1afc5]'>Credits</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">20</span></p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl'>
                    <h1 className='text-3xl mb-4 font-bold text-[#a1afc5]'>Subscription Status</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">Active</span></p>
                </div>
            </div>
            
        </div>
    );
};

export default DashboardContents;
