import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Star, ArrowLeft, MessageSquare, ShieldCheck, Award, Briefcase, GraduationCap } from 'lucide-react';
import { getAgent, getProperties, mediaUrl } from '../Services/Api';

const AGENT_PLACEHOLDER = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80';

const AgentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [agent, setAgent] = useState(null);
    const [agentProperties, setAgentProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const [agentRes, propRes] = await Promise.all([
                    getAgent(id),
                    getProperties({ agent: id, limit: 3 })
                ]);
                setAgent(agentRes.data.data.agent);
                setAgentProperties(propRes.data.data.properties);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAgentData();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="spinner" />
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-surface p-6 text-center">
                <h2 className="text-3xl font-black text-text mb-4">Agent Not Found</h2>
                <p className="text-text-muted mb-8 max-w-md">The agent profile you're looking for doesn't exist or has been removed from our directory.</p>
                <button className="btn btn-primary" onClick={() => navigate('/agents')}>Back to Agents</button>
            </div>
        );
    }

    return (
        <div className="bg-surface pb-24">
            {/* Header / Breadcrumbs */}
            <div className="pt-32 pb-12 bg-text relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/50 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={16} /> Back to Team
                    </button>
                    <div className="flex flex-col md:flex-row md:items-end gap-8">
                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
                            <img src={mediaUrl(agent.photo) || AGENT_PLACEHOLDER} className="w-full h-full object-cover" alt={agent.name} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-5xl font-black text-white mb-2">{agent.name}</h1>
                            <p className="text-brand font-black text-lg uppercase tracking-[0.2em] mb-4">{agent.title || 'SilverBrick Property Advisor'}</p>
                            <div className="flex flex-wrap gap-6 text-white/60 text-sm">
                                <span className="flex items-center gap-2"><MapPin size={16} className="text-brand" /> {agent.location || 'Kanpur, UP'}</span>
                                <span className="flex items-center gap-2"><Star size={16} className="text-accent" /> 4.9 Agent Rating</span>
                                <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-400" /> Verified Expert</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-12">

                    {/* About Section */}
                    <section className="bg-white p-10 rounded-3xl border border-border/40 shadow-sm">
                        <h2 className="text-2xl font-black text-text mb-6">About {agent.name.split(' ')[0]}</h2>
                        <div className="prose prose-slate max-w-none text-text-muted leading-relaxed">
                            <p className="mb-6">
                                With over a decade of experience in the real estate market, {agent.name} has built a reputation for excellence, integrity, and results. Specializing in high-end residential and investment properties, {agent.name.split(' ')[0]} brings a analytical yet personal approach to every deal.
                            </p>
                            <p>
                                Prior to joining SilverBrick, {agent.name.split(' ')[0]} worked with leading international firms, where they developed a keen eye for market trends and a vast network of connections. Their commitment to client satisfaction is evidenced by their 95% referral rate.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-12 border-t border-border/60">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand shrink-0">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-text text-sm mb-1 uppercase tracking-widest">Awards</h4>
                                    <p className="text-sm text-text-muted">Top Producer 2023, Elite Circle Member</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand shrink-0">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-text text-sm mb-1 uppercase tracking-widest">Specialties</h4>
                                    <p className="text-sm text-text-muted">Luxury Estates, Investment Portfolios</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Specialties / Service Area */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm">
                            <h4 className="text-lg font-black text-text mb-4 uppercase tracking-wider">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {agent.specialties?.map((s, i) => (
                                    <span key={i} className="px-4 py-2 bg-brand/5 text-brand text-xs font-bold rounded-xl border border-brand/10">{s}</span>
                                ))}
                                {(!agent.specialties || agent.specialties.length === 0) && (
                                    ['Residential Sales', 'Market Analysis', 'Negotiation', 'Luxury Real Estate'].map(s => (
                                        <span key={s} className="px-4 py-2 bg-brand/5 text-brand text-xs font-bold rounded-xl border border-brand/10">{s}</span>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-border/40 shadow-sm">
                            <h4 className="text-lg font-black text-text mb-4 uppercase tracking-wider">Communication</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-muted">English</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-1 rounded-full bg-brand" />)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-text-muted">Hindi</span>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => <div key={i} className={`w-3 h-1 rounded-full ${i < 4 ? 'bg-brand' : 'bg-slate-200'}`} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Recent Listings */}
                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-text">Active Listings by {agent.name.split(' ')[0]}</h2>
                            <Link to="/properties" className="text-brand font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                All Property <ArrowRight size={16} />
                            </Link>
                        </div>

                        {agentProperties.length === 0 ? (
                            <div className="bg-surface-muted rounded-2xl p-12 text-center border border-border">
                                <p className="text-text-muted">No active listings currently. Contact {agent.name.split(' ')[0]} for offline opportunities.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {agentProperties.map(prop => (
                                    <div key={prop._id} className="property-card group cursor-pointer shadow-sm shadow-brand/5" onClick={() => navigate(`/properties/${prop._id}`)}>
                                        <div className="h-44 overflow-hidden relative">
                                            <img src={mediaUrl(prop.images?.[0]) || PLACEHOLDER_IMG} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            <div className="absolute top-3 left-3">
                                                <span className="badge badge-blue">For {prop.type === 'for-sale' ? 'Sale' : 'Rent'}</span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="text-xl font-black text-brand mb-1">₹{(prop.price / 100000).toFixed(1)}L</div>
                                            <h4 className="text-sm font-bold text-text truncate group-hover:text-brand transition-colors">{prop.title}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar / Contact Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-32 space-y-8">
                        <div className="bg-white rounded-[2rem] p-8 border-2 border-brand/10 shadow-2xl shadow-brand/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                            <h3 className="text-2xl font-black text-text mb-8">Direct Contact</h3>

                            <div className="space-y-6 mb-10">
                                <a href={`mailto:${agent.email}`} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-slate-50 group-hover:bg-brand group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
                                        <Mail size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-0.5">Email Address</p>
                                        <p className="font-bold text-text truncate">{agent.email}</p>
                                    </div>
                                </a>
                                <a href={`tel:${agent.phone || '+918707538123'}`} className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-slate-50 group-hover:bg-brand group-hover:text-white rounded-2xl flex items-center justify-center transition-all">
                                        <Phone size={20} />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-0.5">Phone Number</p>
                                        <p className="font-bold text-text">{agent.phone || '+91 8707538123'}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-4">
                                <button className="btn btn-primary w-full py-4 shadow-brand/20">
                                    Schedule a Meeting
                                </button>
                                <button className="btn btn-outline w-full py-4 border-2">
                                    Send Message
                                </button>
                            </div>
                        </div>

                        <div className="bg-text rounded-[2rem] p-8 text-center text-white">
                            <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <MessageSquare size={24} className="text-white" />
                            </div>
                            <h4 className="text-xl font-black mb-3">WhatsApp Inquiry</h4>
                            <p className="text-white/40 text-sm mb-8 leading-relaxed">Instantly connect with our team for property tours and pricing details.</p>
                            <button className="w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-black text-sm uppercase tracking-widest transition-all">
                                Chat on WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetail;
