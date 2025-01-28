import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from '../Components/Loading/Loading';

const Protected = ({ children, role }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Loading />;
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