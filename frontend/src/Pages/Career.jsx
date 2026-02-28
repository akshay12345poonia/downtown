import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Heart, TrendingUp, Globe, MapPin, Search } from 'lucide-react';

const JOBS = [
  { title: 'Senior Real Estate Agent', dept: 'Sales', type: 'Full-Time', location: 'New Delhi', desc: 'Lead high-value client relationships and negotiate premium site closures across urban clusters.' },
  { title: 'Property Marketing Lead', dept: 'Growth', type: 'Full-Time', location: 'Mumbai', desc: 'Drive high-conversion digital campaigns and professional property storytelling strategies.' },
  { title: 'Market Research Analyst', dept: 'Strategy', type: 'Full-Time', location: 'Bangalore', desc: 'Synthesize complex market data into actionable investment intelligence for our elite partners.' },
  { title: 'Client Experience Manager', dept: 'Success', type: 'Full-Time', location: 'Remote', desc: 'Nurture enterprise relationships and ensure seamless end-to-end property transitions.' },
];

const Career = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-text overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="section-tag bg-brand/30 text-white border-none mb-6">Join the Revolution</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-8 tracking-tighter">
            Build the <span className="text-brand">Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            We're looking for visionary thinkers and relentless executors to redefine the modern real estate experience in India.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-white group">
        <div className="max-w-7xl mx-auto container">
          <div className="text-center mb-20">
            <span className="section-tag">Our Path</span>
            <h2 className="section-title">Beyond Just a Job</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: <TrendingUp size={28} />, title: 'Hyper Growth', desc: 'Rapid career scaling through meritocracy and high-stakes projects.' },
              { icon: <Heart size={28} />, title: 'Radical Integrity', desc: 'An environment built on absolute transparency and personal trust.' },
              { icon: <Globe size={28} />, title: 'Work Nomadic', desc: 'Top-tier infrastructure supporting hybrid and remote-first workflows.' },
              { icon: <Briefcase size={28} />, title: 'Elite Rewards', desc: 'Industry-leading compensation blueprints and equity opportunities.' },
            ].map((b, i) => (
              <div key={i} className="bg-surface-muted p-10 rounded-[2.5rem] border border-border/40 hover:border-brand hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand mb-8 shadow-sm group-hover:bg-brand group-hover:text-white transition-all duration-500">{b.icon}</div>
                <h3 className="text-xl font-black text-text mb-4">{b.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed font-medium">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="section bg-surface-muted">
        <div className="max-w-4xl mx-auto container px-6">
          <div className="text-center mb-20">
            <span className="section-tag">Join Local</span>
            <h2 className="section-title">Global Opportunities</h2>
          </div>

          <div className="space-y-6">
            {JOBS.map((job, i) => (
              <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] border border-border/40 hover:border-brand shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col md:flex-row items-start md:items-center gap-8 animate-fadeUp">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-black text-text group-hover:text-brand transition-colors">{job.title}</h3>
                    <span className="badge badge-blue text-[10px]">{job.dept}</span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-text-muted">
                    <span className="flex items-center gap-2"><MapPin size={12} className="text-brand" /> {job.location}</span>
                    <span className="flex items-center gap-2"><Briefcase size={12} className="text-brand" /> {job.type}</span>
                  </div>
                  <p className="mt-6 text-sm text-text-muted leading-relaxed max-w-2xl font-medium">{job.desc}</p>
                </div>
                <button className="btn btn-primary btn-lg w-full md:w-auto shrink-0 shadow-xl shadow-brand/10" onClick={() => navigate('/contact')}>
                  Apply Now <ArrowRight size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-text p-12 rounded-[2.5rem] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 italic">"The best way to predict the future is to build it."</h3>
              <p className="text-white/40 mb-10 text-sm font-medium">Don't see your specific expertise listed? We're always hiring extraordinary outliers.</p>
              <button className="btn bg-white text-brand hover:opacity-90 px-10 py-4 shadow-2xl" onClick={() => navigate('/contact')}>
                Drop Your Resume
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;