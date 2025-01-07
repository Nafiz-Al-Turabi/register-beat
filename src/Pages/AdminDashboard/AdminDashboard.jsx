import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaUsers, FaChartBar, FaCog, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaUserSlash, } from 'react-icons/fa';
import AdminHome from '../AdminHome/AdminHome';

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <>
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden fixed top-4 left-4 z-50  bg-[#212529] text-white p-2 rounded-md"
                >
                    {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </button>

                <div
                    className={`fixed top-0 left-0 h-screen w-64 bg-[#212529] text-white md:flex flex-col md:static ${isOpen ? 'flex' : 'hidden'
                        }`}
                >
                    <div className="p-4 text-2xl font-bold ">Admin Dashboard</div>
                    <nav className="mt-6 flex-1">
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <FaHome className="h-5 w-5 mr-2" /> Dashboard
                        </NavLink>
                        <NavLink
                            to="users"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <FaUsers className="h-5 w-5 mr-2" /> Users
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <FaChartBar className="h-5 w-5 mr-2" /> Reports
                        </NavLink>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`
                            }
                        >
                            <FaCog className="h-5 w-5 mr-2" /> Settings
                        </NavLink>
                    </nav>
                </div>
            </>

            {/* Main Content */}
            <div className="flex-1 min-h-screen  bg-[#1a1d21]">
                {/* Header */}
                <header className="bg-[#212529] shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold flex text-white items-center gap-2">
                        <FaUserCircle className="h-6 w-6 text-gray-100" />
                        Welcome, Admin
                    </h1>
                    <div className="flex items-center">
                        <button className="bg-violet-500 hover:bg-violet-700 duration-300 flex items-center gap-2 text-white px-4 py-2 rounded-md">
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </header>

                <div className="p-6 ">

                    <div className="mt-6">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
