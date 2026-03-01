import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowRight,
  Home,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { login as loginApi } from '../Services/Api';
import logo from '../assets/logo.png';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginApi({ email, password });

      const token = res.data.token;
      const user = res.data.data.user;

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

      {/* LEFT SIDE */}
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
            <img src={logo} alt="SilverBrick Logo" className=" h-14 rounded-2xl shadow-2xl" />
            
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

      {/* RIGHT FORM */}
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

            {/* EMAIL */}
            <div>
              <label className="form-label">Email Address</label>
              <div className="input-group">
                <Mail size={18} className="text-text-muted" />
                <input
                  type="email"
                  className="form-input ml-2 w-full"
                  placeholder="name@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="form-label">Password</label>
              <div className="input-group relative">
                <Lock size={18} className="text-text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input ml-2 w-full pr-10"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 cursor-pointer text-text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-brand font-semibold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
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

          {/* SIGNUP LINK */}
          <div className="mt-8 text-center text-sm text-text-muted">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-brand font-bold hover:underline"
            >
              Create New Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;