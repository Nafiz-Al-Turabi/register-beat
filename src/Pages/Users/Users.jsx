import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import axiosInstance from '../../Axios/AxiosInstance';
import { FaUsers } from 'react-icons/fa';
import fileUrl from '../../Axios/fileUrl';

const Users = () => {
    const [timeframe, setTimeframe] = useState('lastMonth');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [blacklistedUsers, setBlacklistedUsers] = useState(new Set());

    const { isLoading, isError, data: users = [], error, refetch } = useQuery({
        queryKey: ['users', timeframe],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/users', {
                params: {
                    timeframe,
                },
            });
            return response.data.users;
        },
        enabled: !!timeframe,
    });

    const handleBlacklist = async (userId) => {
        try {
            const response = await axiosInstance.post(`/admin/user-blacklist/${userId}`);
            if (response.data.message === "User added to blacklist successfully") {
                setBlacklistedUsers((prevSet) => new Set(prevSet.add(userId)));
                refetch();
            } else {
                alert("Failed to blacklist user.");
            }
        } catch (error) {
            console.error("Error blacklisting user:", error);
            alert("Error blacklisting user.");
        }
    };

    const isUserBlacklisted = (userId) => {
        return blacklistedUsers.has(userId);
    };

    // Handle click on blacklist button
    const handleBlacklistClick = (user) => {
        setSelectedUser(user);
        setShowConfirmDialog(true);
    };

    // Confirm the blacklisting action
    const confirmBlacklist = async () => {
        if (!selectedUser) return;
        await handleBlacklist(selectedUser.id);
        setShowConfirmDialog(false);
    };

    return (
        <div>
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
                            <tbody className="divide-y  divide-zinc-800 bg-[#1a1d21]">
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
                                    <tr key={index} className="hover:bg-zinc-800 even:bg-[#212529] transition-colors">
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
                                            <button
                                                onClick={() => handleBlacklistClick(user)}
                                                // disabled={user.blacklist}
                                                disabled={isUserBlacklisted(user._id)}
                                                className={`px-3 py-1 text-sm ${user.blacklist
                                                    ? 'bg-zinc-400 cursor-not-allowed'
                                                    : 'bg-red-500 hover:bg-red-600'
                                                    } text-white rounded transition-colors duration-200`}
                                            >
                                                {user.blacklist ? 'Blacklisted' : '+ Blacklist'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-[#212529] rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold text-white mb-4">Confirm Blacklist</h3>
                        <p className="text-zinc-300 mb-6">
                            Are you sure you want to blacklist {selectedUser?.name}? This action will restrict their access to the platform.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmDialog(false)}
                                className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBlacklist}
                                disabled={false}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
