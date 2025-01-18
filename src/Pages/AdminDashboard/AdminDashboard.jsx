import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { RiContactsLine } from "react-icons/ri";
import {
    FaHome,
    FaUsers,
    FaCog,
    FaBars,
    FaTimes,
    FaUserCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import { AuthContext } from '../../Provider/AuthProvider';
import { AiOutlineTransaction } from "react-icons/ai";

const AdminDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    const { user, logout } = useContext(AuthContext)

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


            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed md:static w-64 h-full bg-[#212529] text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="py-5 ml-16 text-lg font-bold">Admin Dashboard</div>
                <nav className="mt-6 space-y-4 px-4">
                    <NavLink
                        onClick={() => setIsOpen(!isOpen)}
                        to="/admin-dashboard"
                        end  // for active route 
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 rounded-md duration-300 ease-in-out ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaHome className="h-5 w-5 mr-2" /> Dashboard
                    </NavLink>
                    <NavLink
                        onClick={() => setIsOpen(!isOpen)}
                        to="users"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 rounded-md duration-300 ease-in-out ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <FaUsers className="h-5 w-5 mr-2" /> Users
                    </NavLink>
                    <NavLink
                        onClick={() => setIsOpen(!isOpen)}
                        to="transections"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 rounded-md duration-300 ease-in-out ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <AiOutlineTransaction className="h-5 w-5 mr-2" /> Transections
                    </NavLink>
                    <NavLink
                        onClick={() => setIsOpen(!isOpen)}
                        to="allcontact"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 rounded-md duration-300 ease-in-out ${isActive ? 'bg-violet-700' : ''}`
                        }
                    >
                        <RiContactsLine className="h-5 w-5 mr-2" /> All Contact
                    </NavLink>
                    <NavLink
                        onClick={() => setIsOpen(!isOpen)}
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 hover:bg-violet-400 rounded-md duration-300 ease-in-out ${isActive ? 'bg-violet-700' : ''}`
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
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden  top-4 left-4 z-50 bg-[#212529] text-white p-2 rounded-md"
                    >
                        {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                    </button>
                    <h1 className="text-xl font-semibold flex text-white items-center gap-2">
                        <FaUserCircle className="h-6 w-6 text-gray-100" />
                        <span className='text-xs'>Welcome, {user?.name}</span>
                    </h1>
                    <div className="flex items-center">
                        <button onClick={logout} className="bg-violet-500 hover:bg-violet-700 duration-300 flex items-center gap-2 text-white px-4 py-2 rounded-md">
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
