import React from "react";
import Vill1 from "../assets/reginasphotos-beach-villas-1591442_1920.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src={Vill1}
        alt="Luxury Villa"
        className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[4000ms]"
      />

      {/* Dark Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 flex flex-col items-center justify-center text-center px-6">

        {/* Small Tagline */}
        <p className="uppercase tracking-[4px] text-sm md:text-base text-gray-300 mb-4">
          Premium Real Estate
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl">
          Find Your <span className="text-blue-500">Dream Property</span>
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-base md:text-lg max-w-2xl mt-6">
          Discover extraordinary homes and investment opportunities with our expert
          team of trusted real estate professionals.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <button onClick={() => navigate("/properties")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition duration-300">
            Explore Properties
          </button>

          <button onClick={() => navigate("/booking")} className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300">
            Book A Consultant
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;