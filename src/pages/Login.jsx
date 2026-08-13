import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { GraduationCap, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export function Login() {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('alex.vance@campus.edu');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const quickLoginAs = (roleId) => {
    switchRole(roleId);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/30">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Digital Campus Portal</h1>
          <p className="text-xs text-slate-400">Single Sign-On (SSO) Central Authentication</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300">University Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Password</span>
                <Link to="/forgot-password" className="text-indigo-400 hover:underline">Forgot?</Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <span>Sign In to Campus Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Persona Switcher */}
          <div className="border-t border-slate-800 pt-4 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
              <span>Quick Demo Persona Login</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => quickLoginAs('Student')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-left transition"
              >
                <p className="font-bold text-indigo-400">Student</p>
                <p className="text-[10px] text-slate-400">Alex Vance</p>
              </button>

              <button
                onClick={() => quickLoginAs('Faculty')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-left transition"
              >
                <p className="font-bold text-emerald-400">Faculty</p>
                <p className="text-[10px] text-slate-400">Dr. Holloway</p>
              </button>

              <button
                onClick={() => quickLoginAs('Placement_Officer')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 text-left transition"
              >
                <p className="font-bold text-purple-400">TPO Officer</p>
                <p className="text-[10px] text-slate-400">Sarah Jenkins</p>
              </button>

              <button
                onClick={() => quickLoginAs('Admin')}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 text-left transition"
              >
                <p className="font-bold text-rose-400">Admin</p>
                <p className="text-[10px] text-slate-400">System Admin</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
