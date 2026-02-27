import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Is Silver Brick a verified real estate platform?",
    answer:
      "Yes. All properties listed on Silver Brick go through a verification process to ensure authenticity, legal clarity, and accurate pricing.",
  },
  {
    question: "Do you charge brokerage or hidden fees?",
    answer:
      "No hidden charges. Any applicable fees are clearly mentioned upfront so you can make informed decisions with complete transparency.",
  },
  {
    question: "Can I book a property visit online?",
    answer:
      "Absolutely. You can schedule property visits directly through our platform at a time that works best for you.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. We use industry-standard security practices to protect your data and ensure safe digital transactions.",
  },
  {
    question: "Do you help with home loans or documentation?",
    answer:
      "Yes. Our experts assist with home loan guidance, documentation, and end-to-end support until possession.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-16">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Clear answers to help you move forward with confidence.
        </p>
      </div>

      {/* FAQ Cards */}
      <div className="max-w-4xl mx-auto mt-14 space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md
              transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>

                <FaChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 px-6 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Still have questions?
          <a
            href="/contact"
            className="ml-2 font-medium text-blue-600 hover:underline"
          >
            Contact our team
          </a>
        </p>
      </div>

    </div>
  );
};

export default FAQ;