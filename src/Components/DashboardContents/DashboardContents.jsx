import React, { useState } from 'react';
import { PiMusicNotesSimple } from 'react-icons/pi';

const DashboardContents = () => {
    const data = [
        { beatName: "Summer Vibes", regID: "REG001", regDate: "2023-06-15" },
        { beatName: "Midnight Groove", regID: "REG002", regDate: "2023-06-14" },
        { beatName: "Urban Flow", regID: "REG003", regDate: "2023-06-13" },
        { beatName: "Chill Waves", regID: "REG004", regDate: "2023-06-12" },
        { beatName: "Electro Bounce", regID: "REG005", regDate: "2023-06-11" },
        { beatName: "Lo-fi Dreams", regID: "REG006", regDate: "2023-06-10" },
        { beatName: "Synthwave Sunset", regID: "REG007", regDate: "2023-06-09" },
        { beatName: "Trap Nation", regID: "REG008", regDate: "2023-06-08" },
        { beatName: "Classic Beats", regID: "REG009", regDate: "2023-06-07" },
        { beatName: "Future Bass", regID: "REG010", regDate: "2023-06-06" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='lg:px-4 xl:px-10 xl:pt-20 animate-from-middle'>
            <h1 className='text-5xl font-bold'>
                <span className="bg-gradient-to-r from-purple-500  to-violet-400 text-transparent bg-clip-text">
                    Dashboard
                </span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl'>
                    <h1 className='text-3xl mb-4 font-bold text-[#a1afc5]'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">{data.length}</span></p>
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
                <h2 className="text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-500  to-green-300 text-transparent bg-clip-text">
                        Recent Activity
                    </span>
                </h2>
                {
                    data.length > 0 ? (
                        <div className="overflow-x-auto w-[360px] md:w-full">
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
                                    {currentData.map((item, index) => (
                                        <tr key={index}>
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
                    ) : (
                        <div className="text-center py-10">
                            <p className='flex justify-center text-9xl text-[#6b7c96]'><PiMusicNotesSimple /></p>
                            <p className="text-3xl text-[#adbace] font-bold">No recent activity</p>
                            <p className="text-xl text-[#6b7c96]">Start by registering your first beat to see activity here.</p>
                            <div>
                                <button className='p-3 px-5 mt-4 bg-[#825aeb] rounded-md text-xl font-bold hover:bg-[#6d40df] duration-200 ease-linear'>Register a Beat</button>
                            </div>
                        </div>
                    )
                }
                {/* Pagination */}
                {data.length > itemsPerPage && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 rounded-md ${
                                    currentPage === index + 1
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-700 text-[#a1afc5] hover:bg-gray-600'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardContents;
