import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const faqData = [
    {
        question: "How does BeatProtect work, and what are the benefits?",
        answer:
            "BeatProtect allows music producers to securely register their beats and obtain legal proof of ownership. Once registered, each beat receives a unique digital fingerprint and timestamp, ensuring that you can prove ownership in case of disputes. When you register a beat, BeatProtect generates a legal certificate, which serves as official proof of ownership. This certificate can be used as legal support in case of any copyright dispute on platforms like YouTube, Spotify, or any other digital service where your beat is being used without permission.",
    },
    {
        question: "Can I register beats that are already published on other platforms?",
        answer:
            "Yes! Even if your beat is already uploaded to YouTube, SoundCloud, or any other platform, you can still register it with BeatProtect. This will give you legal proof of ownership, ensuring that you can take action if someone uses your beat without permission.",
    },
    {
        question: "How do credits and subscriptions work?",
        answer:
            "With your subscription, you receive 20 credits each month (1 credit = 1 beat registration). If you need more, you can purchase additional credits at any time. Your subscription renews automatically every month, and you can manage it from your account dashboard.",
    },
    {
        question: "Can I cancel my subscription at any time?",
        answer:
            "Yes, you can cancel your subscription at any time. When you cancel, you will retain access to your registered beats until the end of your billing cycle. After that, your beat protection services will expire, and you will no longer be able to register new beats unless you resubscribe.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="container mx-auto py-12 lg:py-24">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                        24/7 <span className="text-[#7C3AED]">Support</span> for <br /> all music creators
                    </h2>
                    <p className="text-xl text-gray-400">
                        Our dedicated team is here to help protect your music rights, any time.
                    </p>
                </div>

                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50 shadow-lg transition transform "
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center text-left px-6 py-5 text-white font-medium text-lg hover:text-[#7C3AED] transition-all duration-300"
                            >
                                <span>{item.question}</span>
                                <span
                                    className={`text-2xl transform transition-transform ${openIndex === index ? "rotate-180 text-[#7C3AED]" : ""
                                        }`}
                                >
                                    <LuChevronDown />
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-500 ${openIndex === index ? "max-h-96 opacity-100 py-4 px-6 text-gray-300" : "max-h-0 opacity-0"
                                    }`}
                            >
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
