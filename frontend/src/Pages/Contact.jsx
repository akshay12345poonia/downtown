import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-16">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Let’s Talk
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Questions, collaborations, or property inquiries —
          we’re just a message away.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Contact Cards */}
        <div className="space-y-6">
          {[
            {
              icon: <FaMapMarkerAlt />,
              title: "Visit Us",
              text: "Kanpur, Uttar Pradesh, India",
            },
            {
              icon: <FaPhoneAlt />,
              title: "Call Us",
              text: "+91 98765 43210",
            },
            {
              icon: <FaEnvelope />,
              title: "Email",
              text: "support@silverbrick.com",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/70 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-md
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center
                transition group-hover:scale-110">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 md:p-10
        transition-all duration-300 hover:shadow-2xl">

          <h2 className="text-2xl font-semibold text-gray-900">
            Send us a message
          </h2>
          <p className="mt-2 text-gray-600">
            We usually reply within 24 hours.
          </p>

          <form className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="col-span-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="col-span-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="md:col-span-2 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              rows="4"
              placeholder="Tell us what you’re looking for..."
              className="md:col-span-2 px-4 py-3 border rounded-xl resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              className="md:col-span-2 flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-xl
              font-medium transition hover:bg-blue-700 hover:scale-[1.02]"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <iframe
            title="Silver Brick Location"
            src="https://www.google.com/maps?q=Kanpur,India&output=embed"
            className="w-full h-[380px] border-0"
            loading="lazy"
          />
        </div>
      </div>

    </div>
  );
};

export default Contact;