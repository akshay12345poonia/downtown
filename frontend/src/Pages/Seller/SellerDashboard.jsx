import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { getProperties } from '../../Services/Api';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, rented: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getProperties({ myListings: true });
                const props = res.data.data.properties;
                setStats({
                    total: props.length,
                    available: props.filter(p => p.status === 'available').length,
                    sold: props.filter(p => p.status === 'sold').length,
                    rented: props.filter(p => p.status === 'rented').length
                });
            } catch { } finally { setLoading(false); }
        };
        load();
    }, []);

    const cards = [
        { label: 'Total Listings', value: stats.total, icon: Building2, color: 'bg-blue-50 text-blue-500' },
        { label: 'Available', value: stats.available, icon: TrendingUp, color: 'bg-emerald-50 text-emerald-500' },
        { label: 'Sold', value: stats.sold, icon: CheckCircle, color: 'bg-red-50 text-red-500' },
        { label: 'Rented', value: stats.rented, icon: Clock, color: 'bg-amber-50 text-amber-500' }
    ];

    return (
        <div className="animate-fadeUp">
            <div className="mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand mb-2 block">Welcome Back</span>
                <h1 className="text-4xl font-black text-text tracking-tight">Hello, {user?.name?.split(' ')[0]} 👋</h1>
                <p className="text-text-muted font-medium mt-2">Here's an overview of your property listings.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="bg-white rounded-[2rem] p-8 border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${color}`}>
                            <Icon size={28} />
                        </div>
                        <div className="text-4xl font-black text-text mb-1">
                            {loading ? <span className="text-border">—</span> : value}
                        </div>
                        <div className="text-sm font-bold text-text-muted">{label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Action */}
            <div className="bg-gradient-to-br from-brand to-brand/70 rounded-[2rem] p-10 text-white">
                <h2 className="text-2xl font-black mb-2">Ready to list a new property?</h2>
                <p className="text-white/70 font-medium mb-6">Add your property details and photos to reach thousands of buyers.</p>
                <Link to="/seller/properties" className="inline-flex items-center gap-2 bg-white text-brand font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-xl">
                    <Building2 size={20} /> Manage My Listings
                </Link>
            </div>
        </div>
    );
};

export default SellerDashboard;
