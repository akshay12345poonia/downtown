import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { forgotPassword as forgotPasswordApi } from '../Services/Api';
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPasswordApi({ email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to send reset link. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex selection:bg-brand selection:text-white">

      {/* LEFT IMAGE SIDE (Same as Signin) */}
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
              Secure Your <br />
              <span className="text-brand">Account.</span>
            </h2>
            <p className="text-xl text-white/50 max-w-md leading-relaxed">
              Reset your password and regain access to your premium dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
            <ShieldCheck size={20} className="text-brand" />
            Secure & Encrypted Reset
          </div>
        </div>
      </div>

      {/* RIGHT FORM SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md">

          {/* SUCCESS STATE */}
          {success ? (
            <div className="text-center animate-fadeUp">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
                <CheckCircle2 size={40} />
              </div>

              <h2 className="text-2xl font-black text-text mb-4">
                Check your Inbox
              </h2>

              <p className="text-text-muted text-sm leading-relaxed mb-10">
                If an account is associated with{" "}
                <strong className="text-text">{email}</strong>,
                you will receive a secure reset link within minutes.
              </p>

              <Link
                to="/signin"
                className="btn btn-primary w-full py-4 shadow-xl shadow-brand/20"
              >
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-3xl font-black text-text mb-3">
                  Forgot Password
                </h1>
                <p className="text-text-muted">
                  Enter your email and we’ll send you a reset link.
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
                      className="form-input ml-2 w-full"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-4 text-base shadow-xl shadow-brand/20"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    "Request Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
                >
                  <ArrowLeft size={16} /> Return to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;