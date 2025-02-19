import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCrown, FaCog, FaSignOutAlt, } from "react-icons/fa";
import { LuCreditCard } from "react-icons/lu";
import { MdKeyboardArrowDown, MdOutlineDashboard } from "react-icons/md";
import { RiMoneyCnyCircleLine, RiMusic2Line, RiUser3Line } from "react-icons/ri";
import { Link, NavLink } from 'react-router-dom';
import ManangeSubsPopup from '../Components/ManageSubscription/ManangeSubsPopup';
import { AuthContext } from '../Provider/AuthProvider';
import fileUrl from '../Axios/fileUrl';
import axiosInstance from '../Axios/AxiosInstance';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
    const [isDropdown, setDropdown] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const dropdownRef = useRef(null);
    const { logout, user } = useContext(AuthContext)

    const toggleDropdown = () => {
        setDropdown(!isDropdown)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-[#0f0f0f] w-64 p-4 flex flex-col transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-50`}>
                <div className="relative">
                    <div onClick={toggleDropdown} className="flex items-center justify-between mb-8 border border-gray-700 bg-[#131313] p-3 rounded-md cursor-pointer">
                        <div className="flex items-center ">
                            <div className="bg-[#2f3947] w-8 h-8 rounded-md flex items-center justify-center text-sm overflow-hidden">
                                <img src={`${fileUrl}/uploads/images/${user?.avatar}`} alt="avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-3 ">
                                <p className="text-sm font-semibold">{user?.name}</p>
                                <p className="text-xs text-gray-400">Plan: {user?.active === true ? 'Standard' : 'N/A'}</p>
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
                            <div ref={dropdownRef} className="absolute space-y-5 -bottom-20 text-white bg-[#1e1e1e] p-4 w-full border border-gray-700 rounded-md animate-dropdown ">
                                <Link
                                    to="/settings?name=profile"
                                    className="flex items-center text-base text-white hover:text-white"
                                >
                                    <RiUser3Line className="mr-2" /> Edit Profile
                                </Link>
                                {
                                    user?.active === true ? <button
                                        className="flex items-center text-base text-white hover:text-white"
                                        onClick={() => setShowPopup(true)}
                                    >
                                        <LuCreditCard className="mr-2" /> Manage Subscription
                                    </button> : <NavLink
                                        to="/settings"
                                         className="flex items-center text-base text-white hover:text-white"
                                    >
                                        <FaCog className="mr-2" /> Settings
                                    </NavLink>
                                }
                            </div>
                        )
                    }
                </div>
                <nav className="space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center text-base px-4 py-2 text-white font-medium rounded hover:bg-[#191919] hover:text-[#e3e6ed] ${isActive ? 'bg-[#191919] text-[#e3e6ed]' : ''}`
                        }
                    >
                        <MdOutlineDashboard className="mr-2" /> Dashboard
                    </NavLink>
                    <NavLink
                        to="/my-beats"
                        className={({ isActive }) =>
                            `flex items-center text-base px-4 py-2 text-white font-medium rounded hover:bg-[#191919] hover:text-[#e3e6ed] ${isActive ? 'bg-[#191919] text-[#e3e6ed]' : ''}`
                        }
                    >
                        <RiMusic2Line className="mr-2" /> My Beats
                    </NavLink>
                </nav>

                <div className="mt-auto border-gray-800 flex flex-col py-2">
                    {
                        user?.active === true ||
                            new Date(user?.subscriptionEndDAte) > new Date()
                            ?
                            ''
                            :
                            <Link to='payment'>
                                <button className="primary-bg text-white w-full py-2 rounded mb-4 flex items-center justify-center">
                                    <FaCrown className=" mr-2" /> Subscribe Now
                                </button>
                            </Link>
                    }
                    {
                        user.role === 'admin' ?
                            <Link
                                to="/admin-dashboard"
                                className="flex justify-center items-center text-base hover:text-[#e3e6ed] px-4 py-2 text-white font-medium rounded bg-zinc-700 hover:bg-zinc-600 duration-300 ease-linear"
                            >
                                Admin Panel
                            </Link> :
                            ''
                    }
                    <hr className='my-2 border-zinc-700' />
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center text-base text-[#e3e6ed] hover:text-white px-4 py-2 rounded hover:bg-[#191919] ${isActive ? 'bg-[#191919] text-[#e3e6ed]' : ''}`
                        }
                    >
                        <FaCog className="mr-2" /> Settings
                    </NavLink>
                    <Link
                        onClick={logout}
                        className="flex items-center text-base text-[#e3e6ed] hover:text-white px-4 py-2 rounded hover:bg-[#191919]"
                    >
                        <FaSignOutAlt className="mr-2" /> Log Out
                    </Link>
                </div>
                <p className='text-xs text-gray-500'>
                    <Link  to='/term-of-use' className='hover:underline'>Term of Use</Link> and <Link  to='/privacy' className='hover:underline'>Privacy Policy</Link>
                </p>
            </div>
            {showPopup && <ManangeSubsPopup setShowPopup={setShowPopup} />}
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
