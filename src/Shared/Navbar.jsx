import React, { useContext, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 2xl:px-0">
                <button onClick={() => navigate('/')} className="text-2xl font-bold text-white">
                    BeatProtect
                </button>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center space-x-6'>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-[#7C3AED]"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/contact-us"
                        className={({ isActive }) =>
                            isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-[#7C3AED]"
                        }
                    >
                        Contact
                    </NavLink>
                    <NavLink
                        to="/pricing"
                        className={({ isActive }) =>
                            isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-white"
                        }
                    >
                        Pricing
                    </NavLink>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    {
                        user ? (
                            <button onClick={logout} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md">Logout</button>
                        ) : (
                            <Link to="/login" className="text-gray-300 hover:text-white">
                                Sign In
                            </Link>
                        )
                    }
                    {
                        user
                            ?
                            <div>
                                <Link to="/dashboard" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md">Dashboard</Link>
                            </div>
                            :

                            <button onClick={() => navigate('/dashboard')} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md"> Get Started
                            </button>
                    }
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {!isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        ''
                    )}
                </button>

                {/* Mobile Menu Panel */}
                <div className={`fixed top-0 right-0 h-full w-64 bg-black/95 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                    <div className="flex flex-col p-6 space-y-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-[#7C3AED]"
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/contact-us"
                            className={({ isActive }) =>
                                isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-[#7C3AED]"
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </NavLink>
                        <NavLink
                            to="/pricing"
                            className={({ isActive }) =>
                                isActive ? "text-[#7C3AED] font-medium" : "text-gray-300 hover:text-[#7C3AED]"
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </NavLink>
                        {user ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-300 hover:text-[#7C3AED]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-gray-300 hover:text-[#7C3AED]"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-[#7C3AED]"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <button
                                    onClick={() => {
                                        navigate('/dashboard');
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-gray-300 hover:text-[#7C3AED]"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;