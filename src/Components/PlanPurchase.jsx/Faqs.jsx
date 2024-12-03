import React, { useState, useRef } from "react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How can I register my beats on the platform?",
      answer:
        "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget.",
    },
    {
      question: "What kind of protection does digital beat registration offer?",
      answer:
        "You can book by contacting our support team or using our online booking system.",
    },
    {
      question: "How long are my beat registrations kept on the platform?",
      answer: "Tour packages include accommodation, transportation, and guided tours.",
    },
    {
      question: "Can I update or modify the information of an already registered beat?",
      answer: "Yes, we offer optional travel insurance for all our tours.",
    },
    {
      question: "How can I prove ownership of my beat if someone uses it without permission?",
      answer: "We have flexible rescheduling policies. Contact support for assistance.",
    },
  ];

  return (
    <div className="max-w-[1216px] lg:px-8 xl:px-0 mx-auto">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-center mb-24">Frequently Asked Questions</h2>
        <div>
          <div className="grid gap-4 divide-gray-200">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="hs-accordion pl-6 pb-5 pr-5 pt-4"
              >
                <button
                  className="flex items-center justify-between text-left w-full border-b-2 border-[#181818] pb-3"
                  onClick={() => toggleFAQ(index)}
                >
                  <h5
                    className={`${
                      activeIndex === index ? "text-[#7837eb]" : ""
                    } w-full text-base md:text-xl font-medium`}
                  >
                    {faq.question}
                  </h5>
                  <div className="">
                    <svg
                      className={`w-6 h-6 transition duration-500 ${
                        activeIndex === index ? "hidden" : "block"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18M12 18V6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <svg
                      className={`w-6 h-6 transition duration-500 ${
                        activeIndex === index ? "block text-[#7837eb]" : "hidden"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H18"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </button>
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? "max-h-[200px]" : "max-h-0"
                  }`}
                  style={{
                    height: activeIndex === index ? contentRefs.current[index]?.scrollHeight : 0,
                  }}
                >
                  <p className={`text-base font-normal mt-4 ${
                      activeIndex === index ? "text-[#a583e0]" : ""
                    }`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
