import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { useAttendance } from '@/hooks/useAttendance';
import { useEvents } from '@/hooks/useEvents';
import { useNotices } from '@/hooks/useNotices';
import { useCertifications } from '@/hooks/useCertifications';
import { useClubs } from '@/hooks/useClubs';
import {
  CalendarCheck,
  Award,
  Bell,
  Calendar,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
  BookOpen,
  Users,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { user } = useAuth();
  const { data: attendance } = useAttendance(user?.id);
  const { data: events } = useEvents(user?.id);
  const { data: notices } = useNotices(user?.id);
  const { data: certs } = useCertifications(user?.id);
  const { data: clubs } = useClubs(user?.id);

  // Average attendance calculation
  const totalClasses = attendance.reduce((acc, curr) => acc + (curr.totalClasses || 0), 0);
  const totalAttended = attendance.reduce((acc, curr) => acc + (curr.attendedClasses || 0), 0);
  const avgAttendance = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '85.3';

  const lowAttendanceSubject = attendance.find(s => s.percentage < 75);

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description={`${user.department} • ${user.semester} • Role: ${user.role.replace('_', ' ')}`}
      >
        <Link
          to="/events"
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center space-x-2 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Campus Events</span>
        </Link>
      </PageHeader>

      <div className="px-8 mt-6 space-y-6">
        {/* Low Attendance Warning Alert (if any) */}
        {lowAttendanceSubject && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-200">Attendance Warning Alert</p>
                <p className="text-xs text-amber-300/80">
                  Your attendance in <span className="font-bold text-amber-100">{lowAttendanceSubject.subject}</span> is {lowAttendanceSubject.percentage}% (Below 75.0% threshold requirement).
                </p>
              </div>
            </div>
            <Link
              to="/attendance"
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
            >
              View Log
            </Link>
          </div>
        )}

        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Overall Attendance"
            value={`${avgAttendance}%`}
            subtext={`${totalAttended} of ${totalClasses} sessions attended`}
            icon={CalendarCheck}
            trend="+2.4%"
            color={Number(avgAttendance) >= 75 ? 'emerald' : 'amber'}
          />
          <StatCard
            title="Verified Credentials"
            value={certs.length}
            subtext="AWS, TensorFlow & Security"
            icon={Award}
            trend="100% Verified"
            color="indigo"
          />
          <StatCard
            title="Active Club Memberships"
            value={clubs.filter(c => c.isJoined).length}
            subtext="DevX & Crescendo Music"
            icon={Users}
            color="purple"
          />
          <StatCard
            title="Current GPA"
            value={user.gpa}
            subtext="Top 5% of CSE Cohort"
            icon={BookOpen}
            trend="Honors"
            color="emerald"
          />
        </div>

        {/* Two Column Layout: Main Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 spans) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Attendance Overview */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center space-x-2">
                    <CalendarCheck className="w-5 h-5 text-indigo-400" />
                    <span>Enrolled Course Attendance</span>
                  </h2>
                  <p className="text-xs text-slate-400">Current Semester Classes Logged</p>
                </div>
                <Link to="/attendance" className="text-xs font-semibold text-indigo-400 hover:underline flex items-center space-x-1">
                  <span>View Full Sheet</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-4">
                {attendance.map((item) => (
                  <div key={item.code} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-indigo-400 mr-2">{item.code}</span>
                        <span className="font-semibold text-slate-200">{item.subject}</span>
                      </div>
                      <span className={`font-bold px-2 py-0.5 rounded-full ${
                        item.percentage >= 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {item.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.percentage >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                          item.percentage >= 75 ? 'bg-gradient-to-r from-indigo-500 to-purple-500' :
                          'bg-gradient-to-r from-rose-500 to-amber-500'
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Faculty: {item.faculty}</span>
                      <span>{item.attendedClasses} / {item.totalClasses} classes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events Widget */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <span>Upcoming Campus Events</span>
                </h2>
                <Link to="/events" className="text-xs font-semibold text-indigo-400 hover:underline">
                  Browse All
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(evt => (
                  <div key={evt.id} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-indigo-400 font-semibold mb-1">
                        <span>{evt.category}</span>
                        <span>{evt.date}</span>
                      </div>
                      <h3 className="font-bold text-sm text-white line-clamp-1">{evt.title}</h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{evt.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                      <span className="text-slate-400">{evt.registeredCount} / {evt.capacity} registered</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {evt.isRegistered ? 'Registered' : 'Open'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 span): Notices & Quick Actions */}
          <div className="space-y-6">
            {/* Notices Board */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <span>Official Campus Notices</span>
                </h2>
                <Link to="/notices" className="text-xs text-indigo-400 hover:underline">View All</Link>
              </div>

              <div className="space-y-3">
                {notices.slice(0, 3).map(notice => (
                  <div key={notice.id} className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-1.5 hover:border-slate-700 transition">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        notice.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        notice.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {notice.category} • {notice.priority}
                      </span>
                      <span className="text-[10px] text-slate-400">{notice.date}</span>
                    </div>
                    <h3 className="font-semibold text-xs text-slate-100 leading-snug">{notice.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{notice.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800">
              <h2 className="text-base font-bold text-white mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/certifications" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 text-left transition space-y-1">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <p className="text-xs font-bold text-white">Upload Cert</p>
                  <p className="text-[10px] text-slate-400">Add credentials</p>
                </Link>
                <Link to="/clubs" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 text-left transition space-y-1">
                  <Users className="w-5 h-5 text-purple-400" />
                  <p className="text-xs font-bold text-white">Join Club</p>
                  <p className="text-[10px] text-slate-400">Extracurriculars</p>
                </Link>
                <Link to="/placements" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 text-left transition space-y-1">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <p className="text-xs font-bold text-white">Job Drives</p>
                  <p className="text-[10px] text-slate-400">Apply for roles</p>
                </Link>
                <Link to="/notices" className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 text-left transition space-y-1">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <p className="text-xs font-bold text-white">View Circulars</p>
                  <p className="text-[10px] text-slate-400">Check announcements</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;