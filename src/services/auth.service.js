import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { INITIAL_USER } from '@/lib/campus';

export const authService = {
  async getSession() {
    if (!isSupabaseConfigured()) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async login({ email, password }) {
    if (!isSupabaseConfigured()) {
      return { user: INITIAL_USER, session: null };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    let profile = await this.getProfile(data.user.id);
    if (!profile) {
      profile = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || 'Campus User',
        role: data.user.user_metadata?.role || 'Student',
        department: data.user.user_metadata?.department || 'Computer Science & Engineering',
        semester: data.user.user_metadata?.semester || '6th Semester'
      };
    }
    return { user: profile, session: data.session };
  },

  async signUp({ email, password, fullName, role = 'Student', department, semester }) {
    if (!isSupabaseConfigured()) {
      return { user: { ...INITIAL_USER, email, name: fullName, role }, session: null };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, role, department, semester }
      }
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    if (!isSupabaseConfigured()) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.warn('Supabase logout issue:', error.message);
  },

  async resetPasswordForEmail(email) {
    if (!isSupabaseConfigured()) return { success: true };
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    if (error) throw error;
    return data;
  },

  async updateUserPassword(newPassword) {
    if (!isSupabaseConfigured()) return { success: true };
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return data;
  },

  async getProfile(userId) {
    if (!isSupabaseConfigured() || !userId) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.full_name,
      email: data.email,
      role: data.role,
      avatar: data.avatar_url || INITIAL_USER.avatar,
      department: data.department || INITIAL_USER.department,
      semester: data.semester || INITIAL_USER.semester,
      rollNo: data.roll_no || INITIAL_USER.rollNo,
      gpa: data.gpa || INITIAL_USER.gpa,
      phone: data.phone || INITIAL_USER.phone,
      bio: data.bio || INITIAL_USER.bio,
      githubUrl: data.github_url,
      linkedinUrl: data.linkedin_url,
      portfolioUrl: data.portfolio_url
    };
  },

  async updateProfile(userId, updates) {
    if (!isSupabaseConfigured() || !userId) return updates;
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: updates.name,
        department: updates.department,
        semester: updates.semester,
        phone: updates.phone,
        bio: updates.bio,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
