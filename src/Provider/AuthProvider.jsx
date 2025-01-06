import React, { useState, createContext, useEffect } from "react";
import axiosInstance from "../Axios/AxiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/users/check", {
                withCredentials: true,
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("Failed to fetch user info:", error.response?.data?.message || error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Handle API errors
    const handleError = (error) => {
        if (error.response?.data?.message) {
            console.error(error.response.data.message);
            toast.error(error.response.data.message);
        } else {
            console.error("An unexpected error occurred:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    // User signup
    const signup = async (credentials) => {
        try {
            const response = await axiosInstance.post("/users/register", credentials);
            return response.data;
        } catch (error) {
            handleError(error);  
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axiosInstance.post("/users/login", credentials, { withCredentials: true });
            console.log("Login Response:", response.data);
            const { token, user } = response.data;
            setUser(user);
        } catch (error) {
            handleError(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/users/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logout successful");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
            throw error;
        }
    };

    const userInfo = {
        user,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;