import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import CookieBar from '../Components/CookieBar/CookieBar';
import MetaPixelTracker from '../facebookPixel/MetaPixelTracker';
const LandingLayout = () => {
    return (
        <div>
            <MetaPixelTracker />
            <Navbar />
            <Outlet />
            <Footer />
            <CookieBar />
        </div>
    );
};

export default LandingLayout;