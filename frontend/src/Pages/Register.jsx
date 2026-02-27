import React from "react";
import { FaShieldAlt, FaHome, FaUsers, FaGoogle } from "react-icons/fa";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT CONTENT */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <h1 className="text-2xl font-semibold text-gray-900">
            Silver Brick
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Building Trust. One Brick at a Time.
          </p>

          <h2 className="mt-8 text-4xl font-bold text-gray-900 leading-tight">
            Start Your Property <br /> Journey Today
          </h2>

          <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
            Join Silver Brick and unlock premium real estate opportunities.
            Discover homes, commercial spaces, and smart investments curated
            by trusted professionals.
          </p>

          <div className="mt-10 space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <FaHome className="text-blue-600" />
              <span>Verified & Trusted Listings</span>
            </div>

            <div className="flex items-center gap-3">
              <FaUsers className="text-blue-600" />
              <span>Expert Property Advisors</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-blue-600" />
              <span>Secure Digital Transactions</span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Create Your Account
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              It only takes a minute.
            </p>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              <FaGoogle />
              Sign up with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;