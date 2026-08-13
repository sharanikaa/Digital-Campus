import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_EVENTS } from '@/lib/campus';

export const eventsService = {
  async getEvents(userId) {
    if (!isSupabaseConfigured()) {
      return MOCK_EVENTS;
    }

    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error || !events || events.length === 0) return MOCK_EVENTS;

      let registrations = [];
      if (userId) {
        const { data: regData } = await supabase
          .from('event_registrations')
          .select('event_id')
          .eq('user_id', userId);
        if (regData) registrations = regData.map(r => r.event_id);
      }

      return events.map(e => ({
        id: e.id,
        title: e.title,
        club: e.organizer,
        date: e.event_date,
        time: e.event_time,
        venue: e.venue,
        capacity: e.capacity,
        registeredCount: Math.min(e.capacity, 150),
        category: e.category,
        isRegistered: registrations.includes(e.id),
        image: e.image_url || MOCK_EVENTS[0].image,
        description: e.description
      }));
    } catch {
      return MOCK_EVENTS;
    }
  },

  async registerEvent(eventId, userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { data, error } = await supabase
      .from('event_registrations')
      .insert([{ event_id: eventId, user_id: userId }])
      .select();

    if (error) throw error;
    return data;
  },

  async cancelRegistration(eventId, userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('event_id', eventId)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  }
};
