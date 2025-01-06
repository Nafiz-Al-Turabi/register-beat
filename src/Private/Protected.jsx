import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Protected = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return "loading...";
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!role.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default Protected;