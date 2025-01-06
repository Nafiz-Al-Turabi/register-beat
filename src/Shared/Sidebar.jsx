import React, { useContext, useState } from 'react'
import { FaCrown, FaPlus, FaMusic, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { GrLineChart } from "react-icons/gr";
import { LuCreditCard } from "react-icons/lu";
import { MdKeyboardArrowDown, MdOutlineDashboard } from "react-icons/md";
import { RiMusic2Line, RiUser3Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import ManangeSubsPopup from '../Components/ManageSubscription/ManangeSubsPopup';
import { AuthContext } from '../Provider/AuthProvider';

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
    const [isDropdown, setDropdown] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { logout, user } = useContext(AuthContext)
    console.log(user);

    const toggleDropdown = () => {
        setDropdown(!isDropdown)
    }

    return (
        <div>
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full bg-[#0f0f0f] w-64 p-4 flex flex-col transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-50`}>
                <div className="relative">
                    <div onClick={toggleDropdown} className="flex items-center justify-between mb-8 border border-gray-700 bg-[#0f0f0f] p-3 rounded-md cursor-pointer">
                        <div className="flex items-center ">
                            <div className="bg-[#2f3947] w-8 h-8 rounded-md flex items-center justify-center text-sm">
                                <img src={`http://localhost:3001/uploads/images/${user?.avatar}`} alt="" />
                            </div>
                            <div className="ml-3 ">
                                <p className="text-sm font-semibold">{user?.name}</p>
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
                            <div className="absolute space-y-5 -bottom-20 text-white bg-[#1e1e1e] p-4 w-full border border-gray-700 rounded-md animate-dropdown ">
                                <Link
                                    to="/settings?name=profile"
                                    className="flex items-center text-base text-white hover:text-white"
                                >
                                    <RiUser3Line className="mr-2" /> Edit Profile
                                </Link>
                                <button
                                    className="flex items-center text-base text-white hover:text-white"
                                    onClick={() => setShowPopup(true)}
                                >
                                    <LuCreditCard className="mr-2" /> Manage Subscription
                                </button>
                                {/* <Link
                                    to="/upgrade"
                                    className="flex items-center text-base text-white hover:text-white"
                                >
                                    <GrLineChart className="mr-2" /> Upgrade you Plan
                                </Link> */}
                            </div>
                        )
                    }
                </div>
                <nav className="space-y-2">
                    <Link
                        to="/"
                        className="flex items-center text-base hover:text-[#e3e6ed] px-4 py-2 text-white font-medium rounded hover:bg-[#191919]"
                    >
                        <MdOutlineDashboard className="mr-2" /> Dashboard
                    </Link>
                    <Link
                        to="/my-beats"
                        className="flex items-center text-base hover:text-[#e3e6ed] px-4 py-2 text-white font-medium rounded hover:bg-[#191919]"
                    >
                        <RiMusic2Line className="mr-2" /> My Beats
                    </Link>
                    {/* <Link
                        to="/song-matches"
                        className="flex items-center text-lg text-gray-300 hover:text-white"
                    >
                        <FaHeadphonesSimple className="mr-2" />Song Matches
                    </Link> */}
                </nav>
                <div className="mt-auto border-t border-gray-800 flex flex-col py-2">
                    <Link to = 'payment'>
                        <button className="bg-purple-500 text-white w-full py-2 rounded mb-4 flex items-center justify-center">
                            <FaCrown className=" mr-2" /> Subscribe Now
                        </button>
                    </Link>
                    <Link
                        to="/settings"
                        className="flex items-center text-base text-[#e3e6ed] hover:text-white px-4 py-2 rounded hover:bg-[#191919]"
                    >
                        <FaCog className="mr-2" /> Settings
                    </Link>
                    <Link
                        // to="/login"
                        onClick={logout}
                        className="flex items-center text-base text-[#e3e6ed] hover:text-white px-4 py-2 rounded hover:bg-[#191919]"
                    >
                        <FaSignOutAlt className="mr-2" /> Log Out
                    </Link>
                </div>
                <p className='text-xs text-gray-500'>
                    <Link to='/terms' className='hover:underline'>Term of Use</Link> and <Link to='/privacy' className='hover:underline'>Privacy Policy</Link>
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
