import { useNavigate } from "react-router-dom";
import { LuCheckCircle } from "react-icons/lu";
const EmailVerified = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg rounded-2xl p-8 max-w-md text-center">
                <LuCheckCircle className="text-green-500 w-16 h-16 mx-auto" />
                <h2 className="text-2xl font-semibold text-[#7e3aed] mt-4">
                    Email Verified Successfully!
                </h2>
                <p className="text-gray-400 mt-2">
                    Your account has been successfully verified. You can now log in and start using our services.
                </p>

                <button
                    className="mt-6 px-6 py-2 bg-[#7e3aed] text-white rounded-lg shadow-md hover:bg-[#7f3aedd8] transition"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>

                <p className="mt-4 text-sm text-gray-500">
                    Need help? <a href="/contact-us" className="text-[#7e3aed] hover:underline">Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default EmailVerified;
