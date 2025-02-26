import React from 'react';
import { LuStar } from 'react-icons/lu';
import testimonials from '../../../public/tesimonials.json';

const Testimonial = () => {
    return (
        <div>
            <section className="container mx-auto py-10 lg:py-24">
                <div className="text-center mb-8 lg:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Trusted by Producers <span className="text-[#7C3AED]">Worldwide</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Join thousands of music producers who trust BeatProtect to secure their creative work
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="relative group">
                            <div className="absolute -inset-1 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                            <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-[#7C3AED]/50 transition duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt="Producer Avatar"
                                        width={80}
                                        height={80}
                                        className="rounded-full object-cover"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{testimonial.name} {testimonial.country}</h3>
                                        <div className="flex items-center gap-1 text-[#7C3AED]">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <LuStar key={i} className="w-4 h-4 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400">&quot;{testimonial.testimonial}&quot;</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Testimonial;
