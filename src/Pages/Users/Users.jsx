import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { FaUsers } from 'react-icons/fa';

const Users = () => {
    const [timeRange, setTimeRange] = useState('lastMongth');

    const { isLoading, isError, data: users = [], error, refetch } = useQuery({
        queryKey: ['userOrders', timeRange],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/allUserDetails', {
                params: {
                    timeRange,
                },
            });
            return response.data;
        },
        enabled: !!timeRange,
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8 p-4 admin-s-bg rounded-lg shadow-md ">
                <h1 className="text-3xl font-extrabold text-gray-900  ">
                    <span className="flex items-center gap-2 text-white">
                        <span className="text-violet-500"><FaUsers /></span> Users
                    </span>
                </h1>

                <div className="relative">
                    <select
                        className="block w-full py-2 px-4 pr-8 admin-p-bg border border-zinc-600 text-white text-gray-900 rounded-lg shadow-sm focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 "
                        value={timeRange}
                        onChange={(e) => {
                            setTimeRange(e.target.value);
                            refetch();
                        }}
                    >
                        <option value="">Select Time Range</option>
                        <option value="lastDay">Last Day</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="startOfMonth">Month-to-date</option>
                        <option value="last90Days">Last 90 Days</option>
                        <option value="startOfYear">Year-to-date</option>
                    </select>
                </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-300 ">
                    <thead className="text-xs text-zinc-300 uppercase admin-s-bg">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        )}
                        {isError && (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-red-500">
                                    {error?.message || 'Error fetching users'}
                                </td>
                            </tr>
                        )}
                        {!isLoading && users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    No users found for the selected time range.
                                </td>
                            </tr>
                        )}
                        {!isLoading &&
                            users.map((user, index) => (
                                <tr
                                    key={index}
                                    className="odd:bg-neutral-900  even:bg-zinc-900  border-b border-zinc-800 "
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={user?.image || '/default-avatar.png'}
                                            alt="User"
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium  ">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.country || 'N/A'}</td>
                                    <td className="px-6 py-4 space-x-2">

                                        <button className="font-medium bg-zinc-600 px-3 py-1 text-white rounded hover:bg-green-600 duration-200"> Details</button>
                                        <button className="font-medium bg-red-500  px-3 py-1 text-white rounded  hover:bg-red-600 duration-200"> + Blacklist</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
