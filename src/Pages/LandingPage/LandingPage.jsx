import React from 'react';
import { FaBell } from 'react-icons/fa';
import { HiOutlineShieldCheck, HiShieldCheck } from 'react-icons/hi';
import { LuBarChart3, LuLineChart, LuUpload, LuFileText } from 'react-icons/lu';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div className='bg-black max-w-[1440px] mx-auto px-4 xl:px-0'>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm px-4 xl:px-0">
                <div className="container mx-auto flex items-center justify-between py-4">
                    <Link href="/" className="text-2xl font-bold text-white">
                        BeatProtect
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#" className="text-gray-300 hover:text-white">
                            Why BeatProtect?
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white">
                            Support
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-white">
                            Pricing
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/signin" className="text-gray-300 hover:text-white">
                            Sign In
                        </Link>
                        <button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md">Get Started</button>
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <main className="container pt-20 pb-16 mt-4">
                <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full bg-[#7C3AED] px-4 py-1 text-sm text-white">
                        Protect your beats today
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Create. Register. Protect.</h1>

                    <p className="text-xl text-gray-400 max-w-2xl">
                        Protect Your Beats &amp; Take Control of Your Beats on YouTube
                    </p>

                    <div className="relative w-full max-w-2xl mt-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative rounded-xl overflow-hidden">
                            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                                <source
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/demo-tab1-video-5ZGHGP24LF4YBvx5Bm3N4zzDNdpJJP.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full mt-8">
                        <button className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-10 py-2 rounded-md">
                            Register Your Beat Now
                        </button>
                    </div>
                </div>
            </main>
            {/* Results Section */}
            <section className="container py-24">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        An <span className="text-[#7C3AED]">ALL-NEW</span> way to
                        <br />
                        protect your beats.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Don't let others take credit for your work. Register your beats with BeatProtect and upload to YouTube with
                        confidence.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                            <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center shrink-0">
                                <LuBarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Legal Beat Registration &amp; Protection</h3>
                                <p className="text-gray-400">
                                    Establish undisputable proof of ownership for your beats with BeatProtect. Our platform generates
                                    legally recognized certificates that safeguard your rights and prevent unauthorized use.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                            <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center shrink-0">
                                <LuLineChart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Timestamped Digital Certificates</h3>
                                <p className="text-gray-400">
                                    Each registered beat is assigned a unique digital fingerprint and timestamp. This document serves as
                                    proof of authorship and can be used in legal disputes on platforms like YouTube, Spotify, and more.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                            <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center shrink-0">
                                <FaBell className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Blockchain-Backed Registration</h3>
                                <p className="text-gray-400">
                                    Your beats are securely registered using blockchain technology and SafeCreative&apos;s timestamping
                                    system, ensuring immutable proof of ownership that holds up in court.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                            <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center shrink-0">
                                <HiOutlineShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Simple &amp; Secure Registration Process</h3>
                                <p className="text-gray-400">
                                    Register your beats in seconds—simply upload your file, confirm details, and receive a legally binding
                                    certificate of ownership, ensuring your work remains protected.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative rounded-xl overflow-hidden border border-gray-800">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beatdetails2-iPAO53astHGxXYiNKE54tgjFY8t2xi.webp"
                                alt="Beat Registration Details Interface"
                                width={1000}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Steps Section */}
            <section className="container py-24">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Register and Protect your beats in <span className="text-[#7C3AED]">3 easy steps</span>
                    </h2>
                    <p className="text-xl text-gray-400">Protect your music with our simple registration process</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                        <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                            <LuUpload className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Upload your beat</h3>
                        <p className="text-gray-400">
                            Simply upload your music file and we&apos;ll handle the technical details for you.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                        <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                            <LuFileText className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Complete the Form</h3>
                        <p className="text-gray-400">
                            Include key details like your name, producer name, YouTube link, and specify your rights to ensure legal
                            protection for your beat.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                        <div className="w-12 h-12 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
                            <HiOutlineShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Receive Your Certificate ✅</h3>
                        <p className="text-gray-400">
                            A legal certificate with a digital fingerprint and timestamp is generated. Download your proof of
                            registration and use it in any dispute.
                        </p>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default LandingPage;