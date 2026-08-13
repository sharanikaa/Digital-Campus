import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { PageHeader } from '../components/ui/PageHeader';
import { User, Bell, Check, Loader2 } from 'lucide-react';
import { authService } from '@/services/auth.service';

export function Settings() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '+1 (555) 234-5678');
  const [bio, setBio] = useState(user.bio || 'Passion for engineering and campus open source.');

  // Notification settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [attendanceReminders, setAttendanceReminders] = useState(true);
  const [eventAlerts, setEventAlerts] = useState(true);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (user?.id) {
        await authService.updateProfile(user.id, { name, phone, bio, department: user.department, semester: user.semester });
      }
      setUser(prev => ({ ...prev, name, phone, bio }));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // Handled
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title="Account & System Settings"
        description="Manage Personal Profile, Notification Preferences & Security Credentials"
      />

      <div className="px-8 mt-6 max-w-4xl mx-auto space-y-6">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <User className="w-5 h-5 text-indigo-400" />
              <span>Campus Profile Details</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300">Full Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300">Campus Email (Immutable)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300">Assigned Academic Role</label>
                <input
                  type="text"
                  disabled
                  value={user.role.replace('_', ' ')}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900/50 border border-slate-800 text-indigo-400 font-bold cursor-not-allowed"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="font-semibold text-slate-300">Short Bio / Achievements</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Preferences Card */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Bell className="w-5 h-5 text-purple-400" />
              <span>Notification & System Alerts</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Email Digest Alerts</p>
                  <p className="text-[11px] text-slate-400">Receive official notice circulars via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Low Attendance Warning Trigger</p>
                  <p className="text-[11px] text-slate-400">Push notifications when subject attendance drops below 75%</p>
                </div>
                <input
                  type="checkbox"
                  checked={attendanceReminders}
                  onChange={(e) => setAttendanceReminders(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div>
                  <p className="font-bold text-white">Event Registration Reminders</p>
                  <p className="text-[11px] text-slate-400">Alert 1 hour before booked hackathon or workshop starts</p>
                </div>
                <input
                  type="checkbox"
                  checked={eventAlerts}
                  onChange={(e) => setEventAlerts(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {saved && (
              <span className="text-xs font-bold text-emerald-400 flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Profile Settings Updated into Supabase DB</span>
              </span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="ml-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center space-x-1.5 transition"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              <span>Save Account Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;