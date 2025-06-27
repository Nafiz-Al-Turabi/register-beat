import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Axios/AxiosInstance";
import { LuCheckCircle } from "react-icons/lu";

const EmailVerified = () => {
    const { token } = useParams();
    const cleanedToken = token.startsWith(":") ? token.slice(1) : token;
    console.log(token)
    const navigate = useNavigate();
    const [message, setMessage] = useState("Verifying...");
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const emailVerified = async () => {
            try {
                await axiosInstance.get(`/users/verify-email/${cleanedToken}`);
                setIsVerified(true);
                setMessage("Email verified! Redirecting to login...");
                setTimeout(() => navigate("/dashboard"), 20000);
            } catch (error) {
                setIsVerified(false);
                setMessage("Invalid or expired link.");
            }
        };

        emailVerified();
    }, [token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
            {isVerified ? (
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg rounded-2xl p-8 max-w-md text-center">
                    <LuCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                        Email Verified Successfully!
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Your account has been successfully verified. You can now log in and start using our services.
                    </p>

                    <button
                        className="mt-6 px-6 py-2 bg-[#7e3aed] text-white rounded-lg shadow-md hover:bg-[#7e3aed]/50 transition"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to site
                    </button>

                    <p className="mt-4 text-sm text-gray-500">
                        Need help? <a href="/contact-us" className="text-[#7e3aed] hover:underline">Contact Support</a>
                    </p>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg rounded-2xl p-8 max-w-md text-center">
                    <div className="text-gray-500 text-xl font-semibold mb-4">{message}</div>
                    <button
                        className="mt-6 px-6 py-2 bg-[#7e3aed] text-white rounded-lg shadow-md hover:bg-[#7e3aed]/80 transition"
                        onClick={() => navigate("/")}
                    >
                        Back to site
                    </button>
                </div>
            )}
        </div>
    );
};

export default EmailVerified;
