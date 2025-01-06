import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiDotsThree } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [emailFilled, setEmailFilled] = useState(false);
    const [nameFilled, setNameFilled] = useState(false);
    const [passwordFilled, setPasswordFilled] = useState(false);
    const [confirmPasswordFilled, setConfirmPasswordFilled] = useState(false);
    const { signup } = useContext(AuthContext)

    const onSubmit = async (data) => {
        try {
            await signup({
              name: data.name,
              email: data.email,
              password: data.password
            })
            toast.success('Registration Successful.');
            navigate('/login');
          } catch (error) {
            console.error('Registration error:', error.response?.data?.message || error.message);
            toast.error('Registration failed. Please try again.');
          }
    };

    const handleEmailChange = (e) => {
        setEmailFilled(e.target.value !== "");
    };
    const handleNameChange = (e) => {
        setNameFilled(e.target.value !== "");
    };

    const handlePasswordChange = (e) => {
        setPasswordFilled(e.target.value !== "");
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPasswordFilled(e.target.value !== "");
    };

    // Watch the password field to validate confirm password
    const password = watch('password');

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md tertiary-bg p-8 rounded-xl shadow-lg animate-signup ">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
                    <span className='text-white'>Join</span> BeatProtect
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className='relative'>
                        <label htmlFor="name" className="block text-[#9da6be] text-sm font-medium mb-2">name</label>
                        <input
                            type="name"
                            id="name"
                            placeholder="Enter your name"
                            {...register("name", { required: "name is required" })}
                            onChange={handleNameChange}
                            className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        />
                        {!nameFilled && <PiDotsThree className='bg-red-500 w-6 h-6 rounded-sm absolute top-[42px] right-5' />}
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div className='relative'>
                        <label htmlFor="email" className="block text-[#9da6be] text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            onChange={handleEmailChange}
                            className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
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
                            {...register("password", { required: "Password is required" })}
                            onChange={handlePasswordChange}
                            className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        />
                        {!passwordFilled && <PiDotsThree className='bg-red-500 w-6 h-6 rounded-sm absolute top-[42px] right-5' />}
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div className='relative'>
                        <label htmlFor="confirmPassword" className="block text-[#9da6be] text-sm font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Enter confirm password"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === password || "Passwords do not match"
                            })}
                            onChange={handleConfirmPasswordChange}
                            className="w-full p-3 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-purple-600"
                        />
                        {!confirmPasswordFilled && <PiDotsThree className='bg-red-500 w-6 h-6 rounded-sm absolute top-[42px] right-5' />}
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-purple-600 text-lg text-white font-bold py-3 rounded-full mt-4 hover:bg-purple-700 duration-200 focus:outline-none">
                        Create Account
                    </button>

                    <div className="mt-4 text-center flex justify-between items-center">
                        <hr className='w-32 border-gray-600' />
                        <span className="text-sm text-gray-400">Or continue with</span>
                        <hr className='w-32 border-gray-600' />
                    </div>

                    <button type="button" className="w-full bg-white text-lg font-bold text-black py-3 rounded-full mt-4 hover:bg-gray-100 focus:outline-none">
                        Sign up with Google
                    </button>

                    <div className="mt-4 text-center">
                        <Link to='/login' className="text-sm text-gray-400">Already have an account? <a href="#" className="text-purple-600 hover:underline">Login</a></Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
