import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import fileUrl from '../../Axios/fileUrl';

const UserDetails = () => {
    const { id } = useParams();
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['userDetails', id],
        queryFn: async () => {
            const response = await axiosInstance.get(`/users/oneUserDetails/${id}`);
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-red-500 text-lg">Error: {error.message}</p>
            </div>
        );
    }
    const { user } = data;

    return (
        <div className="">
            <div className="bg-[#212529] shadow-lg rounded-lg p-6 w-full ">
                <div className=" space-y-4">
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
                <div className="mt-6">
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
            <div>
                table will be here
            </div>
        </div>
    );
};

export default UserDetails;
