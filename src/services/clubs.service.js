import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_CLUBS } from '@/lib/campus';

export const clubsService = {
  async getClubs(userId) {
    if (!isSupabaseConfigured()) {
      return MOCK_CLUBS;
    }

    try {
      const { data: clubs, error } = await supabase
        .from('clubs')
        .select('*')
        .order('name', { ascending: true });

      if (error || !clubs || clubs.length === 0) return MOCK_CLUBS;

      let memberClubIds = [];
      if (userId) {
        const { data: memberData } = await supabase
          .from('club_members')
          .select('club_id')
          .eq('user_id', userId);
        if (memberData) memberClubIds = memberData.map(m => m.club_id);
      }

      return clubs.map(c => ({
        id: c.id,
        name: c.name,
        code: c.code,
        category: c.category,
        lead: c.lead_name,
        membersCount: 200,
        rating: Number(c.rating || 4.8),
        description: c.description,
        banner: c.banner_url || MOCK_CLUBS[0].banner,
        isJoined: memberClubIds.includes(c.id),
        upcomingEventsCount: 2,
        projectsCount: 6
      }));
    } catch {
      return MOCK_CLUBS;
    }
  },

  async joinClub(clubId, userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { data, error } = await supabase
      .from('club_members')
      .insert([{ club_id: clubId, user_id: userId }])
      .select();

    if (error) throw error;
    return data;
  },

  async leaveClub(clubId, userId) {
    if (!isSupabaseConfigured() || !userId) return { success: true };

    const { error } = await supabase
      .from('club_members')
      .delete()
      .eq('club_id', clubId)
      .eq('user_id', userId);

    if (error) throw error;
    return { success: true };
  }
};
