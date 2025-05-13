import React, { useEffect } from 'react';
import { Fa0 } from 'react-icons/fa6';
import { LuCheck } from "react-icons/lu";
import FAQ from '../../Components/FAQ/FAQ';
import { Check, X } from 'lucide-react';
const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className='px-4 2xl:px-0'>
            <section id="pricing" className="container mx-auto py-16 lg:py-24">
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

                            <button onClick={() => navigate('/payment')} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white mt-auto duration-300 ease-in-out ">Get Pro Monthly</button>
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
                            <button onClick={() => navigate('/payment')} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-md text-white mt-auto duration-300 ease-in-out ">Get Ultra</button>

                        </div>
                    </div>
                </div>
            </section>
            <FAQ />
        </div>
    );
};

export default Pricing;