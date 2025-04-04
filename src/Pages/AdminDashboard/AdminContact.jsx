import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../Axios/AxiosInstance";

const AdminContact = () => {
  const [timeframe, setTimeframe] = useState("lastMonth");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    isLoading,
    isError,
    data: supportRequests = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["supportRequests", timeframe],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/support/getAllSupportRequests",
        {
          params: { timeframe },
        }
      );
      return response.data;
    },
    enabled: !!timeframe,
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-[#212529] rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">
          Admin Contact Requests
        </h1>
        <div className="w-full md:w-auto min-w-[200px]">
          <select
            className="block w-full py-2 px-4 bg-[#1a1d21] border border-zinc-600 text-white rounded-lg"
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

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-[#212529]">
            <tr>
              {["Name", "Email", "Issue", "Created At"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-zinc-300 uppercase"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-[#1a1d21]">
            {isLoading && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-white">
                  Loading...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-red-500">
                  {error?.message || "Error fetching support requests"}
                </td>
              </tr>
            )}
            {!isLoading && supportRequests.length === 0 && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-white">
                  No support requests found.
                </td>
              </tr>
            )}
            {!isLoading &&
              supportRequests.map((request, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedRequest(request)}
                  className="hover:bg-zinc-800 even:bg-[#212529] transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-white">
                    {request.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                    {request.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                    {request.issue.length > 50
                      ? request.issue.slice(0, 50) + "..."
                      : request.issue}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-zinc-300">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
          onClick={() => setSelectedRequest(null)}
        >
          <div
            className="bg-[#1a1d21] w-full max-w-xl mx-4 p-6 rounded-xl shadow-xl text-white transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Request Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-white text-2xl leading-none hover:text-red-400"
              >
                &times;
              </button>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {selectedRequest.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {selectedRequest.email}
              </p>
              <div>
                <p className="font-semibold mb-1">Issue:</p>
                <p className="text-zinc-300 text-sm">{selectedRequest.issue}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContact;
