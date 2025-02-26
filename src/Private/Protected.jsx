import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading/Loading';


const Protected = ({ children, role = [] }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // Prevent infinite redirects by checking current path
    const isLoginPage = location.pathname === '/signup';
    const isPaymentPage = location.pathname === '/payment';
    const isHomePage = location.pathname === '/';

    if (loading) {
        return <Loading />;
    }

    if (!user && !isLoginPage) {
        return (
            <Navigate 
                to="/signup" 
                state={{ from: location.pathname !== '/signup' ? location : '/' }} 
                replace 
            />
        );
    }

    if (user && isLoginPage) {
        return <Navigate to="/dashbaord" replace />;
    }

    if (user?.paypalSubsStatus === 'pending') {
        return <Navigate to="/payment-checking" replace />;
    }

    const needsSubscription = 
        user?.role !== "admin" && 
        !user?.active && 
        !user?.subscriptionId;

    if (needsSubscription && !isPaymentPage) {
        return (
            <Navigate 
                to="/payment" 
                state={{ from: location.pathname !== '/payment' ? location : '/' }} 
                replace 
            />
        );
    }

    const roles = Array.isArray(role) ? role : [role];
    if (roles.length > 0 && user && !roles.includes(user.role) && !isHomePage) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default Protected;