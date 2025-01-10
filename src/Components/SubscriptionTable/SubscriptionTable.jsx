import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const SubscriptionTable = () => {
    // Sample data - replace with your actual data
    const ordersData = [
        {
            id: 'ORD.00925',
            customer: {
                name: 'Carl Wells',
                role: 'Product Designer'
            },
            status: 'Completed',
            profit: 17,
            created: '17 min ago',
            value: 1580.18,
            type: 'Premium'
        },
        {
            id: 'ORD.00924',
            customer: {
                name: 'Jack Estrada',
                role: 'Photographer'
            },
            status: 'Active',
            profit: 22,
            created: '27 min ago',
            value: 2090.92,
            type: 'Premium'
        },
        // Add more sample data...
    ];

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 7;

    // Calculate page data
    const pageCount = Math.ceil(ordersData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = ordersData.slice(offset, offset + itemsPerPage);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-700';
            case 'active':
                return 'bg-sky-100 text-sky-700';
            case 'pending':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="w-full bg-[#1a1f24] p-6 mt-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold uppercase text-white">recent Subscription</h2>
               
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr className="text-gray-400 text-sm">
                            <th className="px-6 py-3 text-left">ORDER ID</th>
                            <th className="px-6 py-3 text-left">CUSTOMER</th>
                            <th className="px-6 py-3 text-left">STATUS</th>
                            <th className="px-6 py-3 text-left">PROFIT</th>
                            <th className="px-6 py-3 text-left">CREATED</th>
                            <th className="px-6 py-3 text-right">VALUE</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {currentPageData.map((order) => (
                            <tr key={order.id} className="hover:bg-[#242a31]">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-blue-400">{order.id}</div>
                                        <div className="text-sm text-gray-400">{order.type}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-white">{order.customer.name}</div>
                                        <div className="text-sm text-gray-400">{order.customer.role}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500"
                                                style={{ width: `${order.profit}%` }}
                                            />
                                        </div>
                                        <span className="text-white">{order.profit}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-400">
                                    {order.created}
                                </td>
                                <td className="px-6 py-4 text-right text-white">
                                    ${order.value.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <ReactPaginate
                    previousLabel="Prev"
                    nextLabel="Next"
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    containerClassName="flex justify-center gap-2"
                    previousClassName="px-3 py-1 bg-[#7e31f8] text-white rounded hover:bg-[#2a3138]"
                    nextClassName="px-3 py-1 bg-[#7e31f8] text-white rounded hover:bg-[#2a3138]"
                    pageClassName="px-3 py-1 bg-[#7e31f8] text-white rounded hover:bg-[#2a3138]"
                    activeClassName="!bg-blue-500"
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            </div>
        </div>
    );

};

export default SubscriptionTable;