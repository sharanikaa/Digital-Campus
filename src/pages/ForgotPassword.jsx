import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await authService.resetPasswordForEmail(email);
      setMessage('Password reset instructions have been sent to your university email address.');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6 glass-panel rounded-3xl p-8 border border-slate-800 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mx-auto flex items-center justify-center">
          <KeyRound className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-xl font-bold">Password Recovery</h1>
        <p className="text-xs text-slate-400">Enter your official university email address to receive reset instructions.</p>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-left">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-left">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs text-left">
          <div>
            <label className="font-semibold text-slate-300">University Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.vance@campus.edu"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2">
          <Link to="/login" className="text-xs text-indigo-400 font-bold hover:underline">
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
