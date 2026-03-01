import React from 'react'
import {
    FaTrophy,
    FaShieldAlt,
    FaBriefcase,
    FaChartLine,
    FaHandshake,
    FaMobileAlt,
} from "react-icons/fa";

const SilverBrickAdvantage = () => {
    return (
        <section className="section bg-surface-muted">
            <div className="max-w-7xl mx-auto container">
                <div className="text-center mb-16">
                    <span className="section-tag">Why Choose Us</span>
                    <h2 className="section-title mx-auto">The SilverBrick Advantage</h2>
                    <p className="section-subtitle mx-auto">
                        Setting the standard in real estate through innovation, transparency, and results.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: FaTrophy, title: 'Market Leadership', desc: 'Recognized as the industry leader for luxury real estate across the region.' },
                        { icon: FaShieldAlt, title: 'Absolute Security', desc: 'Every listing undergoes a rigorous 40-point verification process for your peace of mind.' },
                        { icon: FaBriefcase, title: 'Consultative Approach', desc: 'Our agents act as advisors, prioritizing your goals and investment long-term.' },
                        { icon: FaChartLine, title: 'Data-Driven Insights', desc: 'Harnessing real-time market data to ensure you make informed property decisions.' },
                        { icon: FaHandshake, title: 'Integrity First', desc: 'Transparent communication and ethical practices define every interaction we have.' },
                        { icon: FaMobileAlt, title: 'Smart Ecosystem', desc: 'Seamlessly search, tour, and manage your property journey via our digital platform.' },
                    ].map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="bg-surface p-10 rounded-2xl border border-border/40 shadow-sm hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 group"
                            >
                                <div className="mb-6 text-brand text-5xl group-hover:scale-110 transition-transform duration-300">
                                    <Icon />
                                </div>
                                <h3 className="text-xl font-bold text-text mb-3">{f.title}</h3>
                                <p className="text-text-muted leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default SilverBrickAdvantage