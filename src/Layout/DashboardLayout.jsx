import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen  text-white">
            <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                <div className="flex items-center justify-between bg-[#0f0f0f] p-4 md:pl-8">
                    <button
                        className="text-white md:hidden"
                        onClick={toggleSidebar}
                    >
                        <FaBars className="text-2xl" />
                    </button>
                    <div>
                        <input type="text" className="py-1.5 px-5 w-full md:w-full  lg:w-96 rounded-full outline-none bg-transparent text-gray-200  border-[0.5px] border-violet-400 " placeholder="Search your beat..." />
                    </div>
                    <button className="flex items-center text-xs md:text-lg font-bold secondary-bg p-2 md:py-1.5 md:px-5 rounded-full hover:bg-violet-700 duration-300 active:scale-95 "><span className="hidden md:block">Register a Beat</span> <FaPlus className="md:ml-2 text-xl border p-0.5 rounded-sm " /></button>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
