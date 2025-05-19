import React, { useContext, useEffect } from 'react';
import { FaTiktok } from 'react-icons/fa';
import { HiOutlineShieldCheck, } from 'react-icons/hi';
import { LuBarChart3, LuLineChart, LuUpload, LuFileText, LuCheck, LuSearch, LuBell, LuGlobe, LuMusic, LuShield, LuShieldCheck, LuTwitter, LuInstagram } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import Testimonial from '../../Components/Testimonial/Testimonial';
import StatsSection from '../../Components/AnimatedCounter/AnimatedCounter';
import FAQ from '../../Components/FAQ/FAQ';
import { AuthContext } from '../../Provider/AuthProvider';
import youtube from '../../assets/img/youtubeicon2.png'
import spotify from '../../assets/img/spotify-icon.png'
import apple from '../../assets/img/apple-music-icon.png'
import { Button } from '@headlessui/react';
import { Check, X } from 'lucide-react';
import WistiaPlayer from '../../Components/HomeVideo/WistiaPlayer';


const LandingPage = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
      const handlePlanSelect = (planType) => {
        if (!user) {
            // Store selected plan in localStorage before redirecting to register
            localStorage.setItem('selectedPlanAfterRegister', planType);
            navigate('/signup');
        } else {
            // User is logged in, proceed directly to payment
            navigate(planType === 'pro' ? '/payment' : '/ultra/payment');
        }
    };
    
    return (
        <div className='bg-black px-4 2xl:px-0'>

            {/* Hero Section */}
            <main id="hero" className="container mx-auto pt-20 lg:pb-16 mt-4">
                <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center rounded-full bg-[#7C3AED] px-4 py-1 text-sm text-white">
                        Protect your beats today
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight">Create. Register. Protect.</h1>

                    <p className="text-xl text-gray-400 max-w-2xl">
                        Protect Your Beats &amp; Take Control of Your Beats on YouTube
                    </p>


                    {/* <div className="relative w-full max-w-2xl mt-8">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative rounded-xl overflow-hidden">
                            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                                <source
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/demo-tab1-video-5ZGHGP24LF4YBvx5Bm3N4zzDNdpJJP.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div> */}

                    <div className="max-w-4xl mx-auto mb-20">
                        <WistiaPlayer
                            mediaId="z5wwp3l7bv"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="flex items-center justify-center w-full mt-8">
                        <button onClick={() => navigate('/dashboard')} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-10 py-2 rounded-md duration-300 ease-in-out">
                            Register Your Beat Now
                        </button>
                    </div>
                </div>
            </main>
            {/* Results Section */}
            <section className="container mx-auto py-16 lg:py-24">
                <div className="text-center mb-8 lg:mb-20">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
                        An <span className="text-[#7C3AED]">ALL-NEW</span> way to
                        <br />
                        protect your beats.
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Don't let others take credit for your work. Register your beats with BeatProtect and upload to YouTube with
                        confidence.
                    </p>
                </div>
                {/* ------------------------------------------------------------------------- */}
                {/* <div className="max-w-4xl mx-auto mb-40">
                    <WistiaPlayer
                        mediaId="z5wwp3l7bv"
                        className="rounded-lg shadow-lg"
                    />
                </div> */}
                {/* ----------------------------------------------------------------------------- */}

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
                                <LuBell className="w-6 h-6 text-white" />
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
                                <LuShieldCheck className="w-6 h-6 text-white" />
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
            <section className="container mx-auto py-4 lg:py-24">
                <div className="text-center mb-8 lg:mb-20">
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
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
            {/* Dashboard Preview Section */}
            <section className="container mx-auto py-16 lg:py-24">
                <h2 className="text-3xl md:text-6xl font-bold text-white text-center mb-8">
                    Take Full Control of <span className="text-[#7C3AED]">Your Beats</span>
                </h2>
                <div className="relative w-full max-w-6xl mx-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                    <div className="relative rounded-xl overflow-hidden border border-gray-800">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2dashboardbp-N1TqXd5LG0IVlYTd2c6m8SmV8xnzbu.webp"
                            alt="BeatProtect Dashboard Interface"
                            width={1920}
                            height={1080}
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </section>
            {/* Legal Protection Section */}
            <section className="container mx-auto py-6 lg:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 lg:mb-16">
                        <div className="inline-block">
                            <div className="flex items-center gap-2 text-[#7C3AED] font-medium mb-4">
                                <LuShield className="w-5 h-5" />
                                <span>Legal Protection</span>
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
                            Your Beat, Protected with{" "}
                            International Legal Proof
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            At BeatProtect, we know how important it is to keep your music safe from unauthorized use.
                            That's why every time you register a beat, we generate solid legal proof using Safe Creative
                            technology.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                            <h3 className="text-2xl font-bold text-white mb-6">How Do We Protect Your Beat?</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 text-[#7C3AED] mt-1">
                                        <LuCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Instant Proof of Ownership</h4>
                                        <p className="text-gray-400">
                                            The moment you register your beat, we create a digital certificate that proves you are the
                                            rightful owner.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-6 h-6 text-[#7C3AED] mt-1">
                                        <LuCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Three Unique Digital Fingerprints</h4>
                                        <p className="text-gray-400">
                                            We generate cryptographic proof to ensure your beat remains unaltered and its registration date is
                                            accurate.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-6 h-6 text-[#7C3AED] mt-1">
                                        <LuCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Official Timestamp</h4>
                                        <p className="text-gray-400">
                                            A certified timestamp is added, guaranteeing that your beat was officially registered at an exact
                                            date and time.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-6 h-6 text-[#7C3AED] mt-1">
                                        <LuCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">International Recognition</h4>
                                        <p className="text-gray-400">
                                            BeatProtect uses a technology accepted worldwide under the Berne Convention and the World
                                            Intellectual Property Organization (WIPO).
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-6 h-6 text-[#7C3AED] mt-1">
                                        <LuCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">Permanent Proof</h4>
                                        <p className="text-gray-400">
                                            Once registered, your certificate never expires. You will always have access to your proof of
                                            ownership.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
                            <h3 className="text-2xl font-bold text-white mb-6">What Does This Mean for You as a Producer?</h3>
                            <div className="grid gap-6">
                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-1 w-8 h-8 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center">
                                        <LuMusic className="w-5 h-5 text-[#7C3AED]" />
                                    </div>
                                    <p className="text-lg text-white">Your music is protected from the moment you register it</p>
                                </div>

                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-1 w-8 h-8 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center">
                                        <LuSearch className="w-5 h-5 text-[#7C3AED]" />
                                    </div>
                                    <p className="text-lg text-white">
                                        You can prove ownership if someone uses your beat without permission
                                    </p>
                                </div>

                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-1 w-8 h-8 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center">
                                        <LuBell className="w-5 h-5 text-[#7C3AED]" />
                                    </div>
                                    <p className="text-lg text-white">You can claim your rights on platforms like YouTube or Spotify</p>
                                </div>

                                <div className="relative pl-12">
                                    <div className="absolute left-0 top-1 w-8 h-8 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center">
                                        <LuGlobe className="w-5 h-5 text-[#7C3AED]" />
                                    </div>
                                    <p className="text-lg text-white">You have legal proof valid in any country</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <p className="text-lg text-white text-center mb-6">
                                    Protect your beats from unauthorized uploads on
                                    major platforms
                                </p>
                                <div className='flex items-center justify-center gap-4 mb-10'>
                                    <img src={youtube} alt="" className='w-12 h-12' />
                                    <img src={spotify} alt="" className='w-12 h-12' />
                                    <img src={apple} alt="" className='w-12 h-12' />
                                </div>
                                <button onClick={() => navigate('/dashboard')} size="lg" className="w-full bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-3 rounded-md duration-300 ease-in-out">
                                    Start Protecting Your Beats
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ************************************ */}
            <StatsSection />
            {/* ************************************ */}
            {/* Video Showcase Section */}
            <section className="container mx-auto pt-24 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
                            Protect Your Beats with Secure Digital Registration
                        </h2>
                        <p className="text-xl text-gray-400 max-w-lg">
                            Our platform allows you to register your beats quickly and legally, generating a digital
                            certificate backed by advanced technology. Each beat receives a unique cryptographic
                            fingerprint and a dual timestamp seal recognized globally, ensuring authenticity and
                            protection in any copyright dispute. Register your music with confidence, knowing you
                            can always prove your ownership.
                        </p>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/dashboard')} size="lg" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-3 rounded-md duration-300 ease-in-out ">
                                Start Protecting your Beats
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative rounded-xl overflow-hidden border border-gray-800">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/column1v2%20-%2001-RryJpoRhijBzskS8Qrb6Y9fOnO2BLv.webp"
                                alt="Beat Protection Success Screen"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative group order-last lg:order-first">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative bg-grey-900 rounded-xl overflow-hidden border border-gray-800">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beatstolen2-xmdKaVZZra5upKwLFNBCdLIVRzpWba.webp"
                                alt="Beat can be Stolen warning screen"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    <div className="space-y-8 order-first lg:order-last">
                        <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
                            Are you going to lose all your hard work?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-lg">
                            Imagine you upload a beat to YouTube, an artist uses it without permission and registers it before you.
                            Once someone else registers it, proving it was yours will be very difficult. Every day your beat goes
                            unregistered, someone could be using and monetizing it. Don&apos;t wait until it&apos;s too late and
                            someone else registers your work.
                        </p>
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate('/dashboard')} size="lg" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-3 rounded-md duration-300 ease-in-out ">
                                Start Protecting your Beats
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* neww one add tohidul--------------------------- */}

            <section className=" relative container mx-auto py-16 lg:py-24">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-3xl"></div>
                </div>

                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] border border-[#7C3AED]/20 px-4 py-2 mb-8">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#7C3AED]"
                        >
                            <path
                                d="M15 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H15"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path d="M21 12L15 8V16L21 12Z" fill="currentColor" />
                        </svg>
                        <span className="text-[#7C3AED] font-medium">NEW FEATURE</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        <span className="text-[#7C3AED]">Introducing: BeatScanner</span>
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Track Your Beats
                        <br />
                        Across Streaming Platforms
                    </h3>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Discover who's using your beats and verify if they've purchased the proper license. Our advanced scanning
                        technology monitors digital platforms to protect your work.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 relative z-10">
                    {/* Left side - Analytics Dashboard */}
                    <div className="lg:col-span-7 bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/10"></div>

                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-white">Beat Analytics Dashboard</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                Updated: 2 days ago
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">Songs Scanned</p>
                                <p className="text-3xl font-bold text-white">247</p>
                                <p className="text-xs text-green-500 flex items-center mt-2">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 15L12 9L6 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    +12% this month
                                </p>
                            </div>

                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">Songs Licensed</p>
                                <p className="text-3xl font-bold text-white">89</p>
                                <p className="text-xs text-green-500 flex items-center mt-2">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 15L12 9L6 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    +24% this month
                                </p>
                            </div>

                            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                                <p className="text-gray-400 text-sm mb-1">Unauthorized Songs</p>
                                <p className="text-3xl font-bold text-[#FF5A5A]">17</p>
                                <p className="text-xs text-[#FF5A5A] flex items-center mt-2">
                                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Action required
                                </p>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-white font-medium">Recent Activity</h4>
                                <button className="text-[#7C3AED] text-sm hover:underline">View all</button>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-white">New Song Match: "Traveling" using your beat</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                    <span className="text-xs font-medium bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full border border-green-900">
                                        Licensed
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-white">New Song Match: "Night Rider" using your beat</p>
                                        <p className="text-xs text-gray-500">6 hours ago</p>
                                    </div>
                                    <span className="text-xs font-medium bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full border border-red-900">
                                        Unlicensed
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm text-white">Scan completed: 24 beats analyzed</p>
                                        <p className="text-xs text-gray-500">12 hours ago</p>
                                    </div>
                                    <span className="text-xs font-medium bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded-full border border-blue-900">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Features */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-[#7C3AED]/10 to-[#7C3AED]"></div>

                            <h3 className="text-2xl font-bold text-white mb-6">How the Scanner Works</h3>

                            <div className="space-y-8">
                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                                        <span className="text-[#7C3AED] text-sm font-bold">1</span>
                                    </div>
                                    <div className="absolute left-3 top-6 h-[calc(100%-12px)] w-px bg-gradient-to-b from-[#7C3AED] to-transparent"></div>
                                    <h4 className="text-white font-medium mb-2">Digital Fingerprint Registration</h4>
                                    <p className="text-gray-400 text-sm">
                                        When you register your beat, we create a unique digital fingerprint that identifies your music,
                                        similar to a human fingerprint.
                                    </p>
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                                        <span className="text-[#7C3AED] text-sm font-bold">2</span>
                                    </div>
                                    <div className="absolute left-3 top-6 h-[calc(100%-12px)] w-px bg-gradient-to-b from-[#7C3AED] to-transparent"></div>
                                    <h4 className="text-white font-medium mb-2">Continuous Scanning</h4>
                                    <p className="text-gray-400 text-sm">
                                        Our algorithms constantly scan streaming platforms and social networks looking for matches with your
                                        beats.
                                    </p>
                                </div>

                                <div className="relative pl-8">
                                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                                        <span className="text-[#7C3AED] text-sm font-bold">3</span>
                                    </div>
                                    <h4 className="text-white font-medium mb-2">Instant Notifications</h4>
                                    <p className="text-gray-400 text-sm">
                                        You receive real-time alerts about new uses of your beats, allowing you to take immediate action
                                        when necessary.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-6">
                            <div className="flex justify-center">
                                <Button onClick={() => navigate('/dashboard')} className="w-full p-2 rounded-lg bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white">
                                    Start Monitoring Your Beats
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* end here------------------------------- */}

            <section className="container mx-auto py-6 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
                            Prove You Own Your Beats. Publish with Confidence. Protect Your Music.
                        </h2>
                        <p className="text-xl text-gray-400">
                            Here, you don&apos;t have to worry—you come to secure your music. Your beats, your talent, shielded
                            against unauthorized use.
                        </p>
                    </div>
                    <div className="grid gap-8 mb-16">
                        <div className="space-y-4 text-center">
                            <p className="text-lg text-white flex items-center justify-center gap-3">
                                <span className="text-2xl">🔒</span>
                                Register your beat in seconds and get legal proof of ownership.
                            </p>
                            <p className="text-lg text-white flex items-center justify-center gap-3">
                                <span className="text-2xl">🚀</span>
                                Forget about theft—claim what&apos;s rightfully yours without hassle.
                            </p>
                            <p className="text-lg text-white flex items-center justify-center gap-3">
                                <span className="text-2xl">📜</span>
                                Your registrations are valid on digital platforms and in legal disputes.
                            </p>
                        </div>
                    </div>
                    <div className="mb-8 lg:mb-16">
                        <h3 className="text-3xl font-bold text-white mb-8">What You&apos;ll Avoid with BeatProtect:</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                                <p className="text-lg text-white flex items-start gap-3">
                                    <span className="text-2xl">❌</span>
                                    <span>
                                        <strong className="block text-[#FFD700] mb-2">The fear of having your beats stolen</strong>
                                        With BeatProtect, every registered beat is official proof that it belongs to you.
                                    </span>
                                </p>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                                <p className="text-lg text-white flex items-start gap-3">
                                    <span className="text-2xl">❌</span>
                                    <span>
                                        <strong className="block text-[#FFD700] mb-2">Losing Proof of Ownership</strong>
                                        Without proper registration, anyone can claim your beat as theirs. BeatProtect gives you a legal
                                        certificate that proves you created it first.
                                    </span>
                                </p>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                                <p className="text-lg text-white flex items-start gap-3">
                                    <span className="text-2xl">❌</span>
                                    <span>
                                        <strong className="block text-[#FFD700] mb-2">
                                            Not knowing what to do if someone uses your beat without permission
                                        </strong>
                                        We provide the tools you need to claim your music and enforce your rights.
                                    </span>
                                </p>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                                <p className="text-lg text-white flex items-start gap-3">
                                    <span className="text-2xl">❌</span>
                                    <span>
                                        <strong className="block text-[#FFD700] mb-2">
                                            Feeling insecure when uploading beats to YouTube or platforms
                                        </strong>
                                        Register them before publishing and upload with the confidence that no one can take them from you.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button onClick={() => navigate('/dashboard')} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white text-lg py-2 px-8 rounded-md duration-300 ease-in-out ">
                            Register Your Beat Now
                        </button>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-16 lg:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-[#FFD700] text-lg font-semibold mb-4">
                        Every minute you wait, someone could be stealing your beat. Sign up now and protect yourself.
                    </h3>
                    <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
                        Don&apos;t wait until they&apos;re stolen. Protect your beats before uploading.
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Make sure every beat you upload is legally protected. Say goodbye to the fear of digital theft.
                    </p>
                    <button onClick={() => navigate('/dashboard')} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white text-lg py-2 px-8 rounded-md duration-300 ease-in-out ">
                        Protect your Beats Today
                    </button>
                </div>
            </section>
            <Testimonial />
            <section id="pricing" className="container mx-auto py-14 lg:py-24">
                <div className="text-center mb-16">
                    <div className=" text-xs sm:text-sm lg:text-base inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-6 lg:mb-8">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7C3AED]"></span>
                        </span>
                        Over 800 producers are already securing their work with Beatprotect
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold text-white">
                        Start Protecting your beats <span className="text-[#7C3AED]">Today</span>
                    </h2>
                </div>






                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Pro Plan */}
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative bg-gray-950 rounded-xl p-8 shadow-2xl flex flex-col h-full">
                            <div className="absolute -top-3 right-4">
                                <span className="bg-[#7C3AED] text-white px-3 py-1 text-sm rounded-full">Popular</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-white">$9.99</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Register 20 Beats per month
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Advanced blockchain protection
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Legal Proof Certification
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Certificate Generation for Every Beat
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    24/7 Beat Protection Coverage
                                </li>
                                <li className="flex items-center text-gray-400">
                                    <X className="h-5 w-5 text-red-500 mr-3" />
                                    Search Songs Using Your Beats
                                </li>
                            </ul>

                            <button onClick={() => handlePlanSelect('pro')} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white mt-auto duration-300 ease-in-out ">Get Pro Monthly</button>
                        </div>
                    </div>

                    {/* Ultra Plan */}
                    <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50 rounded-2xl blur opacity-75" />
                        <div className="relative bg-gray-950 rounded-xl p-8 shadow-2xl flex flex-col h-full border border-[#FFD700]/20">
                            <div className="absolute -top-3 right-4">
                                <span className="bg-[#FFD700] text-black px-3 py-1 text-sm rounded-full font-medium">Ultra</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Ultra</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-white">$14.99</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    Register 20 Beats per month
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    Advanced blockchain protection
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    Legal Proof Certification
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    Certificate Generation for Every Beat
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    24/7 Beat Protection Coverage
                                </li>
                                <li className="flex items-center text-white">
                                    <Check className="h-5 w-5 text-[#FFD700] mr-3" />
                                    Search Songs Using Your Beats
                                </li>
                            </ul>
                            <button onClick={() => handlePlanSelect('ultra')} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white mt-auto duration-300 ease-in-out ">Get Ultra</button>

                        </div>
                    </div>
                </div>
            </section>
            <FAQ />
        </div>
    );
};

export default LandingPage;