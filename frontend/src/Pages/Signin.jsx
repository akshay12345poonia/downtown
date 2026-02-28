import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Home, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { login as loginApi } from '../Services/Api'; // ✅ rename to avoid conflict

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth(); // context login
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Call API
      const res = await loginApi({ email, password });

      // ✅ Assuming backend response:
      // { status: "success", token, data: { user } }

      const token = res.data.token;
      const user = res.data.data.user;

      // ✅ Call context login (token FIRST, user SECOND)
      login(token, user);

      navigate(from, { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex selection:bg-brand selection:text-white">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-text">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
            className="w-full h-full object-cover"
            alt="Real Estate"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full p-20 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-surface rounded-2xl flex items-center justify-center shadow-2xl">
              <Home size={24} className="text-brand" />
            </div>
            <span className="font-black text-3xl tracking-tighter text-white">
              SilverBrick
            </span>
          </Link>

          <div>
            <div className="h-1 w-20 bg-brand rounded-full mb-8" />
            <h2 className="text-6xl font-black text-white leading-none mb-8">
              Welcome Back to <br />
              <span className="text-brand">Excellence.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-md leading-relaxed">
              Log in to access your saved properties and manage your portfolio.
            </p>
          </div>

          <div className="flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={20} className="text-brand" />
            Secure & Encrypted Dashboard
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-text mb-3">Sign In</h1>
            <p className="text-text-muted">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <Mail size={18} className="text-text-muted" />
                <input
                  type="email"
                  className="form-input ml-2"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="form-label">Password</label>
              <div className="input-group">
                <Lock size={18} className="text-text-muted" />
                <input
                  type="password"
                  className="form-input ml-2"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-4 text-base shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;