import React from "react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="text-center max-w-lg">

        {/* Animated Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 animate-bounce">
          <FaExclamationTriangle className="text-blue-600 text-3xl" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! This page went missing
        </h2>

        {/* Quote */}
        <p className="mt-4 text-gray-600 leading-relaxed">
          “Sometimes the path you’re looking for doesn’t exist —
          but that doesn’t mean your journey is over.”
        </p>

        <p className="mt-2 text-sm text-gray-500">
          You can head back home or take a short pause and try again.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition"
          >
            <FaHome />
            Take Me Home
          </a>

          <button
            onClick={() => window.history.back()}
            className="rounded-lg border px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>

        {/* Small fun text */}
        <p className="mt-10 text-xs text-gray-400 italic">
          Still lost? Maybe grab a coffee ☕ and try again in a moment.
        </p>

      </div>
    </div>
  );
};

export default PageNotFound;