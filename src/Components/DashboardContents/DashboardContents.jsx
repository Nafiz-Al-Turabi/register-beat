import React from 'react';

const DashboardContents = () => {
    const data = [
        { beatName: "Summer Vibes", regID: "REG001", regDate: "2023-06-15" },
        { beatName: "Midnight Groove", regID: "REG002", regDate: "2023-06-14" },
        { beatName: "Urban Flow", regID: "REG003", regDate: "2023-06-13" },
        { beatName: "Chill Waves", regID: "REG004", regDate: "2023-06-12" },
      ];
    return (
        <div className='lg:px-4 xl:px-10 xl:pt-20 '>
            <h1 className='text-5xl font-bold'> <span className="bg-gradient-to-r from-purple-500  to-violet-400 text-transparent bg-clip-text">
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

            <div className="p-6 bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] text-white rounded-lg mt-16">
                <h2 className="text-3xl font-bold mb-4"><span className="bg-gradient-to-r from-green-500  to-green-300 text-transparent bg-clip-text">
                Recent Activity
            </span></h2>
                <div className="overflow-x-auto w-80 md:w-full">
                    <table className="min-w-full border-collapse">
                        <thead className='border-b-2  border-gray-700 text-[#a1afc5]'>
                            <tr className="">
                                <th className="p-4 text-left">Beat Name</th>
                                <th className="p-4 text-left">Registration ID</th>
                                <th className="p-4 text-left">Registration Date</th>
                                <th className="p-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y-[1px] divide-[#2d344b] text-[#a1afc5]'>
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    className=''
                                >
                                    <td className="p-4 font-bold">{item.beatName}</td>
                                    <td className="py-8">
                                        <span className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm">
                                            {item.regID}
                                        </span>
                                    </td>
                                    <td className="p-4">{item.regDate}</td>
                                    <td className="p-4">
                                        <button className="bg-gradient-to-l to-purple-500 from-[#5046e6] hover:bg-gradient-to-r hover:to-purple-500 hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm">
                                            View Certificate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardContents;
