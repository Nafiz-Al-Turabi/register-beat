import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiDotsThree } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import axiosInstance from '../../Axios/AxiosInstance';
import { trackEvent } from '../../facebookPixel/facebookPixel';

const Login = () => {
    const [forgotPasswordStep, setForgotPasswordStep] = useState(0);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [emailFilled, setEmailFilled] = useState(false);
    const [passwordFilled, setPasswordFilled] = useState(false);
    const { login, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

    // Track event when button is clicked for meta pixel
  const handleButtonClick = () => {
    trackEvent("loginButtonClick", { buttonName: "login" });
  };


    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            await login({
                email: data.email,
                password: data.password
            })
            toast.success("Login Successful")
            navigate("/dashboard")
        } catch (error) {
            console.error('Login error:', error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmailFilled(e.target.value !== "");
    };

    const handlePasswordChange = (e) => {
        setPasswordFilled(e.target.value !== "");
    };

    const googleLoginHandler = async () => {
        try {
            setIsGoogleLoading(true);
            await googleLogin();
            navigate("/")
        } catch (error) {
            console.error('Google login error:', error.response?.data?.message || error.message);
            alert('Google login failed. Please try again.');
        } finally {
            setIsGoogleLoading(false);
        }
    };

    // Reset form when changing steps
    const handleStepChange = (step) => {
        setForgotPasswordStep(step);
        reset(); 
    };

    const handleForgotPassword = async (data) => {
        try {
            setIsForgotPasswordLoading(true);
            switch (forgotPasswordStep) {
                case 1: 
                    try {
                        const { data: otpResponse } = await axiosInstance.post('/users/request-forgot-password-otp', {
                            email: data.email
                        });
                        toast.success('OTP sent to your email');
                        handleStepChange(2);
                    } catch (error) {
                        toast.error(error.response?.data?.message || 'Failed to send OTP');
                    }
                    break;

                case 2: // Verify OTP
                    try {
                        const { data: verifyResponse } = await axiosInstance.post('/users/match-password-otp', {
                            otp: data.otp
                        });
                        toast.success('OTP verified successfully');
                        handleStepChange(3);
                    } catch (error) {
                        toast.error(error.response?.data?.message || 'Invalid OTP');
                    }
                    break;

                case 3: 
                    try {
                        if (data.newPassword !== data.confirmPassword) {
                            toast.error('Passwords do not match');
                            return;
                        }

                        const { data: resetResponse } = await axiosInstance.patch('/users/reset-forgot-password', {
                            password: data.newPassword
                        });

                        toast.success('Password reset successful');
                        handleStepChange(0); 
                    } catch (error) {
                        toast.error(error.response?.data?.message || 'Failed to reset password');
                    }
                    break;
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setIsForgotPasswordLoading(false);
        }
    };

    const renderForgotPasswordForm = () => {
        switch (forgotPasswordStep) {
            case 1:
                return (
                    <div className='max-w-2xl bg-[#0f1423] animate-from-middle p-6 rounded-lg shadow-lg'>
                        <h3 className="text-xl text-center mb-4">Forgot Password</h3>
                        <div className="space-y-4">
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                placeholder="Enter your email"
                                className="w-full p-3 bg-[#1e2837] text-white rounded-md"
                            />
                            <button
                                type="submit"
                                disabled={isForgotPasswordLoading}
                                className="w-full primary-bg text-white py-2 rounded-md disabled:opacity-50"
                            >
                                {isForgotPasswordLoading ? 'Loading...' : 'Send OTP'}
                            </button>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className='bg-[#0f1423] animate-from-middle p-6 rounded-lg shadow-lg'>
                        <h3 className="text-xl text-center mb-4">Enter OTP</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                {...register("otp", { required: "OTP is required" })}
                                placeholder="Enter OTP"
                                className="w-full p-3 bg-[#1e2837] text-white rounded-md"
                            />
                            <button
                                type="submit"
                                disabled={isForgotPasswordLoading}
                                className="w-full primary-bg text-white py-2 rounded-md disabled:opacity-50"
                            >
                                {isForgotPasswordLoading ? 'Loading...' : 'Verify OTP'}
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className='max-w-xs bg-[#0f1423] animate-from-middle p-6 rounded-lg shadow-lg'>
                        <h3 className="text-xl text-center mb-4">Reset Password</h3>
                        <div className="space-y-4">
                            <input
                                type="password"
                                {...register("newPassword", { required: "New password is required" })}
                                placeholder="New Password"
                                className="w-full p-3 bg-[#1e2837] text-white rounded-md"
                            />
                            <input
                                type="password"
                                {...register("confirmPassword", { required: "Confirm password is required" })}
                                placeholder="Confirm Password"
                                className="w-full p-3 bg-[#1e2837] text-white rounded-md"
                            />
                            <button
                                type="submit"
                                disabled={isForgotPasswordLoading}
                                className="w-full primary-bg text-white py-2 rounded-md disabled:opacity-50"
                            >
                                {isForgotPasswordLoading ? 'Loading...' : 'Reset Password'}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="">
                {forgotPasswordStep === 0 ? (
                    // Normal login form
                    <div className="w-full max-w-md tertiary-bg p-8 rounded-xl shadow-lg animate-login ">
                        <h2 className="text-3xl font-bold text-center text-[#7e3aed] mb-8"> <span className='text-white'>Login</span> to BeatProtect</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className='relative'>
                                <label htmlFor="email" className="block text-[#9da6be] text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    {...register("email", { 
                                        required: "Email is required",
                                        onChange: (e) => handleEmailChange(e)
                                    })}
                                    className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#7e3aed]"
                                />
                                {!emailFilled && <PiDotsThree className='bg-red-500 w-6 h-6 rounded-sm absolute top-[42px] right-5' />}
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div className='relative'>
                                <label htmlFor="password" className="block text-[#9da6be] text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    {...register("password", { 
                                        required: "Password is required",
                                        onChange: (e) => handlePasswordChange(e)
                                    })}
                                    className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#7e3aed]"
                                />
                                {!passwordFilled && <PiDotsThree className='bg-red-500 w-6 h-6 rounded-sm absolute top-[42px] right-5' />}
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    type="button"
                                    onClick={() => handleStepChange(1)}
                                    className="text-sm text-[#7e3aed] hover:text-[#7f3aedd8]"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            <button 
                                onClick={handleButtonClick}
                                type="submit" 
                                disabled={isLoading}
                                className="w-full primary-bg text-lg text-white font-bold py-3 rounded-full mt-4 disabled:opacity-50"
                            >
                                {isLoading ? 'Loading...' : 'Sign In'}
                            </button>
                        </form>
                        <div className="mt-4 text-center flex justify-between items-center">
                            <hr className='w-32 border-gray-600' />
                            <span className="text-sm text-gray-400">Or continue with</span>
                            <hr className='w-32 border-gray-600' />
                        </div>

                        <button 
                            onClick={googleLoginHandler} 
                            disabled={isGoogleLoading}
                            className="w-full flex items-center justify-center bg-white text-lg font-bold text-black py-3 rounded-full mt-4 hover:bg-gray-100 focus:outline-none disabled:opacity-50"
                        >
                            {isGoogleLoading ? 'Loading...' : <>Sign in with <FcGoogle className='ml-1' />oogle</>}
                        </button>

                        <div className="mt-4 text-center">
                            <Link to='/signup' className="text-sm text-gray-400">Don't have an account? <span className="text-[#7e3aed] hover:underline underline-offset-4">Sign up</span></Link>
                        </div>
                    </div>

                ) : (
                    // Forgot password flow
                    <form onSubmit={handleSubmit(handleForgotPassword)} className="  animate-from-middle space-y-4 px-4 md:px-0">
                        {renderForgotPasswordForm()}
                        <button
                            type="button"
                            onClick={() => handleStepChange(0)}
                            className="text-sm text-[#7e3aed] hover:text-[#7f3aedd8]"
                        >
                            Back to Login
                        </button>

                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
