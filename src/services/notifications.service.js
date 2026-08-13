import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const DEFAULT_NOTIFICATIONS = [
  { id: '1', title: 'Attendance Alert', message: 'CS308 Attendance is currently 71.0% (below 75% limit)', time: '10m ago', unread: true },
  { id: '2', title: 'New Event Registered', message: 'Registered for HackCampus 2026', time: '1h ago', unread: true },
];

export const notificationsService = {
  async getNotifications(userId) {
    if (!isSupabaseConfigured() || !userId) {
      return DEFAULT_NOTIFICATIONS;
    }

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) return DEFAULT_NOTIFICATIONS;

      return data.map(n => ({
        id: n.id,
        title: n.title,
        message: n.message,
        time: n.time_ago || 'Recently',
        unread: n.unread
      }));
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  async markAllRead(userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { error } = await supabase
      .from('notifications')
      .update({ unread: false })
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  },

  subscribeToNotifications(userId, onNotification) {
    if (!isSupabaseConfigured() || !userId) return () => {};

    const subscription = supabase
      .channel(`public:notifications:user_id=eq.${userId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, payload => {
        onNotification(payload.new);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }
};
