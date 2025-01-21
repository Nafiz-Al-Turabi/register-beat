import React, { useState } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Shared/Sidebar";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-beat?query=${encodeURIComponent(searchQuery)}`);
        }
    };
    return (
        <div className="md:flex min-h-screen  text-white">
            <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            {/* Main Content */}
            <div className="flex-1 lg:ml-64 lg:z-50 ">
                <div className="flex items-center justify-between gap-4 bg-[#0f0f0f] px-4 md:px-12 py-4 md:pl-8 sticky top-0">
                    <div className="flex items-center gap-5 md:pl-4">
                        <button
                            className="text-white lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <FaBars className="text-2xl" />
                        </button>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="py-1.5 px-5 w-40 md:w-80 lg:w-96 rounded-full outline-none bg-transparent text-zinc-200 border border-gray-700 focus:border-gray-500 placeholder:text-xs md:placeholder:text-base"
                                placeholder="Search your beat..."
                            />
                        </form>
                    </div>
                    <Link to="/register-beat" className="flex items-center text-xs md:text-lg font-bold text-center secondary-bg p-2 md:py-1.5 md:px-5 rounded-full hover:bg-violet-700 duration-300 active:scale-95 ">Register a Beat
                    </Link>
                </div>

                {/* Content Section */}
                <div className="max-w-full mx-4 md:mx-12 py-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
