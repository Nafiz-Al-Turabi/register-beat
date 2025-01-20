import React, { useContext, useEffect, useState } from 'react';
import { PiMusicNotesSimple } from 'react-icons/pi';
import PlanBillsModal from '../Settings/PlanBillsModal';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/AxiosInstance';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';


const DashboardContents = () => {
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);
    const userId = user?._id;

    const { isLoading, isError, data: beats = [], error, refetch } = useQuery({
        queryKey: ['adminDashboard', userId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/beat/get-beats/${userId}`);
            // refetch();
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

    return (
        <div className='animate-from-middle'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6'>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Beats Registered</h1>
                    <p className='text-4xl font-extrabold text-blue-400'>
                        <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">{beats?.length}</span>
                    </p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Credits</h1>
                    <p className='text-4xl font-extrabold text-blue-400'>
                        <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">{user?.credit}</span>
                    </p>
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Need more credits?</h1>
                    {
                        user?.active === true ? (
                            <button className='bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm' onClick={handleCredit}>
                                Get Extra Credits
                            </button>
                        ) : (
                            <button className='bg-gradient-to-l to-[#7837eb] from-[#5046e6] hover:bg-gradient-to-r hover:to-[#7837eb] hover:from-[#5046e6] duration-200 ease-linear transition-all active:scale-95 font-bold text-white px-4 py-2 rounded-md text-sm'>
                                Subscribe Now
                            </button>
                        )
                    }
                </div>
                <div className='bg-gradient-to-tl to-[#192332] via-[#22314b] from-[#141928] p-6 rounded-xl hover:scale-105 duration-200'>
                    <h1 className='text-xl xl:text-xl mb-4 font-extrabold text-[#c8ccd3]'>Subscription Status</h1>
                    <p className='text-4xl font-extrabold text-blue-400'>
                        <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">{user?.active === true ? 'Active' : 'Inactive'}</span>
                    </p>
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
                                {beats?.map((beat) => (
                                    <tr key={beat?._id}>
                                        <td className="p-4 font-medium">{beat?.beatName}</td>
                                        <td className="py-5">
                                            <span className="bg-purple-800 text-white px-3 py-1 rounded-full text-sm">
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
                                <button className='p-3 px-5 mt-4 bg-[#825aeb] rounded-md text-xl font-bold hover:bg-[#6d40df] duration-200 ease-linear'>Register a Beat</button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <PlanBillsModal setShowModal={setShowModal} showModal={showModal} />
        </div>
    );
};

export default DashboardContents;
