import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { placementsService } from '@/services/placements.service';
import { Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export function Placements() {
  const [drives, setDrives] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);

  useEffect(() => {
    placementsService.getPlacements().then(data => setDrives(data));
  }, []);

  const handleApply = (id) => {
    if (appliedIds.includes(id)) return;
    setAppliedIds([...appliedIds, id]);
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title="Training & Placement Cell (TPO Drive Portal)"
        description="University Campus Placements, Industry Hiring & Internship Opportunities"
      />

      <div className="px-8 mt-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {drives.map(drive => {
            const isApplied = appliedIds.includes(drive.id);
            return (
              <div key={drive.id} className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center p-2">
                        <Building2 className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{drive.company}</h3>
                        <p className="text-xs text-indigo-400 font-semibold">{drive.role}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {drive.package}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px]">Location</span>
                      <span className="text-slate-200 font-medium truncate block">{drive.location}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 block text-[10px]">Eligibility Criteria</span>
                      <span className="text-slate-200 font-medium truncate block">{drive.eligibility}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Hiring Interview Rounds</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(drive.rounds || []).map((round, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-[10px] font-medium text-slate-300 border border-slate-700">
                          {idx + 1}. {round}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Deadline: <span className="text-slate-200 font-mono">{drive.deadline}</span></span>
                  <button
                    onClick={() => handleApply(drive.id)}
                    disabled={isApplied}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                      isApplied
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Application Submitted</span>
                      </>
                    ) : (
                      <>
                        <span>Apply via TPO</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Placements;
