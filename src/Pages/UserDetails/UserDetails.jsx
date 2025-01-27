import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import fileUrl from '../../Axios/fileUrl';

import BeatTable from '../../Components/Tables/BeatTable';
import TransactionsTable from '../../Components/Tables/TransactionsTable';

const UserDetails = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('beats');
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['userDetails', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/oneUserDetails/${id}`);
            console.log("user details", response.data);
            return response.data;
        },
    });
    const {
        data: { beats = [], transactions = [] } = {},
        isLoading: usersLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ['users', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/allRegisterBeatandTransections/${id}`);
            console.log("beat and transactions", response.data);
            return response.data;
        },
    });

    console.log(beats, transactions);

    if (isLoading || usersLoading) {
        return <Loading />;
    }


    if (isError || usersError) {
        return (
            <div>
                Error: {error?.message || usersError?.message || 'Something went wrong'}
            </div>
        );
    }
    const { user } = data;


    return (
        <div className="">
            <div className="lg:flex  gap-5 bg-[#212529] shadow-lg rounded-lg p-6 w-full ">
                <div className="space-y-4">
                    <img
                        src={`${fileUrl}/uploads/images/${user?.avatar}`}
                        alt="Avatar"
                        className="md:w-56 md:h-56 rounded-md object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{user?.name || "No Name"}</h2>
                        <p className="text-sm text-gray-500">Producer Name: {user?.producerName || "N/A"}</p>
                    </div>
                </div>
                <div className=" lg:w-full">
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Full Name:</span>
                        <span className="text-white">{user?.fullName || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Producer Name:</span>
                        <span className="text-white">{user?.producerName || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Email:</span>
                        <span className="text-white">{user?.email || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Youtube Channel:</span>
                        <a href={user?.youtubeChannel} className="text-white">{user?.youtubeChannel || "N/A"}</a>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Country:</span>
                        <span className="text-white">{user?.country || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Credit:</span>
                        <span className="text-white">{user?.credit || 0}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Subscription Ends:</span>
                        <span className="text-white">
                            {user?.subscriptionEndDAte
                                ? new Date(user.subscriptionEndDAte).toLocaleDateString()
                                : "N/A"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Account Status:</span>
                        <span
                            className={`text-sm font-semibold ${user?.true ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {user?.true ? "Active" : "Inactive"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Customer Id:</span>
                        <span className="text-white">{user?.customerId || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-700">
                        <span className="text-white font-medium">Blacklist:</span>
                        <span
                            className={`text-sm font-semibold ${user?.blacklist ? 'text-red-500' : 'text-green-500'
                                }`}
                        >
                            {user?.blacklist ? "Blacklisted" : "Not Blacklisted"}
                        </span>
                    </div>
                </div>
            </div>
            {/* Tabs Section */}
            <div className="mt-10">
                <div className=" gap-4 mb-10">
                    <button
                        onClick={() => setActiveTab('beats')}
                        className={`px-4 py-2 font-bold ${activeTab === 'beats'
                            ? 'text-white border-b-2 border-violet-500 bg-violet-600/20'
                            : 'text-gray-400'
                            }`}
                    >
                        Beats
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-4 py-2 font-bold ${activeTab === 'transactions'
                            ? 'text-white border-b-2 border-violet-500 bg-violet-600/20'
                            : 'text-gray-400'
                            }`}
                    >
                        Transactions
                    </button>
                </div>

                {activeTab === 'beats' ? (
                    <div className="overflow-x-auto md:w-full mt-4">
                        {
                            beats?.length > 0 ? (
                                <table className="min-w-full border-collapse">
                                    <thead className="border-b-2 border-gray-700 bg-slate-900 text-[#a1afc5]">
                                        <tr className="text-sm md:text-base">
                                            <th className="p-4 text-left">Image</th>
                                            <th className="p-4 text-left">Beat Name</th>
                                            <th className="p-4 text-left">Registration ID</th>
                                            <th className="p-4 text-left">Registration Date</th>
                                            <th className="p-4 text-left">View Info</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-[1px] divide-[#2d344b] text-[#a1afc5]">
                                        <BeatTable beats={beats} />
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-white text-center">No Beats Found</div>
                            )
                        }
                    </div>
                ) : (
                    <div className="overflow-x-auto mt-4 rounded-lg shadow-md">
                        {
                            transactions?.length > 0 ? (
                                <table className="min-w-full border-collapse">
                                    <thead className="border-b-2 border-gray-700 bg-slate-900 text-[#a1afc5]">
                                        <tr className="text-sm md:text-base">
                                            <th className="p-4 text-left">Transaction ID</th>
                                            <th className="p-4 text-left">User Name</th>
                                            <th className="p-4 text-left">User Email</th>
                                            <th className="p-4 text-left">Credit</th>
                                            <th className="p-4 text-left">Customer ID</th>
                                            <th className="p-4 text-left">Method</th>
                                            <th className="p-4 text-left">Amount</th>
                                            <th className="p-4 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y-[1px] divide-[#2d344b] text-[#a1afc5]">
                                        <TransactionsTable transactions={transactions} />
                                    </tbody>
                                </table>
                            ):(
                                <div className="text-white text-center">No Transactions Found</div>
                            ) 
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
