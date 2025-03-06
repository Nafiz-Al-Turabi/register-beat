import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuInstagram, LuTwitter } from 'react-icons/lu';
import { FaTiktok } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='px-4 xl:px-0'>
            <footer className="bg-black border-t border-gray-800">
                <div className="container mx-auto py-12 md:py-16 lg:py-20">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Column 1: Logo and Description */}
                        <div className="space-y-6">
                            <Link href="/" className="text-2xl font-bold text-white">
                                <img src={logo} alt="" className='w-44' />
                            </Link>
                            <p className="text-gray-400 text-sm max-w-[400px]">
                                BeatProtect is your trusted partner in music protection. We provide cutting-edge blockchain technology
                                and legal tools to secure your musical creations, ensuring your rights are protected worldwide.
                            </p>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="grid gap-8">
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold">Menu</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <button onClick={() => navigate('/pricing')} className="text-gray-400 hover:text-white text-sm">
                                            Pricing
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('/contact-us')} className="text-gray-400 hover:text-white text-sm">
                                            Contact Us
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Social Media */}
                        <div className="space-y-4">
                            <h3 className="text-white font-semibold">Follow Us</h3>
                            <div className="flex flex-col space-y-3">
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <LuInstagram className="w-5 h-5" />
                                    Instagram
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <LuTwitter className="w-5 h-5" />
                                    Twitter
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <FaTiktok className="w-5 h-5" />
                                    TikTok
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800">
                    <div className="container mx-auto py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4 text-sm text-gray-400">
                            <Link to="/term-of-use" className="hover:text-white">
                                Terms of Use
                            </Link>
                            <Link to="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </div>
                        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} BeatProtect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;