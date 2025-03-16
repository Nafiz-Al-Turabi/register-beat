import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import CookieBar from '../Components/CookieBar/CookieBar';
const LandingLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
            <CookieBar />
        </div>
    );
};

export default LandingLayout;