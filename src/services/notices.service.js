import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_NOTICES } from '@/lib/campus';

export const noticesService = {
  async getNotices(userId) {
    if (!isSupabaseConfigured()) {
      return MOCK_NOTICES;
    }

    try {
      const { data: notices, error } = await supabase
        .from('notices')
        .select('*')
        .order('pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error || !notices || notices.length === 0) return MOCK_NOTICES;

      return notices.map(n => ({
        id: n.id,
        title: n.title,
        category: n.category,
        priority: n.priority,
        author: n.author,
        date: n.created_at ? n.created_at.split('T')[0] : '2026-08-12',
        target: n.target,
        content: n.content,
        pinned: n.pinned,
        attachments: n.attachments_count || 0
      }));
    } catch {
      return MOCK_NOTICES;
    }
  },

  async markAsRead(noticeId, userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { data, error } = await supabase
      .from('notice_reads')
      .upsert({ notice_id: noticeId, user_id: userId })
      .select();

    if (error) throw error;
    return data;
  }
};
