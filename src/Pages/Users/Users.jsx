import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import axiosInstance from "../../Axios/AxiosInstance";
import fileUrl from "../../Axios/fileUrl";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Users = () => {
  const [timeframe, setTimeframe] = useState("lastMonth");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 100;

  const {
    isLoading,
    isError,
    data: users = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", timeframe],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/user-registrations", {
        params: { timeframe },
      });
      return response.data.users;
    },
    enabled: !!timeframe,
  });

  const handleBlock = async (userId) => {
    try {
      const response = await axiosInstance.delete(`/admin/user-blacklist/${userId}`);
      if (response.data.message === "User added to blacklist successfully") {
        toast.success("User blocked successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const response = await axiosInstance.get(`/admin/user-remove-blacklist/${userId}`);
      if (response.data.message === "User removed from blacklist successfully") {
        toast.success("User unblocked successfully");
        refetch();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to unblock user");
    }
  };

  const handleActionClick = (user) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedUser) return;
    
    if (selectedUser.blacklist) {
      await handleUnblock(selectedUser._id);
    } else {
      await handleBlock(selectedUser._id);
    }
    
    setShowConfirmDialog(false);
    setSelectedUser(null);
  };

  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const paginatedUsers = users.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-[#212529] rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          <span className="flex items-center gap-2 text-white">
            <span className="text-violet-500">
              <FaUsers />
            </span>
            Users
          </span>
        </h1>

        <select
          className="block w-full md:w-auto min-w-[200px] py-2 px-4 bg-[#1a1d21] border border-zinc-600 text-white rounded-lg"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="lastDay">Last Day</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="last90Days">Last 90 Days</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-[#212529]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                Image
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-[#1a1d21]">
            {isError && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-red-500">
                  {error?.message || "Error fetching users"}
                </td>
              </tr>
            )}
            {!isLoading && paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-white">
                  No users found for the selected time range.
                </td>
              </tr>
            )}
            {paginatedUsers.map((user) => (
              <tr key={user._id} className="hover:bg-zinc-800 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  {user.avatar ? (
                    <img
                      src={`${fileUrl}/uploads/images/${user.avatar}`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center text-xl text-violet-600 font-bold">
                      {user?.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-white">
                  {user.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    user.blacklist 
                      ? 'bg-red-500/20 text-red-500' 
                      : 'bg-blue-500/20 text-blue-500'
                  }`}>
                    {user.blacklist ? 'Blocked' : 'Allowed'}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap space-x-2">

                  <Link
                    to={`${user._id}`}
                    className="px-3 py-1 text-sm bg-zinc-600 text-white rounded hover:bg-zinc-700 transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleActionClick(user)}
                    className={`px-3 py-1 text-sm ${
                      user.blacklist
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white rounded transition-colors`}
                  >
                    {user.blacklist ? 'Unblock' : 'Add Blacklist'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="←"
          nextLabel="→"
          breakLabel="..."
          pageCount={Math.ceil(users.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex justify-end mt-4 space-x-4"
          activeClassName="font-bold bg-violet-600/20"
          pageClassName="px-3 py-1 border border-zinc-600 rounded text-white"
          previousClassName="px-3 py-1 border border-zinc-600 rounded text-white"
          nextClassName="px-3 py-1 border border-zinc-600 rounded text-white"
          breakClassName="px-3 py-1 text-zinc-400"
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-lg bg-[#212529] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Confirm {selectedUser?.blacklist ? 'Unblock' : 'Block'} User
                </h3>
                <p className="text-zinc-300 mb-6">
                  Are you sure you want to {selectedUser?.blacklist ? 'unblock' : 'block'} {selectedUser?.name}?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 bg-zinc-600 text-white rounded hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className={`px-4 py-2 ${
                      selectedUser?.blacklist
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white rounded transition-colors`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;