import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="text-brand" size={24} />,
      title: 'Call Us Directly',
      detail: '+91 8707538123',
      sub: 'Mon-Sun, 9am - 8pm'
    },
    {
      icon: <Mail className="text-brand" size={24} />,
      title: 'Email Support',
      detail: 'hello@downtown.realty',
      sub: '24/7 Support Response'
    },
    {
      icon: <MapPin className="text-brand" size={24} />,
      title: 'Visit Our HQ',
      detail: '123 Civil Lines, Kanpur',
      sub: 'Uttar Pradesh, India'
    },
    {
      icon: <Globe className="text-brand" size={24} />,
      title: 'Social Connect',
      detail: '@silverbrick.realty',
      sub: 'LinkedIn, Twitter, IG'
    }
  ];

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-text">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="section-tag bg-brand/30 text-white border-none mb-6">Contact Us</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-8">
            Talk to <span className="text-brand">SilverBrick.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about a listing, want to sell your property, or just want to chat about market trends — we're here to help.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h2 className="text-3xl font-black text-text mb-6">Get in Touch</h2>
              <p className="text-text-muted leading-relaxed">
                Reach out to us through any of these channels. Our specialized team is ready to assist you with any real estate inquiry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
              {contactMethods.map((method, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center shrink-0">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-text text-sm mb-1">{method.title}</h4>
                    <p className="text-brand font-bold text-base">{method.detail}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1 font-bold">{method.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-text rounded-3xl text-white text-center">
              <Clock className="mx-auto mb-4 text-brand" size={32} />
              <h4 className="text-lg font-black mb-2">Always Available</h4>
              <p className="text-white/50 text-sm">We respond to 95% of inquiries within 2 hours during business operations.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-brand/5 border border-border/40 relative overflow-hidden">
              {/* Decorative Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

              {success ? (
                <div className="text-center py-20 animate-fadeUp">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Send size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-text mb-4">Message Sent!</h2>
                  <p className="text-text-muted mb-10 max-w-md mx-auto">Thank you for reaching out. One of our specialist agents will review your message and get back to you shortly.</p>
                  <button className="btn btn-outline" onClick={() => setSuccess(false)}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="form-label">Your Name</label>
                      <div className="input-group">
                        <input
                          className="form-input"
                          placeholder="Enter Your Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-input"
                          placeholder="Enter Your Email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Subject</label>
                    <div className="input-group">
                      <input
                        className="form-input"
                        placeholder="Property Inquiry: Skyview Apartments"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Your Message</label>
                    <div className="input-group items-start">
                      <MessageSquare size={18} className="text-text-muted mt-2" />
                      <textarea
                        className="form-input ml-2 h-40 resize-none pt-2"
                        placeholder="Tell us how we can help you today..."
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full shadow-xl shadow-brand/20"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : (
                      <>Send Message <ArrowRight size={20} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map or Office Image Section */}
      <section className="h-[500px] w-full bg-slate-200 relative grayscale hover:grayscale-0 transition-all duration-1000">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600"
          className="w-full h-full object-cover"
          alt="Our Office"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md animate-fadeUp">
            <h3 className="text-2xl font-black text-text mb-2">Visit SilverBrick HQ</h3>
            <p className="text-text-muted mb-6">Civil Lines, Kanpur, Uttar Pradesh 208001</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;