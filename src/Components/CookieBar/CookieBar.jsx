import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieBar = () => {
    const [showCookieBar, setShowCookieBar] = useState(false);

    useEffect(() => {
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        if (!cookieAccepted) {
            const timer = setTimeout(() => {
                setShowCookieBar(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);
    const handleAccept = () => {
        localStorage.setItem('cookieAccepted', 'true');
        setShowCookieBar(false);
    };

    if (!showCookieBar) return null;

    return (
        <div className='fixed bottom-0 left-0 right-0 bg-gray-950 backdrop-blur-sm p-4 flex flex-col lg:flex-row gap-5 justify-between items-center'>
            <p>This website uses cookies to ensure you get the best experience on our website. </p>
            <div className='flex items-center gap-4'>
                <Link to="/privacy" className='text-sm text-gray-300 hover:text-white duration-300'>Learn more</Link>
                <button 
                    onClick={handleAccept}
                    className="border border-[#7e3aed] text-[#7e3aed] hover:bg-[#7e3aed] hover:text-white duration-300 px-5 py-2 rounded font-bold"
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default CookieBar;