-- Supabase Storage Buckets & Policies for Digital Campus

-- Create buckets for storage
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('event-banners', 'event-banners', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('club-media', 'club-media', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies for certificates
CREATE POLICY "Public Read Certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Auth Upload Certificates" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'certificates' AND auth.role() = 'authenticated');

-- Storage Policies for avatars
CREATE POLICY "Public Read Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Auth Upload Avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
