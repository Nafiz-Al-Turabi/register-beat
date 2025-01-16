import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import fileUrl from '../../Axios/fileUrl';

import BeatTable from '../../Components/Tables/BeatTable';
import TransactionsTable from '../../Components/Tables/TransactionsTable';

const UserDetails = () => {
    const { id } = useParams();
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['userDetails', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/oneUserDetails/${id}`);
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
                Error: {error?.message || usersErrorDetails?.message || 'Something went wrong'}
            </div>
        );
    }
    const { user } = data;
    

    return (
        <div className="">
            <div className="lg:flex items-center gap-5 bg-[#212529] shadow-lg rounded-lg p-6 w-full ">
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
                <div className="mt-6 lg:w-full">
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
                            {user?.subscriptionEndDate
                                ? new Date(user.subscriptionEndDate).toLocaleDateString()
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
            <div className='flex gap-4 mt-4' >
                <div className='className="overflow-x-auto  md:w-full"'>
                    <table className="min-w-full border-collapse">
                        <thead className="border-b-2  border-gray-700 text-[#a1afc5]">
                            <tr className="text-sm md:text-base">
                                <th className="p-4 text-left">Image</th>
                                <th className="p-4 text-left">Beat Name</th>
                                <th className="p-4 text-left">Registration ID</th>
                                <th className="p-4 text-left">Registration Date</th>
                                {/* <th className="p-4 text-left">Total Madatches</th> */}
                                <th className="p-4 text-left">View Info</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[1px] divide-[#2d344b] text-[#a1afc5]">
                            <BeatTable beats={beats} />
                        </tbody>
                    </table>
                </div>
                <div className='w-1/2 bg-red-500'>
                    <table className="min-w-full divide-y divide-zinc-800">
                        <thead className="bg-[#212529]">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    User Name
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Credit
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Customer ID
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Method
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Amount
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                    Created At
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800 bg-[#1a1d21]">
                           <TransactionsTable transactions={transactions}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
