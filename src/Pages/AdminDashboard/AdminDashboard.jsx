import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FaHome,
    FaUsers,
    FaChartBar,
    FaCog,
    FaBars,
    FaTimes,
    FaUserCircle,
    FaSignOutAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 bg-[#212529] text-white p-2 rounded-md"
            >
                {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed md:static w-64 h-full bg-[#212529] text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="p-4 text-2xl font-bold">Admin Dashboard</div>
                <nav className="mt-6">
                    <NavLink
                        to="/admin-dashboard"
                        end  // for active route 
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-2" /> Dashboard
                    </NavLink>
                    <NavLink
                        to="users"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaUsers className="h-5 w-5 mr-2" /> Users
                    </NavLink>
                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaChartBar className="h-5 w-5 mr-2" /> Reports
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaCog className="h-5 w-5 mr-2" /> Settings
                    </NavLink>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Fixed Header */}
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

                {/* Scrollable Content Area */}
                <main className="flex-1 overflow-y-auto bg-[#1a1d21] p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
