import React, { useContext } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 2xl:px-0">
                <button onClick={() => navigate('/')} className="text-2xl font-bold text-white">
                    BeatProtect
                </button>

                <div className='flex items-center space-x-6'>
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
                <div className="flex items-center space-x-4">
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
            </div>
        </nav>
    );
};

export default Navbar;