import { LuMail } from "react-icons/lu";
const VerifyAccount = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-lg rounded-2xl p-8 max-w-md text-center">
                <>
                    <LuMail className="text-green-500 w-16 h-16 mx-auto" />
                    <h2 className="text-2xl font-semibold text-[#7e3aed] mt-4">Email Sent!</h2>
                    <p className="text-gray-400 mt-2">
                        We've sent a verification link to your email. Please check your inbox and follow the instructions to verify your account.
                    </p>
                </>

                {/* <button
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                    onClick={() => alert("Resend email triggered")}
                >
                    Resend Verification Email
                </button> */}

                <p className="mt-4 text-sm text-gray-500">
                    Didn't receive an email? Check your spam folder.
                </p>
            </div>
        </div>
    );
};

export default VerifyAccount;
