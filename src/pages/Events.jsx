import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useEvents } from '@/hooks/useEvents';
import { useAuth } from '@/lib/AuthContext';
import { Calendar, MapPin, Clock, CheckCircle2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Events() {
  const { user } = useAuth();
  const { data: events, toggleRegister } = useEvents(user?.id);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Workshop', 'Career'];

  const filtered = activeCategory === 'All' ? events : events.filter(e => e.category === activeCategory);

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title="Campus Events, Hackathons & Fests"
        description="Seat Reservations, Event Ticketing & Live Participation Tracking"
      />

      <div className="px-8 mt-6 space-y-6">
        {/* Category Filters */}
        <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map(evt => {
            const isFull = evt.registeredCount >= evt.capacity;
            return (
              <div key={evt.id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/40 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="h-40 relative bg-slate-800 overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-indigo-400 border border-indigo-500/30 backdrop-blur-sm">
                      {evt.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-slate-400">By {evt.club}</p>
                      <h2 className="text-base font-bold text-white line-clamp-1">{evt.title}</h2>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">{evt.description}</p>

                    <div className="space-y-1.5 pt-2 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{evt.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                    <span>Capacity: {evt.registeredCount} / {evt.capacity}</span>
                    <span className="font-bold text-indigo-400">
                      {Math.round((evt.registeredCount / evt.capacity) * 100)}% Booked
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleRegister(evt.id, evt.isRegistered)}
                      disabled={!evt.isRegistered && isFull}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                        evt.isRegistered
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                          : isFull
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      }`}
                    >
                      {evt.isRegistered ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Registered (Cancel)</span>
                        </>
                      ) : isFull ? (
                        <span>Housefull</span>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4" />
                          <span>Register Seat</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/events/${evt.id}`}
                      className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Events;