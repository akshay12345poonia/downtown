import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowRight, Star, TrendingUp, Home, Users, Award } from 'lucide-react';
import { getProperties, getAgents, mediaUrl } from '../Services/Api';
import SilverBrickAdvantage from '../Components/SilverBrickAdvantage';
import Testimonials from '../Components/Testimonials';
import CTA from '../Components/CTA';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';
const AGENT_PLACEHOLDER = 'https://cdn.pixabay.com/photo/2024/05/26/11/33/business-8788604_1280.jpg';

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
        src={mediaUrl(prop.images?.[0]) || PLACEHOLDER_IMG}
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
        src={mediaUrl(agent.photo) || AGENT_PLACEHOLDER}
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

      <SilverBrickAdvantage />

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
      <Testimonials />

      {/* Final CTA Section */}
      <CTA />
    </div>
  );
};

export default HomePage;