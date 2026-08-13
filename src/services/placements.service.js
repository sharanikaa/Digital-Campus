import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_PLACEMENTS } from '@/lib/campus';

export const placementsService = {
  async getPlacements() {
    if (!isSupabaseConfigured()) {
      return MOCK_PLACEMENTS;
    }

    try {
      const { data, error } = await supabase
        .from('placement_drives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) return MOCK_PLACEMENTS;

      return data.map(p => ({
        id: p.id,
        company: p.company,
        role: p.role,
        package: p.package,
        location: p.location,
        eligibility: p.eligibility,
        deadline: p.deadline,
        status: p.status,
        logo: p.logo_url || MOCK_PLACEMENTS[0].logo,
        rounds: p.rounds || []
      }));
    } catch {
      return MOCK_PLACEMENTS;
    }
  }
};
