import React from 'react';
import { Home, Key, TrendingUp, LayoutGrid, ShieldCheck, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    title: "Property Acquisition",
    desc: "Luxury-first guidance through every phase of purchasing premium real estate with localized research & master negotiations.",
    icon: <Home size={28} />,
    color: "bg-brand/10 text-brand"
  },
  {
    title: "Global Divestment",
    desc: "Precision marketing, architectural storytelling, and elite staging to liquidate your assets at peak market valuation.",
    icon: <Key size={28} />,
    color: "bg-violet-500/10 text-violet-500"
  },
  {
    title: "Strategic Advisory",
    desc: "Advanced data-driven yields and institutional-grade analysis to engineer a secure and profitable property portfolio.",
    icon: <TrendingUp size={28} />,
    color: "bg-cyan-500/10 text-cyan-500"
  },
  {
    title: "Asset Management",
    desc: "Hyper-concierge property handling including elite tenant verification, preventative upkeep, and detailed reporting.",
    icon: <LayoutGrid size={28} />,
    color: "bg-amber-500/10 text-amber-500"
  },
];

function ServicesSection() {
  return (
    <section className="section bg-surface-muted" id="services">
      <div className="max-w-7xl mx-auto container px-6">
        <div className="text-center mb-20 animate-fadeUp">
          <span className="section-tag">Premier Solutions</span>
          <h2 className="section-title text-white mx-auto">SilverBrick Solutions</h2>
          <p className="text-text-muted max-w-xl mx-auto mt-4 font-medium italic">Architected for transparency. Engineered for success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="bg-white rounded-[2.5rem] p-10 border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-surface-muted rounded-full translate-x-12 -translate-y-12 transition-transform duration-700 group-hover:scale-[3]" />

              <div className={`relative z-10 w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                {s.icon}
              </div>

              <h3 className="relative z-10 text-xl font-black text-text mb-4 group-hover:text-brand transition-colors">{s.title}</h3>
              <p className="relative z-10 text-sm text-text-muted leading-relaxed font-medium mb-10 opacity-80 group-hover:opacity-100 transition-opacity">{s.desc}</p>

              <button className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand hover:gap-4 transition-all">
                Explore Strategy <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Global Protection Badge */}
        <div className="mt-32 p-10 bg-text rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand/20 to-transparent pointer-events-none" />
          <div className="flex items-center gap-8 relative z-10 text-center lg:text-left flex-col lg:flex-row">
            <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center shadow-xl shadow-brand/20 group-hover:rotate-6 transition-transform">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <div className="max-w-md">
              <h4 className="text-2xl font-black mb-2">SilverBrick Verified Protocol</h4>
              <p className="text-white/40 text-sm font-medium leading-relaxed">Every property listing and agent profile on our platform undergoes a multi-layer verification process for absolute market safety.</p>
            </div>
          </div>
          <div className="shrink-0 relative z-10">
            <button className="btn bg-white text-brand hover:bg-white/90 btn-lg shadow-2xl px-12">
              Learn About Security
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
