import React, { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { useNotices } from '@/hooks/useNotices';
import { useAuth } from '@/lib/AuthContext';
import { Plus, Pin, FileText, Search, X } from 'lucide-react';

export function Notices() {
  const { user } = useAuth();
  const canPublish = user.role === 'Faculty' || user.role === 'Admin' || user.role === 'Placement_Officer';

  const { data: notices, markAsRead, reload } = useNotices(user?.id);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPublishModal, setShowPublishModal] = useState(false);

  // New notice form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState('Normal');

  const categories = ['All', 'Exam', 'Placement', 'Event', 'General'];

  const filteredNotices = notices.filter(n => {
    const matchesCategory = activeCategory === 'All' || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    setShowPublishModal(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader
        title="Official Circulars & Campus Notices"
        description="Targeted Announcements, Exam Schedules & Placement Directives"
      >
        {canPublish && (
          <button
            onClick={() => setShowPublishModal(true)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 flex items-center space-x-2 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Circular</span>
          </button>
        )}
      </PageHeader>

      <div className="px-8 mt-6 space-y-6">
        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800 w-full sm:w-auto">
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

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Notices Board List */}
        <div className="space-y-4">
          {filteredNotices.map(notice => (
            <div
              key={notice.id}
              onClick={() => markAsRead(notice.id)}
              className={`p-6 rounded-2xl border transition relative ${
                notice.pinned
                  ? 'bg-slate-900/80 border-indigo-500/40 shadow-lg shadow-indigo-500/5'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              {notice.pinned && (
                <div className="absolute top-4 right-4 text-indigo-400 flex items-center space-x-1 text-[11px] font-bold">
                  <Pin className="w-3.5 h-3.5 fill-indigo-400" />
                  <span>Pinned Circular</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    notice.priority === 'Urgent' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                    notice.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {notice.category} • {notice.priority}
                  </span>
                  <span className="text-xs text-slate-400">• {notice.date}</span>
                  <span className="text-xs text-slate-400">• Issued by {notice.author}</span>
                </div>

                <h2 className="text-base font-bold text-white leading-snug">{notice.title}</h2>
                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{notice.content}</p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Target Audience: <span className="font-semibold text-slate-200">{notice.target}</span></span>
                  {notice.attachments > 0 && (
                    <span className="text-indigo-400 flex items-center space-x-1 font-semibold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{notice.attachments} PDF Attachment(s)</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Publish Campus Notice</h2>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-300">Notice Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. End Semester Lab Evaluation Timetable"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Placement">Placement</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300">Priority Level</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300">Notice Content</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Detailed announcement text..."
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPublishModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notices;