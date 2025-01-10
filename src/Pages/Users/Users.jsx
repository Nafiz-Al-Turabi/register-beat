import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { FaUsers } from 'react-icons/fa';
import fileUrl from '../../Axios/fileUrl';

const Users = () => {
    const [timeframe, setTimeframe] = useState('lastMonth');

    const { isLoading, isError, data: users = [], error, refetch } = useQuery({
        queryKey: ['users', timeframe],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/user-registrations', {
                params: {
                    timeframe,
                },
            });
            return response.data.users;

        },
        enabled: !!timeframe,
    });

    return (
        <div className="relative z-0 w-full"> 
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-[#212529] rounded-lg shadow-md">
                <h1 className="text-2xl md:text-3xl font-extrabold">
                    <span className="flex items-center gap-2 text-white">
                        <span className="text-violet-500"><FaUsers /></span> Users
                    </span>
                </h1>

                <div className="w-full md:w-auto min-w-[200px]">
                    <select
                        className="block w-full py-2 px-4 bg-[#1a1d21] border border-zinc-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                        value={timeframe}
                        onChange={(e) => {
                            setTimeframe(e.target.value);
                            refetch();
                        }}
                    >
                        <option value="">Select Time Range</option>
                        <option value="lastDay">Last Day</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="startOfMonth">Month-to-date</option>
                        <option value="last90Days">Last 90 Days</option>
                        <option value="startofYear">Year-to-date</option>
                    </select>
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg shadow-md">
                <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-zinc-800">
                            <thead className="bg-[#212529]">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                        Image
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                        Country
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800 bg-[#1a1d21]">
                                {isLoading && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-white">
                                            Loading...
                                        </td>
                                    </tr>
                                )}
                                {isError && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-red-500">
                                            {error?.message || 'Error fetching users'}
                                        </td>
                                    </tr>
                                )}
                                {!isLoading && users.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-white">
                                            No users found for the selected time range.
                                        </td>
                                    </tr>
                                )}
                                {!isLoading && users.map((user, index) => (
                                    <tr key={index} className="hover:bg-zinc-800 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            {(user.avatar === null || user.avatar === undefined) ? (
                                                <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-xl text-violet-600 font-bold">
                                                    {user?.name?.[0]?.toUpperCase()}
                                                </div>
                                            ) : (
                                                <img
                                                    src={`${fileUrl}/uploads/images/${user?.avatar}`}
                                                    alt="avatar"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-white">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                                            {user.country || 'N/A'}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap space-x-2">
                                            <button className="px-3 py-1 text-sm bg-zinc-600 text-white rounded hover:bg-green-600 transition-colors duration-200">
                                                Details
                                            </button>
                                            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200">
                                                + Blacklist
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
