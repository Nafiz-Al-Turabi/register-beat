import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiDotsThree } from "react-icons/pi";
import { Link } from 'react-router-dom';

const ProfileSetting = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState('');

    const handleFile = (file) => {
        const fileUrl = URL.createObjectURL(file);
        setImage(fileUrl);
    };

    const onSubmit = (data) => {
        console.log(data); // This should show the submitted data if inputs are valid
    };

    return (
        <div>
            <h3 className='text-xl font-medium'>Profile Picture</h3>
            <div>
                <div className='flex gap-4 mt-4'>
                    <div className='bg-[#1e2837] rounded-lg w-20 h-20'>
                        <img src={image} alt="" className={`${image ? 'object-cover w-full h-full' : ''} rounded-lg`} />
                    </div>
                    <button>
                        <label htmlFor="uploadFile1" className="flex bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer mx-auto font-[sans-serif]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 mr-2 fill-white inline" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            Upload Profile Picture
                            <input type="file" id='uploadFile1' className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
                        </label>
                    </button>
                </div>
                <p className='text-sm text-[#72747e] mt-2'>Min. 200x200 px. PNG or JPG.</p>
            </div>
            <div className='mt-6'>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-[#9da6be] text-sm font-medium mb-2">Username</label>
                        <div className='flex justify-between items-center md:w-1/2 p-2 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-purple-600'>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your name"
                                {...register("username", { required: "Username is required" })}
                                className="w-full bg-[#1e2837] text-white focus:outline-none focus:bg-[#1e2837]"
                            />
                            {errors.username && <PiDotsThree className='bg-red-500 w-6 h-6' />}
                        </div>
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-[#9da6be] text-sm font-medium mb-2">Email</label>
                        <div className='flex justify-between items-center md:w-1/2 p-2 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-purple-600'>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className="w-full bg-[#1e2837] text-white focus:outline-none focus:bg-[#1e2837]"
                            />
                            {errors.email && <PiDotsThree className='bg-red-500 w-6 h-6' />}
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        <p className='text-sm text-[#72747e] mt-2'>To change your email, please <Link to={""} className='text-[#5816c5] underline'>follow these instructions</Link></p>
                    </div>
                    <div>
                        <label htmlFor="full-name" className="block text-[#9da6be] text-sm font-medium mb-2">Full Name</label>
                        <div className='flex justify-between items-center md:w-1/2 p-2 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-purple-600'>
                            <input
                                type="text"
                                id="full-name"
                                placeholder="Enter your full name"
                                {...register("full-name")}
                                className="w-full bg-[#1e2837] text-white focus:outline-none focus:bg-[#1e2837]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="full-name" className="block text-[#9da6be] text-sm font-medium mb-2">Producer Name</label>
                        <div className='flex justify-between items-center md:w-1/2 p-2 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-purple-600'>
                            <input
                                type="text"
                                id="producer-name"
                                placeholder="Enter your producer name"
                                {...register("producer-name")}
                                className="w-full bg-[#1e2837] text-white focus:outline-none focus:bg-[#1e2837]"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="youtube-channel" className="block text-[#9da6be] text-sm font-medium mb-2">Youtube Channel</label>
                        <div className='flex justify-between items-center md:w-1/2 p-2 bg-[#1e2837] text-white rounded-md border border-gray-600 focus:ring-1 focus:ring-purple-600'>
                            <input
                                type="text"
                                id="youtube-channel"
                                placeholder="Enter your youtube channel URL"
                                {...register("youtube-channel")}
                                className="w-full bg-[#1e2837] text-white focus:outline-none focus:bg-[#1e2837]"
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-purple-600 text-base text-white font-bold p-3 mt-4 rounded-lg hover:bg-purple-700 duration-200 focus:outline-none">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetting;
