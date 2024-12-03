import React, { useState } from 'react'
import { FaCrown, FaPlus, FaMusic, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GrLineChart } from "react-icons/gr";
import { LuCreditCard } from "react-icons/lu";
import { MdKeyboardArrowDown, MdOutlineDashboard } from "react-icons/md";
import { RiMusic2Line, RiUser3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
    const [isDropdown, setDropdown] = useState(false)
    const toggleDropdown = () => {
        setDropdown(!isDropdown)
    }
  return (
    <div>
        {/* Sidebar */}
        <div
                className={`fixed top-0 left-0 h-full bg-[#0f0f0f] w-64 p-4 flex flex-col transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 z-50`}
            >
                <div className="relative">
                    <div onClick={toggleDropdown} className="flex items-center justify-between mb-8 border border-gray-700 bg-[#1e1e1e] p-3 rounded-md cursor-pointer">
                        <div className="flex items-center ">
                            <div className="bg-gray-800 w-10 h-10 rounded-md flex items-center justify-center text-xl">
                                US
                            </div>
                            <div className="ml-3 ">
                                <p className="text-sm">Usuario</p>
                                <p className="text-xs text-gray-400">Plan Básico</p>
                            </div>
                        </div>
                        <span
                            className={`transform transition-transform duration-300 ${isDropdown ? "rotate-180" : "rotate-0"
                                }`}
                        >
                            <MdKeyboardArrowDown className="text-2xl" />
                        </span>
                    </div>
                    {
                        isDropdown && (
                            <div className="absolute space-y-5 -bottom-32 text-white bg-[#1e1e1e] p-4 w-full border border-gray-700 rounded-md animate-dropdown ">
                                <Link
                                    to="/dashboard"
                                    className="flex items-center text-base text-gray-300 hover:text-white"
                                >
                                    <RiUser3Line className="mr-2" /> Edit Profile
                                </Link>
                                <Link
                                    to="/dashboard"
                                    className="flex items-center text-base text-gray-300 hover:text-white"
                                >
                                    <LuCreditCard className="mr-2" /> Manage Subscription
                                </Link>
                                <Link
                                    to="/upgrade"
                                    className="flex items-center text-base text-gray-300 hover:text-white"
                                >
                                    <GrLineChart className="mr-2" /> Upgrade you Plan
                                </Link>
                            </div>
                        )
                    }
                </div>
                <nav className="space-y-6">
                    <Link
                        to="/"
                        className="flex items-center text-lg text-gray-300 hover:text-white"
                    >
                        <MdOutlineDashboard className="mr-2" /> Dashboard
                    </Link>
                    <Link
                        to="/dashboard/my-beats"
                        className="flex items-center text-lg text-gray-300 hover:text-white"
                    >
                        <RiMusic2Line className="mr-2" /> My Beats
                    </Link>
                    <Link
                        to="/dashboard/song-matches"
                        className="flex items-center text-lg text-gray-300 hover:text-white"
                    >
                        <FaHeadphonesSimple className="mr-2" />Song Matches
                    </Link>
                </nav>
                <div className="mt-auto">
                    <button className="bg-purple-500 text-white w-full py-2 rounded mb-4">
                        <FaCrown className="inline-block mr-2" /> Upgrade to Pro
                    </button>
                    <Link
                        to="/settings"
                        className="flex items-center text-lg text-gray-300 hover:text-white mb-2"
                    >
                        <FaCog className="mr-2" /> Settings
                    </Link>
                    <Link
                        to="/"
                        className="flex items-center text-lg text-gray-300 hover:text-white"
                    >
                        <FaSignOutAlt className="mr-2" /> Log Out
                    </Link>
                </div>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 lg:hidden z-40"
                    onClick={toggleSidebar}
                ></div>
            )}
    </div>
  )
}

export default Sidebar
