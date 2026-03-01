import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Award, Star, ArrowRight, Home, Users } from 'lucide-react';
import { getAgents, mediaUrl } from '../Services/Api';

const AGENT_PLACEHOLDER = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';

const AgentCard = ({ agent, onClick }) => (
  <div className="card group cursor-pointer" onClick={onClick}>
    <div className="relative h-80 overflow-hidden">
      <img
        src={mediaUrl(agent.photo) || AGENT_PLACEHOLDER}
        alt={agent.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-xl font-black text-white mb-1 group-hover:text-brand transition-colors">{agent.name}</h3>
        <p className="text-sm text-white/70 font-bold uppercase tracking-widest">{agent.title || 'Property Consultant'}</p>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < 5 ? "var(--color-accent)" : "none"} color={i < 5 ? "var(--color-accent)" : "var(--color-border)"} />
          ))}
        </div>
        <span className="text-xs font-bold text-text-muted">15+ Deals Closed</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {agent.specialties?.slice(0, 3).map((s, i) => (
          <span key={i} className="badge badge-blue">{s}</span>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-brand font-black text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
        View Full Profile <ArrowRight size={14} />
      </div>
    </div>
  </div>
);

const Agents = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await getAgents({ active: 'true' });
        setAgents(res.data.data.agents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Page Hero */}
      <section className="relative pt-40 pb-24 bg-text overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-text/95 to-text" />
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
            alt="Office"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="section-tag bg-brand/30 text-white border-none mb-6">Our Experts</span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-8">
            The Faces of <span className="text-brand">Trust.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Work with the industry's most dedicated real estate professionals who bring local expertise and global standards to every transaction.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="spinner" />
          </div>
        ) : agents.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-border flex flex-col items-center">
            <Users size={64} className="text-slate-300 mb-6" />
            <h3 className="text-2xl font-bold text-text mb-4">Our Team is Growing</h3>
            <p className="text-text-muted max-w-sm mb-8">We're currently onboarding new experts to serve you better. Please contact our main office for assistance.</p>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>Contact Support</button>
          </div>
        ) : (
          <div className="grid-3">
            {agents.map(agent => (
              <AgentCard
                key={agent._id}
                agent={agent}
                onClick={() => navigate(`/agents/${agent._id}`)}
              />
            ))}
          </div>
        )}

        {/* Join the Team CTA */}
        <div className="mt-32 bg-brand rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Want to Join Our Elite Team?</h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              We're always looking for ambitious and ethical real estate professionals to help us redefine the industry.
            </p>
            <button className="btn bg-white text-brand hover:bg-white/90 btn-lg shadow-xl" onClick={() => navigate('/careers')}>
              View Openings <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agents;