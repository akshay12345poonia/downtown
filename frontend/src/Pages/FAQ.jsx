import React, { useState } from 'react'
import { Plus, Minus, Search, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const FAQS = [
  {
    category: 'Buying',
    questions: [
      {
        q: 'What are the first steps in buying a property?',
        a: "The first step is determining your budget and getting a pre-approval for a mortgage if needed. Once you know your price range, you can start browsing our properties and schedule viewings with our expert agents.",
      },
      {
        q: 'How long does the property buying process take?',
        a: 'Typically, it takes between 30 to 60 days from the moment an offer is accepted to the final closing, depending on the complexity of the legal documentation and financing speed.',
      },
      {
        q: 'Are there any hidden costs in purchasing a home?',
        a: 'Beyond the purchase price, you should budget for stamp duty, registration fees, legal fees, and home inspection costs. Our agents provide a detailed breakdown of all associated costs upfront.',
      },
    ],
  },
  {
    category: 'Selling',
    questions: [
      {
        q: 'How do I determine the value of my property?',
        a: 'We provide a free Comparative Market Analysis (CMA) where we evaluate similar properties recently sold in your area, market trends, and your property’s unique features.',
      },
      {
        q: 'How long will it take to sell my home?',
        a: 'The average time on market varies by location and price point. With our aggressive marketing strategy, most properties on SilverBrick sell within 4-8 weeks.',
      },
    ],
  },
  {
    category: 'General',
    questions: [
      {
        q: 'Why should I choose SilverBrick over other platforms?',
        a: 'SilverBrick offers verified-only listings, premium concierge service, and data-driven market insights that help you make better financial decisions. We prioritize integrity over transactions.',
      },
      {
        q: 'Is my personal data secure with SilverBrick?',
        a: 'Yes, we use enterprise-grade encryption and follow strict privacy protocols to ensure your data and transaction details are completely secure.',
      },
    ],
  },
]

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`group border-2 rounded-2xl mb-4 transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand bg-brand-light/20 shadow-lg' : 'border-border bg-white hover:border-brand/40'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left outline-none"
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand' : 'text-text group-hover:text-brand'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand text-white rotate-180' : 'bg-slate-100 text-text-muted'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="h-px bg-brand/10 mb-6" />
        <p className="text-text-muted leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-surface pb-32">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 bg-text overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="section-tag bg-brand/30 text-white border-none mb-6">Support Center</span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-none mb-6">SilverBrick <span className="text-brand">Help Center</span></h1>

          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand to-cyan-400 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 focus-within:ring-2 ring-brand transition-all">
              <div className="pl-4 pr-3 text-text-muted">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Search for questions related to buying, selling, or our services..."
                className="w-full py-4 text-base bg-transparent border-none outline-none text-text placeholder:text-text-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories & Questions */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-border">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-text mb-2">No Matches Found</h3>
            <p className="text-text-muted">We couldn't find any questions matching "{searchQuery}".</p>
            <button className="btn btn-primary mt-8" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        ) : (
          filteredFaqs.map((category) => (
            <div key={category.category} className="mb-20 animate-fadeUp">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-2 h-8 bg-brand rounded-full" />
                <h2 className="text-3xl font-black text-text tracking-tight uppercase tracking-widest text-sm">{category.category} Assistance</h2>
              </div>
              <div className="space-y-4">
                {category.questions.map((faq, i) => (
                  <FAQItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-brand rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand/20">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-10 backdrop-blur-md border border-white/20">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Still Have Questions?</h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Our support team is available 24/7 to help you with any technical or real estate specific inquiries.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn bg-white text-brand hover:bg-white/90 btn-lg shadow-xl" onClick={() => navigate('/contact')}>
                Contact Support <ArrowRight size={18} />
              </button>
              <button className="btn bg-white/10 border border-white/30 text-white hover:bg-white/20 btn-lg backdrop-blur-md">
                Live Chat Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ