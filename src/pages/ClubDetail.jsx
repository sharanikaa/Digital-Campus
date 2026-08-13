import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { useClubs } from '@/hooks/useClubs';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/lib/AuthContext';
import { ArrowLeft, Calendar } from 'lucide-react';

export function ClubDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: clubs } = useClubs(user?.id);
  const { data: events } = useEvents(user?.id);

  const club = clubs.find(c => String(c.id) === String(id)) || clubs[0] || {
    id: 'club_1',
    name: 'DevX Innovators & Open Source Club',
    code: 'DEVX',
    category: 'Tech',
    lead: 'Alex Vance & Sarah Chen',
    membersCount: 248,
    rating: 4.9,
    description: 'Premier student tech organization dedicated to building open-source tools, competing in global hackathons, and hosting technical workshops.',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader title={`${club.name} Hub`}>
        <Link to="/clubs" className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Clubs</span>
        </Link>
      </PageHeader>

      <div className="px-8 mt-6 space-y-6">
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
          <div className="h-48 relative">
            <img src={club.banner} alt={club.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            <div className="absolute bottom-6 left-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {club.category} Society
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-2">{club.name}</h1>
              <p className="text-xs text-slate-300 mt-1">Lead Coordinators: {club.lead} • {club.membersCount} Active Members</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">About Organization</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{club.description}</p>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Club Hosted Events</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(evt => (
                  <div key={evt.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <span className="text-[10px] font-bold text-indigo-400">{evt.category} • {evt.date}</span>
                    <h3 className="font-bold text-sm text-white">{evt.title}</h3>
                    <p className="text-xs text-slate-400">{evt.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetail;