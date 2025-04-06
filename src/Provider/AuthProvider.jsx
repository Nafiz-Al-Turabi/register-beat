// contexts/AuthProvider.jsx
import React, { useState, useEffect, createContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../Axios/AxiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const GOOGLE_CLIENT_ID = "721848498798-t52o73v6k3r0ss1g49dg7a905hef1at8.apps.googleusercontent.com";

const AuthProviderInner = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserInfo();
        handleOAuthRedirect();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const { data } = await axiosInstance.get("/users/check", { withCredentials: true });
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshUserInfo = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.get("/users/check", { withCredentials: true });
            setUser(data.user);
        } catch (err) {
            showError(err);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (credentials) => {
        try {
            const { data } = await axiosInstance.post("/users/register", credentials);
            await login(credentials); // Auto login
            return data;
        } catch (err) {
            showError(err);
            throw err;
        }
    };

    const login = async (credentials) => {
        try {
            const { data } = await axiosInstance.post("/users/login", credentials, { withCredentials: true });
            setUser(data.user);
        } catch (err) {
            showError(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/users/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logout successful");
        } catch (err) {
            showError(err);
        }
    };

    const googleLogin = () => {
        const state = Math.random().toString(36).substring(2, 15);
        localStorage.setItem('googleOAuthState', state);

        const redirectUri = window.location.origin;
        const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        googleAuthUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
        googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
        googleAuthUrl.searchParams.set("response_type", "id_token");
        googleAuthUrl.searchParams.set("scope", "email profile");
        googleAuthUrl.searchParams.set("state", state);
        googleAuthUrl.searchParams.set("nonce", Date.now().toString());
        googleAuthUrl.searchParams.set("prompt", "select_account");

        window.location.href = googleAuthUrl.toString();
    };

    const handleOAuthRedirect = () => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const idToken = params.get("id_token");

        if (idToken) {
            handleGoogleLoginSuccess({ credential: idToken });
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    };

    const handleGoogleLoginSuccess = async ({ credential }) => {
        try {
            const { email, name } = jwtDecode(credential);
            const { data } = await axiosInstance.post(
                "/users/google/login",
                { email, name },
                { withCredentials: true }
            );
            setUser(data.user);
            toast.success("Google login successful!");
        } catch (error) {
            showError(error);
        }
    };

    const showError = (err) => {
        const message = err?.response?.data?.message || "Something went wrong!";
        console.error(message);
        toast.error(message);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signup,
                login,
                logout,
                googleLogin,
                refreshUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const AuthProvider = ({ children }) => (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProviderInner>{children}</AuthProviderInner>
    </GoogleOAuthProvider>
);

export default AuthProvider;
