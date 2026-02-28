import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { forgotPassword as forgotPasswordApi } from '../Services/Api';

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
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-text flex items-center justify-center p-6 selection:bg-brand selection:text-white">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl animate-fadeUp">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/20">
            <Home size={20} className="text-white" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-text">SilverBrick</span>
        </div>

        {success ? (
          <div className="text-center animate-fadeUp">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black text-text mb-4">Check your Inbox</h2>
            <p className="text-text-muted text-sm leading-relaxed mb-10">
              If an account is associated with <strong className="text-text">{email}</strong>, you will receive a secure reset link within minutes.
            </p>
            <Link to="/signin" className="btn btn-primary w-full py-4 shadow-xl shadow-brand/20">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-text mb-3">Recover Access</h2>
              <p className="text-text-muted text-sm">Reset your credentials to secure your account.</p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-fadeUp">
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
                    className="form-input ml-2"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                ) : 'Request Reset Link'}
              </button>
            </form>

            <div className="mt-10 text-center">
              <Link to="/signin" className="inline-flex items-center gap-2 text-sm font-black text-brand hover:underline transition-all">
                <ArrowLeft size={16} /> Return to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;