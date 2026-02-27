import React from "react";
import { FaShieldAlt, FaHome, FaUsers, FaGoogle } from "react-icons/fa";

const Signin = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

        {/* LEFT CONTENT */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <h1 className="text-2xl font-semibold text-gray-900">
            Silver Brick
          </h1>

          <h2 className="mt-6 text-4xl font-bold text-gray-900 leading-tight">
            Your Next Move <br /> Starts Here
          </h2>

          <p className="mt-6 text-gray-600 max-w-md leading-relaxed">
            Access your saved properties, manage inquiries, and explore
            verified real estate opportunities tailored just for you.
          </p>

          <div className="mt-10 space-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <FaUsers className="text-blue-600" />
              <span>10K+ Happy Customers</span>
            </div>

            <div className="flex items-center gap-3">
              <FaHome className="text-blue-600" />
              <span>500+ Verified Properties</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-blue-600" />
              <span>100% Secure Transactions</span>
            </div>
          </div>

          <p className="mt-12 text-sm text-gray-500">
            Sign in and pick up where you left off.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900">
              Sign In to Your Account
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Glad to see you again.
            </p>

            <form className="mt-8 space-y-5">
              <input
                type="email"
                placeholder="Email Address"
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
                Continue
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
              <FaGoogle />
              Continue with Google
            </button>

            <div className="mt-6 text-center text-sm text-gray-600 space-y-3">
              <a href="/forgotpassword" className="hover:underline">
                Forgot password?
              </a>

              <p>
                Don’t have an account?{" "}
                <a href="/signup" className="font-medium text-blue-600 hover:underline">
                  Create one
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signin;