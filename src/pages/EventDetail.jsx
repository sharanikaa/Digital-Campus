import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/lib/AuthContext';
import { Calendar, MapPin, Ticket, ArrowLeft } from 'lucide-react';

export function EventDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: events } = useEvents(user?.id);
  const evt = events.find(e => String(e.id) === String(id)) || events[0] || {
    id: 'evt_1',
    title: 'HackCampus 2026: 36-Hour Hackathon',
    club: 'DevX Innovators',
    date: '2026-08-28',
    time: '09:00 AM - 09:00 PM (36 Hrs)',
    venue: 'Innovation Center Auditorium',
    capacity: 300,
    registeredCount: 242,
    category: 'Hackathon',
    isRegistered: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    description: 'Build cutting-edge AI, cloud, or web3 projects with mentorship from tech leaders. Free food, swag bags, and $15,000 in prizes.'
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader title="Event Portal & Pass Ticket">
        <Link to="/events" className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Events</span>
        </Link>
      </PageHeader>

      <div className="px-8 mt-6 max-w-4xl mx-auto space-y-6">
        <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800">
          <div className="h-64 relative">
            <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {evt.category}
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-2">{evt.title}</h1>
              <p className="text-xs text-slate-300 mt-1">Organized by {evt.club}</p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Date & Schedule</span>
                </span>
                <p className="text-sm font-bold text-white">{evt.date}</p>
                <p className="text-slate-400 text-[11px]">{evt.time}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Venue Location</span>
                </span>
                <p className="text-sm font-bold text-white truncate">{evt.venue}</p>
                <p className="text-slate-400 text-[11px]">Campus Main Block</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold flex items-center space-x-1">
                  <Ticket className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pass Status</span>
                </span>
                <p className="text-sm font-bold text-emerald-400">
                  {evt.isRegistered ? 'Confirmed Ticket' : 'Open Registration'}
                </p>
                <p className="text-slate-400 text-[11px]">{evt.registeredCount} / {evt.capacity} registered</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Event Description</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{evt.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;