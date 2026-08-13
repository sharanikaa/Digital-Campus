import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useClubs } from '@/hooks/useClubs';
import { useAuth } from '@/lib/AuthContext';
import { Users, Star, UserPlus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Clubs() {
  const { user } = useAuth();
  const { data: clubs, toggleMembership } = useClubs(user?.id);
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Tech', 'Robotics', 'Cultural'];

  const filtered = category === 'All' ? clubs : clubs.filter(c => c.category === category);

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title="Campus Student Clubs & Societies"
        description="Discover, Join, and Lead Extracurricular Organizations & Tech Collectives"
      />

      <div className="px-8 mt-6 space-y-6">
        {/* Category selector */}
        <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                category === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clubs Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(club => (
            <div key={club.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 transition duration-200 flex flex-col justify-between">
              <div>
                <div className="h-32 relative overflow-hidden bg-slate-800">
                  <img src={club.banner} alt={club.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{club.rating}</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {club.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4">
                    <span className="font-mono text-xs font-bold text-indigo-400">{club.code}</span>
                    <h2 className="text-lg font-bold text-white leading-tight">{club.name}</h2>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">{club.description}</p>
                  <p className="text-xs text-slate-400">Club Lead: <span className="font-semibold text-slate-200">{club.lead}</span></p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <p className="font-bold text-white">{club.membersCount}</p>
                      <p className="text-[10px] text-slate-400">Members</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <p className="font-bold text-indigo-400">{club.upcomingEventsCount}</p>
                      <p className="text-[10px] text-slate-400">Events</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                      <p className="font-bold text-purple-400">{club.projectsCount}</p>
                      <p className="text-[10px] text-slate-400">Projects</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center space-x-3">
                <button
                  onClick={() => toggleMembership(club.id, club.isJoined)}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                    club.isJoined
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  {club.isJoined ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Member (Leave)</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Join Society</span>
                    </>
                  )}
                </button>

                <Link
                  to={`/clubs/${club.id}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition"
                >
                  Overview
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clubs;