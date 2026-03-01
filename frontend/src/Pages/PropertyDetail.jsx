import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, Heart, Share2, ShieldCheck, Mail, Phone, Calendar, User, CheckCircle2, Home } from 'lucide-react';
import { getProperty, getProperties, mediaUrl } from '../Services/Api';

const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=90';
const AGENT_PLACEHOLDER = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80';

const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${price?.toLocaleString()}`;
};

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const res = await getProperty(id);
                const propData = res.data.data.property;
                setProperty(propData);

                const simRes = await getProperties({ type: propData.type, limit: 3 });
                setSimilar(simRes.data.data.properties.filter(p => p._id !== id));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPropertyData();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-surface"><div className="spinner" /></div>;
    if (!property) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-center p-6">
            <Home size={64} className="text-slate-300 mb-6" />
            <h2 className="text-3xl font-black text-text mb-4">Property Not Found</h2>
            <p className="text-text-muted mb-8">The listing you are looking for has been removed or is no longer available.</p>
            <button className="btn btn-primary" onClick={() => navigate('/properties')}>Browse All Properties</button>
        </div>
    );

    const images = property.images?.length > 0 ? property.images.map(img => mediaUrl(img)) : [PLACEHOLDER_IMG];

    return (
        <div className="bg-surface pb-24">
            {/* Top Header / Nav */}
            <div className="pt-32 pb-12 bg-white border-b border-border/60">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                        <button
                            onClick={() => navigate('/properties')}
                            className="flex items-center gap-2 text-text-muted font-black text-xs uppercase tracking-widest hover:text-brand transition-colors"
                        >
                            <ArrowLeft size={16} /> All Listings
                        </button>
                        <div className="flex gap-3">
                            <button className="p-3 bg-white border border-border rounded-xl hover:bg-brand-light hover:text-brand transition-all shadow-sm">
                                <Heart size={20} />
                            </button>
                            <button className="p-3 bg-white border border-border rounded-xl hover:bg-brand-light hover:text-brand transition-all shadow-sm">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`badge ${property.type === 'for-sale' ? 'badge-blue' : 'badge-gold'}`}>For {property.type === 'for-sale' ? 'Sale' : 'Rent'}</span>
                                <span className="badge badge-gray">{property.propertyType || 'Residential'}</span>
                                {property.status === 'sold' && <span className="badge badge-red font-black">Sold</span>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-text leading-none mb-3">{property.title}</h1>
                            <p className="flex items-center gap-2 text-lg text-text-muted font-medium">
                                <MapPin size={20} className="text-brand" /> {property.location}
                            </p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-sm font-black text-text-muted uppercase tracking-[0.2em] mb-1">Asking Price</p>
                            <div className="text-4xl md:text-6xl font-black text-brand tracking-tighter">{formatPrice(property.price)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Media Gallery */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 rounded-[2rem] overflow-hidden bg-slate-900 aspect-video relative group shadow-2xl">
                        <img src={images[activeImg]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Main" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="lg:col-span-1 flex lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`relative shrink-0 w-32 md:w-40 lg:w-full aspect-video rounded-2xl overflow-hidden border-4 transition-all ${activeImg === i ? 'border-brand scale-95' : 'border-transparent hover:border-white/50 opacity-70 hover:opacity-100'}`}
                            >
                                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
                {/* Main Details */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 md:gap-8 bg-white p-8 rounded-3xl border border-border/40 shadow-sm text-center">
                        <div>
                            <div className="flex justify-center text-brand mb-2"><Bed size={24} /></div>
                            <div className="text-xl font-black text-text">{property.bedrooms}</div>
                            <div className="text-[10px] uppercase font-black text-text-muted tracking-widest">Bedrooms</div>
                        </div>
                        <div className="border-x border-border/60">
                            <div className="flex justify-center text-brand mb-2"><Bath size={24} /></div>
                            <div className="text-xl font-black text-text">{property.bathrooms}</div>
                            <div className="text-[10px] uppercase font-black text-text-muted tracking-widest">Bathrooms</div>
                        </div>
                        <div>
                            <div className="flex justify-center text-brand mb-2"><Maximize size={24} /></div>
                            <div className="text-xl font-black text-text">{property.area}</div>
                            <div className="text-[10px] uppercase font-black text-text-muted tracking-widest">Sq. Feet</div>
                        </div>
                    </div>

                    {/* Description */}
                    <section className="bg-white p-10 rounded-3xl border border-border/40 shadow-sm">
                        <h2 className="text-2xl font-black text-text mb-6">Property Overview</h2>
                        <div className="prose prose-slate max-w-none text-text-muted leading-relaxed text-lg">
                            {property.description || "Experience living in this remarkable residence where every detail has been thoughtfully curated for elegance and comfort. This property offers expansive living areas, premium finishes throughout, and breathtaking views that define luxury living in every sense."}
                        </div>

                        <div className="mt-12 pt-12 border-t border-border/60">
                            <h3 className="text-lg font-black text-text mb-8 uppercase tracking-widest">Listing Documents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* The instruction implies adding this line here, though it's not a direct replacement for "Downtown" */}
                                {['Property Blueprint.pdf', 'Ownership Certificate.pdf'].map(doc => (
                                    <button key={doc} className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-brand-light hover:text-brand rounded-2xl transition-all text-sm font-bold border border-transparent hover:border-brand/20">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand"><Maximize size={20} /></div>
                                        {doc}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Amenities */}
                    <section className="bg-white p-10 rounded-3xl border border-border/40 shadow-sm">
                        <h2 className="text-2xl font-black text-text mb-8">Premium Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {['Private Pool', 'Gym Access', 'Smart Security', 'Parking Space', 'Central Cooling', 'Home Cinema', 'Rooftop Lounge', 'Garden Area'].map(item => (
                                <div key={item} className="flex items-center gap-3 text-sm font-bold text-text-muted">
                                    <CheckCircle2 size={18} className="text-brand shadow-sm" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar / Agent Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="sticky top-32 space-y-8">
                        {/* Contact Agent Card */}
                        <div className="bg-white rounded-[2rem] p-8 border-2 border-brand/10 shadow-2xl shadow-brand/10">
                            <h3 className="text-2xl font-black text-text mb-8">Listed by Expert</h3>

                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-10 group cursor-pointer" onClick={() => navigate(property.agent?._id ? `/agents/${property.agent._id}` : '/agents')}>
                                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-105 transition-transform shrink-0">
                                    <img src={mediaUrl(property.agent?.photo) || AGENT_PLACEHOLDER} className="w-full h-full object-cover" alt="Agent" />
                                </div>
                                <div>
                                    <h4 className="font-black text-text group-hover:text-brand transition-colors leading-tight mb-1">{property.agent?.name || 'Senior Consultant'}</h4>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-text-muted px-2 py-0.5 bg-white rounded-full inline-block border">Elite Partner</p>
                                </div>
                            </div>

                            {showContact ? (
                                <div className="space-y-6 animate-fadeUp">
                                    <a href="tel:+918707538123" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-light transition-colors group">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all"><Phone size={20} /></div>
                                        <div className="font-bold text-lg">+91 8707538123</div>
                                    </a>
                                    <a href="mailto:sales@silverbrick.realty" className="flex items-center gap-4 p-4 rounded-2xl hover:bg-brand-light transition-colors group">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all"><Mail size={20} /></div>
                                        <div className="font-bold text-lg">sales@silverbrick.realty</div>
                                    </a>
                                    <button className="btn btn-outline w-full py-4 mt-4" onClick={() => setShowContact(false)}>Back to Options</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <button className="btn btn-primary w-full py-4 text-base shadow-brand/20" onClick={() => setShowContact(true)}>
                                        <Mail size={18} /> Direct Inquiry
                                    </button>
                                    <button className="btn btn-outline w-full py-4 border-2">
                                        <Calendar size={18} /> Schedule Tour
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Trust Factor */}
                        <div className="bg-text text-white rounded-[2rem] p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full translate-x-1/2 -translate-y-1/2" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand/20">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                                <h4 className="text-xl font-black mb-3">SilverBrick Protection</h4>
                                <p className="text-white/40 text-sm leading-relaxed mb-6">This listing is backed by our verification guarantee. Every detail has been independently audited for accuracy.</p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand">
                                    <User size={12} /> Physical Tour Verified
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Listings */}
            {similar.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 mt-32">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="section-tag">Explore More</span>
                            <h2 className="text-4xl font-black text-text">Similar Opportunities</h2>
                        </div>
                        <button className="btn btn-outline px-6" onClick={() => navigate('/properties')}>View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {similar.map(p => (
                            <div key={p._id} className="property-card cursor-pointer group" onClick={() => navigate(`/properties/${p._id}`)}>
                                <div className="h-56 overflow-hidden relative">
                                    <img src={mediaUrl(p.images?.[0]) || PLACEHOLDER_IMG} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4">
                                        <span className="badge badge-blue">For Sale</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-2xl font-black text-brand mb-1">{formatPrice(p.price)}</div>
                                    <h4 className="text-lg font-bold text-text truncate group-hover:text-brand transition-colors">{p.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default PropertyDetail;
