import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, ArrowRight, Home, CheckCircle2, AlertCircle } from 'lucide-react';
import { signup } from '../Services/Api';
import logo from '../assets/logo.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role
      });
      setSuccess(true);
      setTimeout(() => navigate('/signin'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex selection:bg-brand selection:text-white">
      {/* Left Decoration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-text">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200"
            className="w-full h-full object-cover animate-slowZoom"
            alt="Real Estate"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand to-transparent" />
        </div>

        <div className="relative z-10 w-full p-20 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="SilverBrick Logo" className=" h-14 rounded-2xl shadow-2xl" />

          </Link>

          <div>
            <div className="w-20 h-1 bg-brand rounded-full mb-8" />
            <h2 className="text-6xl font-black text-white leading-none mb-8">
              Join the <br />
              <span className="text-brand">Elite Group.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-md leading-relaxed">
              Start your journey with the most trusted network of real estate professionals and exclusive properties.
            </p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black text-white italic">10K+</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Active Users</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black text-white italic">500+</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Verified Homes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-12">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                <Home size={20} className="text-white" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-text">SilverBrick</span>
            </Link>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-text mb-3">Create Account</h1>
            <p className="text-text-muted">Start your property journey today.</p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-fadeUp">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 text-sm animate-fadeUp">
              <CheckCircle2 size={18} />
              Registration successful! Redirecting to sign in...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-label">Full Name</label>
              <div className="input-group">
                <User size={18} className="text-text-muted" />
                <input
                  name="name"
                  className="form-input ml-2"
                  placeholder="Enter Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <Mail size={18} className="text-text-muted" />
                  <input
                    name="email"
                    type="email"
                    className="form-input ml-2"
                    placeholder="email@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <div className="input-group">
                  <Phone size={18} className="text-text-muted" />
                  <input
                    name="phone"
                    className="form-input ml-2"
                    placeholder="+91 87..."
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="form-label">Password</label>
                <div className="input-group">
                  <Lock size={18} className="text-text-muted" />
                  <input
                    name="password"
                    type="password"
                    className="form-input ml-2"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <Lock size={18} className="text-text-muted" />
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-input ml-2"
                    placeholder="••••••••"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="form-label">I want to...</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'buyer', label: '🏠 Buy / Rent Property' },
                  { value: 'seller', label: '🏢 Sell / List Property' },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all duration-300 ${formData.role === r.value
                      ? 'border-brand bg-brand shadow-lg shadow-brand/20 text-white translate-y-[-2px]'
                      : 'border-border bg-white text-text-muted hover:border-brand/40'
                      }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-4 text-base shadow-xl mt-4"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Join SilverBrick <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-12 text-center lg:text-left">
            <p className="text-sm text-text-muted">
              Already have an account?
              <Link to="/signin" className="ml-2 font-black text-brand hover:underline">
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;