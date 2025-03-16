import { useEffect, useState, useRef } from "react";

const easeOutQuad = (t) => t * (2 - t);

const AnimatedCounter = ({ end, duration = 5000 }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [hasAnimated]);

    useEffect(() => {
        if (!hasAnimated) return;

        const startTime = Date.now();
        let frame;

        const animate = () => {
            const currentTime = Date.now();
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeOutQuad(progress);

            setCount(Math.floor(easedProgress * end));

            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame);
    }, [hasAnimated, end, duration]);

    return <span ref={ref} className="tabular-nums">{count.toLocaleString()}</span>;
};

const StatsSection = () => {
    return (
        <section className="container mx-auto lg:py-24">
            <div className="text-center mb-8 lg:mb-16">
                <h2 className="text-3xl md:text-6xl font-bold text-white mb-4">
                    Real Results: <span className="text-[#7C3AED]">Protecting Producers Worldwide</span>
                </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Stat 1 - Beats Registered */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-[#7C3AED]/50 transition duration-300">
                        <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center mb-6">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lockicon1-V4COIUOGBfAGw3B8DOB7qrkhKFS004.png"
                                alt="Digital Lock Icon"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        </div>
                        <h3 className="text-5xl font-bold text-white mb-2 flex items-baseline gap-1">
                            <AnimatedCounter end={5279} />
                            <span className="text-sm font-normal text-gray-400">beats</span>
                        </h3>
                        <p className="text-gray-400">Successfully Registered</p>
                    </div>
                </div>

                {/* Stat 2 - Producers Protected */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]/50 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-[#7C3AED]/50 transition duration-300">
                        <div className="w-12 h-12 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center mb-6">
                            <img
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/usericon3-lZNMo5BAOxzj49Srx6x9PhLVinIo48.png"
                                alt="Users Group Icon"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                        </div>
                        <h3 className="text-5xl font-bold text-white mb-2 flex items-baseline gap-1">
                            <AnimatedCounter end={743} />
                            <span className="text-sm font-normal text-gray-400">producers</span>
                        </h3>
                        <p className="text-gray-400">Protecting Their Beats</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
