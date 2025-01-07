import React from 'react';
import { FaUsers, FaUserSlash } from 'react-icons/fa';
import { HiCreditCard } from "react-icons/hi";
import { ImCreditCard } from 'react-icons/im';
import { MdOutlineCancel, MdOutlineLibraryMusic } from 'react-icons/md';

const AdminHome = () => {
    return (
        <div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <FaUsers />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Total Active Users</h4>
                        <p className="text-base font-bold mt-2">1,234</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <FaUserSlash />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Inactive Users</h4>
                        <p className="text-base font-bold mt-2">456</p>
                    </div>
                </div>

                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                    <ImCreditCard />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Extra Credits</h4>
                        <p className="text-base font-bold mt-2">320</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                    <MdOutlineCancel />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Churn Rate</h4>
                        <p className="text-base font-bold mt-2">320</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                    <MdOutlineLibraryMusic />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold">Beat Registration</h4>
                        <p className="text-base font-bold mt-2">320</p>
                    </div>
                </div>
                <div className="bg-[#212529] hover:bg-violet-800 cursor-pointer duration-300 p-4 rounded-lg shadow-lg flex items-center">
                    <div className="text-3xl text-violet-500 mr-4">
                        <HiCreditCard />
                    </div>
                    <div>

                        <h4 className="text-base font-semibold">Credit Usage</h4>
                        <p className="text-base font-bold mt-2">320</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;