import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../Loading/Loading';

const PaypalLoading = () => {
    const { user, refreshUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await refreshUserInfo();
                if (user?.active === true) {
                    clearInterval(interval);
                    navigate('/');
                }
            } catch (error) {
                console.error('Error refreshing user info:', error);
                clearInterval(interval);
                navigate('/payment');
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [user, navigate, refreshUserInfo]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Loading />
            <p className="mt-4 text-lg font-semibold">Please wait while we process your payment...</p>
        </div>
    );
};

export default PaypalLoading;
