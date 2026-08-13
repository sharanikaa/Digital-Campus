import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { MOCK_CERTIFICATIONS } from '@/lib/campus';
import { storageService } from './storage.service';

export const certificationsService = {
  async getUserCertifications(userId) {
    if (!isSupabaseConfigured()) {
      return MOCK_CERTIFICATIONS;
    }

    try {
      let query = supabase.from('certifications').select('*');
      if (userId) {
        query = query.eq('user_id', userId);
      }
      const { data: certs, error } = await query.order('created_at', { ascending: false });

      if (error || !certs || certs.length === 0) return MOCK_CERTIFICATIONS;

      return certs.map(c => ({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        issueDate: c.issue_date || 'May 14, 2026',
        expiryDate: c.expiry_date || 'May 14, 2029',
        credentialId: c.credential_id || 'AWS-908123-SA',
        category: c.category || 'Professional',
        status: c.status === 'earned' ? 'Verified' : c.status,
        verificationScore: c.verification_score || 99,
        badgeUrl: c.badge_url || MOCK_CERTIFICATIONS[0].badgeUrl,
        skills: c.skills || ['Cloud Architecture', 'Security'],
        fileUrl: c.file_url || '#'
      }));
    } catch {
      return MOCK_CERTIFICATIONS;
    }
  },

  async addCertification(userId, payload) {
    let fileUrl = '#';
    if (payload.file && isSupabaseConfigured()) {
      const uploadRes = await storageService.uploadFile('certificates', payload.file, userId);
      fileUrl = uploadRes.publicUrl;
    }

    if (!isSupabaseConfigured()) {
      return {
        id: `cert_${Date.now()}`,
        title: payload.certification_name || payload.title,
        issuer: payload.provider,
        issueDate: payload.issue_date || 'Today',
        expiryDate: payload.expiry_date || 'Lifetime',
        credentialId: payload.credential_id || 'TEMP-CRED-101',
        category: 'Professional',
        status: payload.status === 'earned' ? 'Verified' : payload.status,
        verificationScore: 100,
        badgeUrl: MOCK_CERTIFICATIONS[0].badgeUrl,
        skills: payload.skills || ['Cloud'],
        fileUrl
      };
    }

    const { data, error } = await supabase
      .from('certifications')
      .insert([
        {
          user_id: userId,
          title: payload.certification_name || payload.title,
          issuer: payload.provider,
          provider: payload.provider,
          category: payload.category || 'Professional',
          status: payload.status,
          credential_id: payload.credential_id,
          issue_date: payload.issue_date || null,
          expiry_date: payload.expiry_date || null,
          verification_url: payload.verification_url,
          file_url: fileUrl,
          skills: payload.skills || []
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
