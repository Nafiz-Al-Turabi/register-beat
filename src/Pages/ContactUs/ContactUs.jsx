"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LuSend } from "react-icons/lu";
import axiosInstance from "../../Axios/AxiosInstance";

export default function ContactUs() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    async function onSubmit(data) {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/support/create', {
                name: data.name,
                email: data.email,
                issue: data.message
            });
            
            if (response.status === 200 || response.status === 201) {
                toast.success(response.data.message || "Message sent! We'll get back to you as soon as possible.");
                reset();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-3xl mx-auto space-y-8 py-24 px-4 xl:px-0">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                    <p className="text-gray-400 max-w-[600px] mx-auto">
                        Have questions about protecting your beats? We're here to help. Send us a message and we'll get back to you
                        as soon as possible.
                    </p>
                </div>

                <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-6">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Send us a message</h2>
                        <p className="text-gray-400 text-sm">Fill out the form below and we'll respond within 24 hours.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First Name
                                </label>
                                <input
                                    id="name"
                                    {...register("name", { required: "First name is required" })}
                                    placeholder="Enter your first name"
                                    className="bg-zinc-900 border border-zinc-800 rounded-md p-2"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email", { required: "Email is required", pattern: /^\S+@\S+\.\S+$/ })}
                                placeholder="Enter your email"
                                className="bg-zinc-900 border border-zinc-800 rounded-md p-2"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                id="message"
                                {...register("message", { required: "Message cannot be empty" })}
                                placeholder="Type your message here..."
                                className="min-h-[150px] bg-zinc-900 border border-zinc-800 rounded-md p-2"
                            />
                            {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#7C3AED] hover:bg-[#6D31D4] text-white font-medium p-2 rounded-md flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? "Sending..." : "Send Message"}
                            {!isLoading && <LuSend className="ml-2 h-4 w-4" />}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
