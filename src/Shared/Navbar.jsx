import React, { useContext, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { IoIosClose, IoIosLogOut } from 'react-icons/io';
import logo from '../assets/logo.png';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Add click outside handler and scroll lock
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById('mobile-menu');
            const menuButton = document.getElementById('menu-button');

            if (isMenuOpen && mobileMenu && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Handle scroll locking
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Cleanup scroll lock on unmount
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 2xl:px-0">
                <button onClick={() => navigate('/')} className="text-2xl font-bold text-white">
                    <img src={logo} alt="" className='w-44' />
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
                            <button onClick={logout} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-1 rounded-md">Logout</button>
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
                    id="menu-button"
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {!isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        ""
                    )}
                </button>

                {/* Mobile Menu Panel */}
                <div
                    id="mobile-menu"
                    className={`fixed top-0 right-0 h-full w-full bg-black transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
                >
                    <div className="flex flex-col justify-between h-full p-4  ">
                        <div className='flex items-center justify-between'>
                            <a href="/" className='text-2xl font-bold text-white'> <img src={logo} alt="" className='w-44' /></a>
                            <button className='border border-[#7C3AED] rounded-md p-1' onClick={() => setIsMenuOpen(false)}>
                                <IoIosClose className='text-white w-6 h-6  ' />
                            </button>
                        </div>
                        <div className='flex flex-col items-center space-y-10 -mt-80'>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "text-[#7C3AED] text-4xl font-medium" : "text-4xl text-gray-300 hover:text-[#7C3AED]"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/contact-us"
                                className={({ isActive }) =>
                                    isActive ? "text-[#7C3AED] text-4xl font-medium" : "text-4xl text-gray-300 hover:text-[#7C3AED]"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                            <NavLink
                                to="/pricing"
                                className={({ isActive }) =>
                                    isActive ? "text-[#7C3AED] text-4xl font-medium" : "text-4xl text-gray-300 hover:text-[#7C3AED]"
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </NavLink>
                        </div>
                        <div className='grid grid-cols-4 gap-4'>
                            {user ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        className="col-span-3 text-gray-300 hover:text-[#7C3AED] bg-[#7C3AED] px-4 py-2 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className=" flex items-center justify-center text-gray-300 hover:text-[#7C3AED] bg-[#7C3AED] px-4 py-2 rounded-md"
                                    >
                                        <IoIosLogOut className='text-white w-6 h-6' />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="col-span-2 text-center text-gray-300 hover:text-[#7C3AED] bg-[#7C3AED] px-4 py-2 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <button
                                        onClick={() => {
                                            navigate('/dashboard');
                                            setIsMenuOpen(false);
                                        }}
                                        className="col-span-2 text-gray-300 hover:text-[#7C3AED] bg-[#7C3AED] px-4 py-2 rounded-md"
                                    >
                                        Get Started
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;