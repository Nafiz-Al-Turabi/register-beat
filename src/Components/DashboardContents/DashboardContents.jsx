import React, { useContext, useEffect, useState } from 'react';
import { PiMusicNotesSimple } from 'react-icons/pi';
import PlanBillsModal from '../Settings/PlanBillsModal';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const DashboardContents = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const userId = user?._id;
    const [currentPage, setCurrentPage] = useState(0);
    const beatsPerPage = 5;

    const { isLoading, isError, data: beats = [], error, refetch } = useQuery({
        queryKey: ['adminDashboard', userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/beat/get-beats/${userId}`);
            return response.data?.beats;
        },
        enabled: Boolean(userId),
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleCredit = async () => {
        try {
            const response = await axiosInstance.post(`/credit/purchase-credits/${user?._id}`);
            if (response.data?.url) {
                window.location.href = response.data.url;
                refetch();
            } else {
                console.error('Redirect URL not found in the response');
            }
        } catch (error) {
            console.error("Error purchasing credits: ", error.response ? error.response.data : error.message);
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * beatsPerPage;
    const currentBeats = beats.slice(offset, offset + beatsPerPage);
    const pageCount = Math.ceil(beats.length / beatsPerPage);

    return (
        <div className='animate-from-middle'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl border border-transparent hover:border hover:border-zinc-600 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold text-blue-400'>
                        <span className="bg-gradient-to-r from-blue-500 to-blue-500 text-transparent bg-clip-text">{beats?.length}</span>
                    </p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl border border-transparent hover:border hover:border-zinc-600 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Credits</h1>
                    <p className='text-4xl font-extrabold text-blue-400'>
                        <span className="bg-gradient-to-r from-blue-500 to-blue-500 text-transparent bg-clip-text">{user?.credit}</span>
                    </p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl border border-transparent hover:border hover:border-zinc-600 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Need more credits?</h1>
                    {
                        user?.active === true ||
                            new Date(user?.subscriptionEndDAte) > new Date() ? (
                            <button className='bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm' onClick={handleCredit}>
                                Get Extra Credits
                            </button>
                        ) : (
                            <Link to='/payment'>
                                <button className='bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm'>
                                    Subscribe Now
                                </button>
                            </Link>
                        )
                    }
                </div>
            </div>

            <div className="p-6 bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] text-white rounded-lg mt-8">
                <h2 className="text-xl xl:text-3xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-500 to-green-300 text-transparent bg-clip-text">
                        Latest Registered Beats
                    </span>
                </h2>
                {beats?.length > 0 ? (
                    <div className="overflow-x-auto md:w-full">
                        <table className="min-w-full border-collapse">
                            <thead className='border-b-2 border-gray-700 text-[#a1afc5]'>
                                <tr>
                                    <th className="p-4 text-left">Beat Name</th>
                                    <th className="p-4 text-left">Registration ID</th>
                                    <th className="p-4 text-left">Registration Date</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y-[1px] divide-[#2d344b] text-white'>
                                {currentBeats.map((beat) => (
                                    <tr key={beat?._id}>
                                        <td className="p-4 font-medium">{beat?.beatName}</td>
                                        <td className="py-5">
                                            <span className="primary-bg text-white px-3 py-1 rounded-full text-sm">
                                                {beat.registrasionId}
                                            </span>
                                        </td>
                                        <td className="p-4">{moment(beat?.updatedAt).format('MMMM Do YYYY')}</td>
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
                            <Link to='/register-beat'>
                                <button className='p-3 px-5 mt-4 primary-bg rounded-md text-xl font-bold'>Register a Beat</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <PlanBillsModal setShowModal={setShowModal} showModal={showModal} />
            {
                pageCount > 1 && (
                    <ReactPaginate
                        previousLabel={"←"}
                        nextLabel={"→"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={"flex justify-end mt-4 space-x-4"}
                        activeClassName={"font-bold bg-violet-600/20"}
                        pageClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                        previousClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                        nextClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                        breakClassName={"px-3 py-1 text-zinc-400"}
                    />
                )
            }
        </div>
    );
};

export default DashboardContents;
