import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, TrendingUp, CheckCircle, XCircle, Home, ArrowRight, Activity, Zap } from 'lucide-react';
import { getProperties, getAgents, getAdminStats } from '../../Services/Api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAdminStats().then(res => setStats(res.data.data)).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const statCards = stats ? [
        { icon: <Building2 size={24} />, label: 'Total Properties', value: stats.properties.total, color: 'text-brand', bg: 'bg-brand/10', sub: `${stats.properties.available} currently live` },
        { icon: <CheckCircle size={24} />, label: 'Market Ready', value: stats.properties.available, color: 'text-emerald-500', bg: 'bg-emerald-500/10', sub: 'Verified listings' },
        { icon: <XCircle size={24} />, label: 'Closed Deals', value: stats.properties.sold + stats.properties.rented, color: 'text-amber-500', bg: 'bg-amber-500/10', sub: `${stats.properties.sold} sold · ${stats.properties.rented} rented` },
        { icon: <Users size={24} />, label: 'Active Agents', value: stats.agents.active, color: 'text-violet-500', bg: 'bg-violet-500/10', sub: `Out of ${stats.agents.total} total` },
        { icon: <Home size={24} />, label: 'Platform Users', value: stats.users.total, color: 'text-rose-500', bg: 'bg-rose-500/10', sub: 'Registered accounts' },
        { icon: <TrendingUp size={24} />, label: 'System Status', value: 'Healthy', color: 'text-cyan-500', bg: 'bg-cyan-500/10', sub: 'All systems operational' },
    ] : [];

    return (
        <div className="animate-fadeUp">
            {/* Header */}
            <div className="mb-12">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">System Overview</span>
                <h1 className="text-4xl font-black text-text tracking-tight mb-2">Operational Dashboard</h1>
                <p className="text-text-muted font-medium">Real-time metrics and management tools for SilverBrick.</p>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="spinner" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {statCards.map((s, i) => (
                        <div key={i} className="bg-white rounded-3xl p-8 border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 group">
                            <div className="flex items-center gap-6">
                                <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center ${s.color} shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                    {s.icon}
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-text leading-none mb-1">{s.value}</div>
                                    <div className="text-sm font-black text-text-muted uppercase tracking-wider">{s.label}</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-border/40 text-[10px] font-black uppercase tracking-widest text-text-muted/60">
                                {s.sub}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Actions */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-border/40 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <h3 className="text-xl font-black text-text mb-8 flex items-center gap-3">
                        <Zap size={20} className="text-brand" /> Quick Operations
                    </h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Manage Listings', path: '/admin/properties', color: 'bg-brand' },
                            { label: 'Human Resources', path: '/admin/agents', color: 'bg-violet-500' },
                            { label: 'Platform Settings', path: '#', color: 'bg-text' },
                        ].map((a, i) => (
                            <button
                                key={i}
                                onClick={() => a.path !== '#' && navigate(a.path)}
                                className="w-full flex items-center justify-between p-5 rounded-2xl bg-surface-muted hover:bg-brand-light group transition-all duration-300 text-left border border-transparent hover:border-brand/20"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${a.color} group-hover:scale-150 transition-transform`} />
                                    <span className="font-bold text-text group-hover:text-brand transition-colors">{a.label}</span>
                                </div>
                                <ArrowRight size={18} className="text-text-muted group-hover:text-brand transition-all group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* System Message */}
                <div className="bg-text rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-50" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                                <Activity size={24} className="text-brand" />
                            </div>
                            <h1 className="text-3xl font-black text-text">SilverBrick Admin</h1>
                            <p className="text-white/40 leading-relaxed font-medium">
                                You are currently accessing the secure administration layer. All actions performed here are logged and synced with the production environment.
                            </p>
                        </div>
                        <div className="mt-12 flex gap-3">
                            <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">Auto-backup: ON</span>
                            <span className="px-4 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/5">SSL: Cloudflare</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
