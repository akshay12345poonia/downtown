import React from "react";
import Vill1 from "../assets/reginasphotos-beach-villas-1591442_1920.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Image */}
      <img
        src={Vill1}
        alt="Luxury Villa"
        className="absolute inset-0 w-full h-full object-cover scale-110 animate-[slowZoom_20s_linear_infinite]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 flex items-center justify-center text-center px-6">

        <div className="max-w-4xl mx-auto">

          {/* Tagline */}
          <p className="uppercase tracking-[5px] text-xs md:text-sm text-gray-300 mb-6 animate-fadeUp">
            Premium Real Estate
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight animate-fadeUp">
            Find Your{" "}
            <span className="text-blue-500">Dream Property</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg mt-6 max-w-2xl mx-auto animate-fadeUp">
            Discover extraordinary homes and investment opportunities with our
            expert team of trusted real estate professionals.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-10 justify-center animate-fadeUp">
            <button
              onClick={() => navigate("/properties")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              Explore Properties
            </button>

            <button
              onClick={() => navigate("/booking")}
              className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Book A Consultant
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;