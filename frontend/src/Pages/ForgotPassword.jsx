import React from "react";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
            <FaShieldAlt className="text-blue-600 text-xl" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Forgot your password?
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            No worries. Enter your email and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a
            href="/signin"
            className="font-medium text-blue-600 hover:underline"
          >
            Back to Sign in
          </a>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;