import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Award,
  Users,
  Calendar,
  Bell,
  Briefcase,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles,
  GraduationCap
} from 'lucide-react';

export function Sidebar() {
  const { user, roles, switchRole, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Attendance', path: '/attendance', icon: CalendarCheck },
    { label: 'Certifications', path: '/certifications', icon: Award },
    { label: 'Campus Clubs', path: '/clubs', icon: Users },
    { label: 'Events & Fests', path: '/events', icon: Calendar },
    { label: 'Notices & Alerts', path: '/notices', icon: Bell },
    { label: 'Placements & Career', path: '/placements', icon: Briefcase },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  const currentRoleObj = roles.find(r => r.id === user.role) || roles[0];

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col h-screen sticky top-0 z-40 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide leading-tight">Digital Campus</h1>
          <span className="text-[10px] font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            Super App v2.5
          </span>
        </div>
      </div>

      {/* Role Switcher Drawer */}
      <div className="px-4 py-3 border-b border-slate-800/60 relative">
        <div className="text-xs text-slate-400 mb-1 font-medium flex items-center justify-between">
          <span>Active Persona</span>
          <Sparkles className="w-3 h-3 text-indigo-400" />
        </div>
        <button
          onClick={() => setRoleMenuOpen(!roleMenuOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800 transition"
        >
          <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${currentRoleObj.badge}`}>
            {currentRoleObj.label}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${roleMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {roleMenuOpen && (
          <div className="absolute left-4 right-4 top-16 glass-dropdown rounded-xl p-2 z-50 space-y-1">
            <div className="text-[10px] text-slate-400 px-2 py-1 font-semibold uppercase">Switch View Mode</div>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => {
                  switchRole(r.id);
                  setRoleMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition ${user.role === r.id ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30' : 'text-slate-300 hover:bg-slate-800/80'}`}
              >
                <span>{r.label}</span>
                {user.role === r.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Main Navigation</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Info Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-indigo-500/30 object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
