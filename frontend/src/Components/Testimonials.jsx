import React from "react";
import { Star } from "lucide-react";

const TestimonialCard = ({ name, role, text, rating }) => (
  <div className="card bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300">
    {/* Rating Stars */}
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < rating ? "#F59E0B" : "none"}
          color={i < rating ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </div>

    {/* Testimonial Text */}
    <p className="text-gray-600 text-base leading-relaxed italic mb-8">
      "{text}"
    </p>

    {/* User Info */}
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-bold text-lg shadow-lg">
        {name[0]}
      </div>
      <div className="text-left">
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">
          {role}
        </div>
      </div>
    </div>
  </div>
);

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "Home Buyer",
    text:
      "SilverBrick made finding our dream home effortless. The agents were professional and guided us every step of the way.",
    rating: 5,
  },
  {
    name: "Priya Mehta",
    role: "Property Investor",
    text:
      "I have invested in three properties through this platform. Excellent service, transparent dealings, and great returns.",
    rating: 5,
  },
  {
    name: "Amit Verma",
    role: "First-Time Buyer",
    text:
      "As a first-time buyer, I was nervous. The team made the entire process smooth and stress-free. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our happy customers who trusted us with their real estate journey.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;