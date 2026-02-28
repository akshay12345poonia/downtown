import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight, Star, TrendingUp, Home, Users, Award } from 'lucide-react';
import { getProperties, getAgents } from '../Services/Api';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
const AGENT_PLACEHOLDER = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';

const formatPrice = (price) => {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
  return `₹${price?.toLocaleString()}`;
};

const StatBar = () => (
  <div className="bg-brand-light py-8 border-b border-brand/10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { icon: <Home size={28} />, value: '500+', label: 'Properties Listed' },
        { icon: <Users size={28} />, value: '10K+', label: 'Happy Clients' },
        { icon: <Award size={28} />, value: '50+', label: 'Expert Agents' },
        { icon: <TrendingUp size={28} />, value: '15+', label: 'Years Experience' }
      ].map((s, i) => (
        <div key={i} className={`px-4 ${i < 3 ? 'md:border-r border-brand/20' : ''}`}>
          <div className="text-brand mb-2 flex justify-center">{s.icon}</div>
          <div className="text-3xl font-black text-text">{s.value}</div>
          <div className="text-sm text-text-muted mt-1 uppercase tracking-wider font-semibold">{s.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const PropertyCard = ({ prop, onClick }) => (
  <div className="property-card group cursor-pointer" onClick={onClick}>
    <div className="relative overflow-hidden h-64">
      <img
        src={prop.images?.[0] || PLACEHOLDER_IMG}
        alt={prop.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <span className={`badge ${prop.type === 'for-rent' ? 'badge-gold' : 'badge-blue'}`}>
          {prop.type === 'for-rent' ? 'For Rent' : 'For Sale'}
        </span>
        {prop.status === 'sold' && <span className="badge badge-red">Sold</span>}
      </div>
      {prop.featured && (
        <div className="absolute top-4 right-4">
          <span className="badge badge-gold shadow-lg shadow-accent/20">⭐ Featured</span>
        </div>
      )}
    </div>
    <div className="property-card-body">
      <div className="property-price">{formatPrice(prop.price)}</div>
      <div className="property-title group-hover:text-brand transition-colors">{prop.title}</div>
      <div className="property-location"><MapPin size={13} />{prop.location}</div>
      <div className="property-meta">
        <span className="property-meta-item"><Bed size={16} className="text-brand/60" />{prop.bedrooms} Bed</span>
        <span className="property-meta-item"><Bath size={16} className="text-brand/60" />{prop.bathrooms} Bath</span>
        <span className="property-meta-item"><Maximize size={16} className="text-brand/60" />{prop.area} sqft</span>
      </div>
    </div>
  </div>
);

const AgentCard = ({ agent, onClick }) => (
  <div className="card group cursor-pointer" onClick={onClick}>
    <div className="relative overflow-hidden h-72">
      <img
        src={agent.photo || AGENT_PLACEHOLDER}
        alt={agent.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <div className="p-6 text-center">
      <div className="text-xl font-bold text-text mb-1 group-hover:text-brand transition-colors">{agent.name}</div>
      <div className="text-sm text-text-muted mb-4 font-medium uppercase tracking-wider">{agent.title || 'Real Estate Agent'}</div>
      <div className="flex gap-2 justify-center flex-wrap">
        {agent.specialties?.slice(0, 2).map((s, i) => (
          <span key={i} className="badge badge-blue">{s}</span>
        ))}
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, rating }) => (
  <div className="card p-8 flex flex-col items-center text-center">
    <div className="flex gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={18}
          fill={i < rating ? "var(--color-accent)" : "none"}
          color={i < rating ? "var(--color-accent)" : "var(--color-border)"}
        />
      ))}
    </div>
    <p className="text-text-muted text-base leading-relaxed italic mb-8">"{text}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand/20">
        {name[0]}
      </div>
      <div className="text-left">
        <div className="font-bold text-text">{name}</div>
        <div className="text-xs text-text-muted uppercase tracking-widest">{role}</div>
      </div>
    </div>
  </div>
);

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Home Buyer', text: 'SilverBrick made finding our dream home effortless. The agents were professional and guided us every step of the way.', rating: 5 },
  { name: 'Priya Mehta', role: 'Property Investor', text: 'I have invested in three properties through this platform. Excellent service, transparent dealings, and great returns.', rating: 5 },
  { name: 'Amit Verma', role: 'First-Time Buyer', text: 'As a first-time buyer, I was nervous. The team made the entire process smooth and stress-free. Highly recommend!', rating: 5 },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [propRes, agentRes] = await Promise.all([
          getProperties({ featured: true }),
          getAgents({ active: 'true' })
        ]);
        setFeaturedProperties(propRes.data.data.properties.slice(0, 6));
        setAgents(agentRes.data.data.agents.slice(0, 3));
      } catch {
        // Load empty state gracefully
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85"
            alt="Luxury Property"
            className="w-full h-full object-cover animate-slowZoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-text/90 via-text/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl animate-fadeUp">
            <span className="inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 text-brand-light text-sm font-bold uppercase tracking-[0.2em] rounded-full mb-6">
              Premium Real Estate Services
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] mb-8">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-cyan-400">Dream Home</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-12">
              Experience the finest collection of luxury properties and expert guidance to help you navigate your real estate journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/properties')}>
                Explore Properties <ArrowRight size={20} />
              </button>
              <button
                className="btn border-2 border-white/30 text-white hover:bg-white hover:text-text btn-lg backdrop-blur-md"
                onClick={() => navigate('/contact')}
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40">
          <div className="w-0.5 h-16 bg-gradient-to-b from-brand/80 to-transparent rounded-full" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* Stats Bar */}
      <StatBar />

      {/* Featured Properties Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="section-tag">Hot Listings</span>
              <h2 className="section-title">Newest Featured Homes</h2>
              <p className="section-subtitle">A curated selection of our most exclusive properties currently available.</p>
            </div>
            <button className="btn btn-outline group" onClick={() => navigate('/properties')}>
              View All Properties <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : featuredProperties.length === 0 ? (
            <div className="bg-surface-muted rounded-3xl p-16 text-center border-2 border-dashed border-border mb-12">
              <Home size={64} className="mx-auto text-border mb-6" />
              <h3 className="text-2xl font-bold text-text mb-2">No Featured Listings Found</h3>
              <p className="text-text-muted mb-8 max-w-md mx-auto">We're currently updating our catalog with new premium properties. Please check back soon or browse our full directory.</p>
              <button className="btn btn-primary" onClick={() => navigate('/properties')}>Browse All Properties</button>
            </div>
          ) : (
            <div className="grid-3 mb-12">
              {featuredProperties.map(p => (
                <PropertyCard key={p._id} prop={p} onClick={() => navigate(`/properties/${p._id}`)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="section bg-surface-muted">
        <div className="max-w-7xl mx-auto container">
          <div className="text-center mb-16">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title mx-auto">The SilverBrick Advantage</h2>
            <p className="section-subtitle mx-auto">Setting the standard in real estate through innovation, transparency, and results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🏆", title: 'Market Leadership', desc: 'Recognized as the industry leader for luxury real estate across the region.' },
              { icon: '🔒', title: 'Absolute Security', desc: 'Every listing undergoes a rigorous 40-point verification process for your peace of mind.' },
              { icon: '💼', title: 'Consultative Approach', desc: 'Our agents act as advisors, prioritizing your goals and investment long-term.' },
              { icon: '📊', title: 'Data-Driven Insights', desc: 'Harnessing real-time market data to ensure you make informed property decisions.' },
              { icon: '🤝', title: 'Integrity First', desc: 'Transparent communication and ethical practices define every interaction we have.' },
              { icon: '📱', title: 'Smart Ecosystem', desc: 'Seamlessly search, tour, and manage your property journey via our digital platform.' },
            ].map((f, i) => (
              <div key={i} className="bg-surface p-10 rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
                <div className="text-5xl mb-6">{f.icon}</div>
                <h3 className="text-xl font-bold text-text mb-3">{f.title}</h3>
                <p className="text-text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="section-tag">Meet the Team</span>
              <h2 className="section-title">Our Expert Advisors</h2>
              <p className="section-subtitle">Dedicated professionals with unparalleled local knowledge and negotiation skills.</p>
            </div>
            <button className="btn btn-outline group" onClick={() => navigate('/agents')}>
              Meet All Agents <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {agents.length === 0 ? (
            <div className="bg-surface-muted rounded-3xl p-16 text-center border-2 border-dashed border-border mb-12">
              <Users size={64} className="mx-auto text-border mb-6" />
              <h3 className="text-2xl font-bold text-text mb-2">Team Directory Unavailable</h3>
              <p className="text-text-muted">Our agents are currently busy closing deals. Contact us directly for immediate assistance.</p>
            </div>
          ) : (
            <div className="grid-3">
              {agents.map(a => (
                <AgentCard key={a._id} agent={a} onClick={() => navigate(`/agents/${a._id}`)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-brand-light/50">
        <div className="max-w-7xl mx-auto container">
          <div className="text-center mb-16">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title mx-auto">Words From Our Clients</h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand/95" />
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80"
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
            alt="Office"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            Begin Your Legacy <br />
            <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Starts Right Here</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you're looking for a family home, a high-yield investment, or your next commercial venture, let SilverBrick be your guide.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="btn btn-gold btn-lg" onClick={() => navigate('/properties')}>
              View Current Listings <ArrowRight size={20} />
            </button>
            <button
              className="btn bg-white/10 hover:bg-white/20 text-white border border-white/30 btn-lg backdrop-blur-md"
              onClick={() => navigate('/contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;