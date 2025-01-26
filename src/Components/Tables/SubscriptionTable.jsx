import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import axiosInstance from '../../Axios/AxiosInstance';
import Loading from '../Loading/Loading';

const SubscriptionTable = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 40;

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['transactions'],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/AllTransections');
            console.log("Hello from Admin Home", response.data.data);
            return response.data;
        },
    });

    const transactions = data?.data || [];
    const pageCount = Math.ceil(transactions.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = transactions.slice(offset, offset + itemsPerPage);

    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full bg-[#212529] p-6 mt-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold uppercase text-white">recent Subscription</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="text-gray-400 text-sm">
                            <th className="px-6 py-3 text-left">CUSTOMER</th>
                            <th className="px-6 py-3 text-left">Customer Id</th>
                            <th className="px-6 py-3 text-left">User Email</th>
                            <th className="px-6 py-3 text-left">Amount</th>
                            <th className="px-6 py-3 text-left">Credit</th>
                        </tr>
                    </thead>
                    {
                        currentItems.length > 0 ? <tbody className="divide-y divide-gray-700">
                            {currentItems?.map((transaction) => (
                                <tr key={transaction?._id} className="hover:bg-[#252431] even:bg-[#242a31] odd:bg-[#212529]">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="text-violet-600">{transaction?.userNAme}</div>
                                            <div className="text-sm text-gray-400">{transaction?.userId}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction?.customerId}
                                    </td>
                                    <td className="px-6 py-4">
                                        {transaction?.userEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${transaction?.amount}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {transaction?.credit}
                                    </td>
                                </tr>
                            ))}
                        </tbody> : 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                                    No recent subscriptions found
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="flex justify-end">
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
                            previousClassName={
                                "px-3 py-1 border border-zinc-600 rounded text-white"
                            }
                            nextClassName={"px-3 py-1 border border-zinc-600 rounded text-white"}
                            breakClassName={"px-3 py-1 text-zinc-400"}
                        />)
                }
            </div>
        </div >
    );
};

export default SubscriptionTable;
