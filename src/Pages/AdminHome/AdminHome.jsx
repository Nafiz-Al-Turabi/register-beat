import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUsers, FaUserSlash } from 'react-icons/fa';
import { HiCreditCard } from "react-icons/hi";
import { ImCreditCard } from 'react-icons/im';
import { MdOutlineCancel, MdOutlineLibraryMusic } from 'react-icons/md';
import axiosInstance from '../../Axios/AxiosInstance';
import Loading from '../../Components/Loading/Loading';
import Charts from '../../Components/Charts/Charts';
import SubscriptionTable from '../../Components/SubscriptionTable/SubscriptionTable';
import RevenueChart from '../../Components/Charts/RevenueChart';

const AdminHome = () => {
    const { isLoading, isError, data: admin = {}, error, refetch } = useQuery({
        queryKey: ['adminDashboard'],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/adminDashboard');
            console.log(response.data);
            return response.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }

    // Calculate churn rate from cancellation percentages if available
    const currentChurnRate = admin?.data?.cancellationPercentages?.[0]?.percentage || '0';

    return (
        <div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <FaUsers />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Total Active Users</h4>
                        <p className="text-base font-bold mt-2">{admin?.data?.totalActiveUsers || 0}</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <FaUserSlash />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Inactive Users</h4>
                        <p className="text-base font-bold mt-2">{admin?.data?.totalInactiveUsers || 0}</p>
                    </div>
                </div>

                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <ImCreditCard />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Extra Credits</h4>
                        <p className="text-base font-bold mt-2">{admin?.data?.totalExtraCredit || 0}</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <MdOutlineCancel />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Churn Rate</h4>
                        <p className="text-base font-bold mt-2">{currentChurnRate}%</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <MdOutlineLibraryMusic />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Beat Registration</h4>
                        <p className="text-base font-bold mt-2">{admin?.data?.totalRegisteredBeats || 0}</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <HiCreditCard />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Credit Usage</h4>
                        <p className="text-base font-bold mt-2">{admin?.data?.totalSubscriptionCredit || 0}</p>
                    </div>
                </div>
            </div>
            {/* <Charts /> */}
            <RevenueChart/>
            <SubscriptionTable />
        </div>
    );
};

export default AdminHome;