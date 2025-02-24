import React, { useContext } from 'react';
import { FaBell, FaMusic, FaTiktok } from 'react-icons/fa';
import { HiOutlineShieldCheck, HiShieldCheck } from 'react-icons/hi';
import { LuBarChart3, LuLineChart, LuUpload, LuFileText, LuCheck, LuSearch, LuBell, LuGlobe, LuMusic, LuShield, LuShieldCheck, LuTwitter, LuInstagram } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import Testimonial from '../../Components/Testimonial/Testimonial';
import StatsSection from '../../Components/AnimatedCounter/AnimatedCounter';
import FAQ from '../../Components/FAQ/FAQ';
import ContactUs from '../ContactUs/ContactUs';
import { AuthContext } from '../../Provider/AuthProvider';


const LandingPage = () => {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id "${id}" not found`);
            return;
        }

        const startPosition = window.pageYOffset;
        const targetPosition = element.getBoundingClientRect().top + startPosition;
        const distance = targetPosition - startPosition;

        // Increased duration for slower overall movement
        const duration = 1500;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Custom easing function for gentler acceleration and slower overall speed
            const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

            // Add smoothing factor to reduce speed
            const smoothedEase = Math.pow(ease, 1.5);

            window.scrollTo(0, startPosition + distance * smoothedEase);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    };
    return (
        <div className='bg-black  px-4 2xl:px-0'>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm px-4 xl:px-0">
                <div className="container mx-auto flex items-center justify-between py-4">
                    <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-white">
                        BeatProtect
                    </button>
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white">
                            Contact
                        </button>
                        <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white">
                            Pricing
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {
                            user ? (
                                <button onClick={logout} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md">Logout</button>
                            ) : (
                                <Link to="/login" className="text-gray-300 hover:text-white">
                                    Sign In
                                </Link>
                            )
                        }
                        {
                            user
                                ?
                                <div>
                                    <Link to="/dashboard" className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md">Dashboard</Link>
                                </div>
                                :

                                <button onClick={() => navigate('/dashboard')} className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-4 py-2 rounded-md"> Get Started
                                </button>
                        }
                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <main id="hero" className="container mx-auto pt-20 pb-16 mt-4">
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
                        <button onClick={() => navigate('/dashboard')}  className="bg-[#7C3AED] hover:bg-[#7C3AED]/90 text-white px-10 py-2 rounded-md duration-300 ease-in-out">
                            Register Your Beat Now
                        </button>
                    </div>
                </div>
            </main>
            {/* Results Section */}
            <section className="container mx-auto py-24">
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
            <section className="container mx-auto py-24">
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
            {/* Dashboard Preview Section */}
            <section className="container mx-auto py-16">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">
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
            <section className="container mx-auto py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block">
                            <div className="flex items-center gap-2 text-[#7C3AED] font-medium mb-4">
                                <LuShield className="w-5 h-5" />
                                <span>Legal Protection</span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Your Beat, Protected with{" "}
                            <span className="bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 text-transparent bg-clip-text">
                                International Legal Proof
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            At BeatProtect, we know how important it is to keep your music safe from unauthorized use. That&apos;s why
                            every time you register a beat, we generate solid legal proof using Safe Creative technology.
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
                                <p className="text-lg text-white mb-6">
                                    Don&apos;t leave your music unprotected. Register your first beat today and ensure it&apos;s yours
                                    forever.
                                </p>
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
            <section className="container mx-auto py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Protect Your Beats with Secure Digital Registration
                        </h2>
                        <p className="text-xl text-gray-400 max-w-lg">
                            Our platform allows you to register your beats quickly and legally, generating a digital certificate with
                            SafeCreative. Each beat receives a unique cryptographic fingerprint and a dual timestamp seal recognized
                            globally, ensuring authenticity and protection in any copyright dispute. Register your music with
                            confidence, knowing you can always prove your ownership.
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

            <section className="container mx-auto py-24">
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
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
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

            <section className="container mx-auto py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
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
                    <div className="mb-16">
                        <h3 className="text-4xl font-bold text-white mb-8">What You&apos;ll Avoid with BeatProtect:</h3>

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
            <section className="container mx-auto py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-[#FFD700] text-lg font-semibold mb-4">
                        Every minute you wait, someone could be stealing your beat. Sign up now and protect yourself.
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
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
            <section id="pricing" className="container mx-auto py-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-8">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7C3AED]"></span>
                        </span>
                        <p className="text-lg font-medium bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 bg-clip-text text-transparent">
                            Over 800 producers are already securing their work with BeatProtect
                        </p>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white">
                        Start Protecting your beats <span className="text-[#7C3AED]">Today</span>
                    </h2>
                </div>

                <div className="max-w-xl mx-auto">
                    {/* Monthly Plan */}
                    <div className="relative ">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75" />
                        <div className="relative bg-gray-950 rounded-xl p-8 shadow-2xl flex flex-col h-full">
                            <div className="absolute -top-3 right-4">
                                <span className="bg-[#7C3AED] text-white px-3 py-1 text-sm rounded-full">Popular</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">Pro Monthly</h3>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold text-white">$9.99</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center text-white">
                                    <LuCheck className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Register 20 Beats per month
                                </li>
                                <li className="flex items-center text-white">
                                    <LuCheck className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Advanced blockchain protection
                                </li>
                                <li className="flex items-center text-white">
                                    <LuCheck className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Legal Proof Certification
                                </li>
                                <li className="flex items-center text-white">
                                    <LuCheck className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Certificate Generation for Every Beat
                                </li>
                                <li className="flex items-center text-white">
                                    <LuCheck className="h-5 w-5 text-[#7C3AED] mr-3" />
                                    Get Extra Credits to Register More Beats
                                </li>
                            </ul>

                            <button onClick={() => navigate('/payment')} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white mt-auto duration-300 ease-in-out ">Get Pro Monthly</button>
                        </div>
                    </div>
                </div>
            </section>
            <FAQ />
            <section id="contact">
                <ContactUs />
            </section>
            <footer className="bg-black border-t border-gray-800">
                <div className="container mx-auto py-12 md:py-16 lg:py-20">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Column 1: Logo and Description */}
                        <div className="space-y-6">
                            <Link href="/" className="text-2xl font-bold text-white">
                                BeatProtect
                            </Link>
                            <p className="text-gray-400 text-sm max-w-[400px]">
                                BeatProtect is your trusted partner in music protection. We provide cutting-edge blockchain technology
                                and legal tools to secure your musical creations, ensuring your rights are protected worldwide.
                            </p>
                        </div>

                        {/* Column 2: Navigation */}
                        <div className="grid gap-8">
                            <div className="space-y-4">
                                <h3 className="text-white font-semibold">Menu</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white text-sm">
                                            Pricing
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => scrollToSection('contact')}className="text-gray-400 hover:text-white text-sm">
                                            Contact Us
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Column 3: Social Media */}
                        <div className="space-y-4">
                            <h3 className="text-white font-semibold">Follow Us</h3>
                            <div className="flex flex-col space-y-3">
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <LuInstagram className="w-5 h-5" />
                                    Instagram
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <LuTwitter className="w-5 h-5" />
                                    Twitter
                                </Link>
                                <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-2">
                                    <FaTiktok className="w-5 h-5" />
                                    TikTok
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800">
                    <div className="container mx-auto py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex gap-4 text-sm text-gray-400">
                            <Link href="/terms" className="hover:text-white">
                                Terms of Use
                            </Link>
                            <Link href="/privacy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                        </div>
                        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} BeatProtect. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;