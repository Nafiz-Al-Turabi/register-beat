import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
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
                <div className="flex items-center justify-between bg-black p-4 md:pl-8">
                    <button
                        className="text-white md:hidden"
                        onClick={toggleSidebar}  
                    >
                        <FaBars className="text-2xl" />
                    </button>
                    <h1 className="text-purple-500 text-2xl">Dashboard</h1>
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
