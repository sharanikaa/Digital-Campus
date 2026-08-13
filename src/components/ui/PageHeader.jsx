import React, { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { Bell, Search, Check } from 'lucide-react';

export function PageHeader({ title, description, children, actions }) {
  const { user, notifications, unreadNoticesCount, markNotificationsRead } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="px-8 py-6 border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">{title}</h1>
        {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
      </div>

      <div className="flex items-center space-x-4">
        {actions}
        {children}

        {/* Global Search Bar */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, notices, events..."
            className="pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 w-64 transition"
          />
        </div>

        {/* Notifications Icon with Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Bell className="w-4 h-4" />
            {unreadNoticesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {unreadNoticesCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 glass-dropdown rounded-2xl p-4 z-50 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <span className="font-semibold text-sm text-white">Notifications</span>
                </div>
                <button
                  onClick={markNotificationsRead}
                  className="text-[11px] text-indigo-400 hover:underline flex items-center space-x-1"
                >
                  <Check className="w-3 h-3" />
                  <span>Mark all read</span>
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 rounded-xl border text-xs transition ${
                      n.unread
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold mb-1">
                      <span>{n.title}</span>
                      <span className="text-[10px] opacity-70">{n.time}</span>
                    </div>
                    <p className="opacity-90 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;