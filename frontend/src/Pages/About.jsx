import React from 'react';
import { Home, Users, Building2, ShieldCheck, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-text">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/30 via-text/90 to-text" />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
            alt="Corporate Building"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="section-tag bg-brand/30 text-white border-none mb-6">Our Legacy</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-8">
            Redefining <span className="text-brand">Real Estate</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            SilverBrick is built on a vision of absolute transparency and premium service. We help thousands find their place in the world with confidence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section bg-white group">
        <div className="max-w-7xl mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand/5 rounded-3xl -rotate-2 transform transition-transform group-hover:rotate-0 duration-700" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1574950578143-85f0b9776f3d?w=800&q=80"
                alt="Our Story"
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-brand text-white p-8 rounded-3xl shadow-xl shadow-brand/20 hidden md:block">
              <div className="text-5xl font-black mb-2">15+</div>
              <div className="text-sm font-black uppercase tracking-widest text-white/70">Years of Experience</div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <span className="section-tag">Since 2010</span>
            <h2 className="section-title mb-2">A Journey Built on Trust and Excellence</h2>
            <div className="space-y-6 text-text-muted leading-relaxed">
              <p>
                From our humble beginnings as a small consultancy in Kanpur, SilverBrick has evolved into a powerhouse of real estate innovation. We understood early on that buying a property isn't just a transaction; it's the foundation of a family's future or a business's growth.
              </p>
              <p>
                Our philosophy is simple: Put the client first, leverage modern technology, and maintain uncompromising integrity. This approach has allowed us to scale while maintaining the personal touch that our clients value most.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="p-6 bg-surface-muted rounded-2xl">
                <div className="text-brand mb-4"><ShieldCheck size={32} /></div>
                <h4 className="font-black text-text mb-2">Verified Only</h4>
                <p className="text-sm text-text-muted">100% of our listings are physically verified.</p>
              </div>
              <div className="p-6 bg-surface-muted rounded-2xl">
                <div className="text-brand mb-4"><Users size={32} /></div>
                <h4 className="font-black text-text mb-2">Expert Team</h4>
                <p className="text-sm text-text-muted">50+ certified agents at your service.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission/Vision */}
      <section className="section bg-text text-white">
        <div className="max-w-7xl mx-auto container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="p-12 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-6">
              <div className="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center text-white">
                <Building2 size={32} />
              </div>
              <h3 className="text-3xl font-black">Our Mission</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                To empower individuals and businesses to make superior property decisions by providing transparent data, expert advice, and a seamless digital experience.
              </p>
            </div>
            <div className="p-12 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-6">
              <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-white">
                <Home size={32} />
              </div>
              <h3 className="text-3xl font-black">Our Vision</h3>
              <p className="text-white/60 leading-relaxed text-lg">
                To be the most trusted and influential real estate platform globally, recognized for setting new standards of ethical practice and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder CTA */}
      <section className="section bg-surface-muted">
        <div className="max-w-5xl mx-auto container text-center">
          <div className="mb-12">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-8 border-4 border-white shadow-xl">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" className="w-full h-full object-cover" alt="Founder" />
            </div>
            <h3 className="text-2xl font-black text-text mb-2">Kumar Nitin</h3>
            <p className="text-brand font-bold uppercase tracking-widest text-xs">Founder & CEO, SilverBrick</p>
          </div>
          <blockquote className="text-2xl md:text-3xl font-serif italic text-text/80 leading-relaxed mb-12">
            "Real estate is about more than just square footage and price per unit. It's about dreams, security, and building a legacy. Our job is to protect those dreams."
          </blockquote>
          <button className="btn btn-primary" onClick={() => navigate('/contact')}>
            Partner With Us <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;