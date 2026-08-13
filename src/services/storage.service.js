import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const storageService = {
  async uploadFile(bucket, file, userId) {
    if (!isSupabaseConfigured()) {
      return { file_url: '#', publicUrl: '#' };
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId || 'public'}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      path: data.path,
      publicUrl: publicUrlData.publicUrl,
      file_url: publicUrlData.publicUrl
    };
  }
};
