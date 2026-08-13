import React from 'react';

export function StatCard({ title, value, subtext, icon: Icon, trend, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-500/10 to-indigo-600/5 text-indigo-400 border-indigo-500/20',
    emerald: 'from-emerald-500/10 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    amber: 'from-amber-500/10 to-amber-600/5 text-amber-400 border-amber-500/20',
    purple: 'from-purple-500/10 to-purple-600/5 text-purple-400 border-purple-500/20',
    rose: 'from-rose-500/10 to-rose-600/5 text-rose-400 border-rose-500/20',
  };

  const iconBgMap = {
    indigo: 'bg-indigo-500/20 text-indigo-400',
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    purple: 'bg-purple-500/20 text-purple-400',
    rose: 'bg-rose-500/20 text-rose-400',
  };

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorMap[color] || colorMap.indigo} border backdrop-blur-md transition-all hover:scale-[1.02]`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${iconBgMap[color] || iconBgMap.indigo}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
        {trend && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
    </div>
  );
}

export default StatCard;
