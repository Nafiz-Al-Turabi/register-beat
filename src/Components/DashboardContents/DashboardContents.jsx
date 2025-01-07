import React, { useContext, useState } from 'react';
import { PiMusicNotesSimple } from 'react-icons/pi';
import PlanBillsModal from '../Settings/PlanBillsModal';
import { AuthContext } from '../../Provider/AuthProvider';

const DashboardContents = () => {
  const [showModal, setShowModal] = useState(false);
  const {user} = useContext(AuthContext);

    const data = [
        { beatName: "Summer Vibes", regID: "REG001", regDate: "2023-06-15" },
        { beatName: "Midnight Groove", regID: "REG002", regDate: "2023-06-14" },
        { beatName: "Urban Flow", regID: "REG003", regDate: "2023-06-13" },
        { beatName: "Chill Waves", regID: "REG004", regDate: "2023-06-12" },
        { beatName: "Electro Bounce", regID: "REG005", regDate: "2023-06-11" },
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
        <div className=' animate-from-middle'>
            {/* <h1 className='text-5xl font-bold mt-4'>
                <span className="bg-gradient-to-r from-[#7837eb]  to-violet-400 text-transparent bg-clip-text">
                    Dashboard
                </span>
            </h1> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-2xl mb-4 font-extrabold text-[#c8ccd3]'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">{data.length}</span></p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-2xl mb-4 font-extrabold text-[#c8ccd3]'>Credits</h1>
                    <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">{user?.credit}</span></p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-2xl mb-4 font-extrabold text-[#c8ccd3]'>Need more credits?</h1>
                    {/* <p className='text-4xl font-extrabold text-blue-400'><span className="bg-gradient-to-r from-blue-500  to-violet-500 text-transparent bg-clip-text">Active</span></p> */}
                    <button className='bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm' onClick={() => setShowModal(true)}>Get Extra Credits</button>
                </div>
            </div>

            <div className="p-6 bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] text-white rounded-lg mt-8">
                <h2 className="text-xl xl:text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-500  to-green-300 text-transparent bg-clip-text">
                        Latest Registered Beats
                    </span>
                </h2>
                {
                    data.length > 0 ? (
                        <div className="overflow-x-auto  md:w-full">
                            <table className="min-w-full border-collapse">
                                <thead className='border-b-2  border-gray-700 text-[#a1afc5]'>
                                    <tr className="">
                                        <th className="p-4 text-left">Beat Name</th>
                                        <th className="p-4 text-left">Registration ID</th>
                                        <th className="p-4 text-left">Registration Date</th>
                                        <th className="p-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y-[1px] divide-[#2d344b] text-white'>
                                    {currentData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="p-4 font-medium">{item.beatName}</td>
                                            <td className="py-5">
                                                <span className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm">
                                                    {item.regID}
                                                </span>
                                            </td>
                                            <td className="p-4">{item.regDate}</td>
                                            <td className="p-4">
                                                <button className="bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm">
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
                            <p className="text-xl xl:text-3xl text-[#adbace] font-bold">No recent activity</p>
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
                                        ? 'bg-[#7837eb] text-white'
                                        : 'bg-gray-700 text-[#a1afc5] hover:bg-gray-600'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <PlanBillsModal setShowModal={setShowModal} showModal={showModal} />
        </div>
    );
};

export default DashboardContents;
