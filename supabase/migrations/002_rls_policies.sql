-- Supabase Row Level Security (RLS) Policies for Digital Campus

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notice_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.placement_drives ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. Subjects Policies
CREATE POLICY "Subjects are viewable by authenticated users"
  ON public.subjects FOR SELECT USING (auth.role() = 'authenticated');

-- 3. Attendance Policies
CREATE POLICY "Students can view their own attendance"
  ON public.attendance_records FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Faculty can insert/update attendance"
  ON public.attendance_records FOR ALL USING (auth.role() = 'authenticated');

-- 4. Events Policies
CREATE POLICY "Events are viewable by authenticated users"
  ON public.events FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Coordinators and Admin can insert events"
  ON public.events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. Event Registrations Policies
CREATE POLICY "Users can view event registrations"
  ON public.event_registrations FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can register or cancel their own registration"
  ON public.event_registrations FOR ALL USING (auth.uid() = user_id);

-- 6. Clubs Policies
CREATE POLICY "Clubs are viewable by authenticated users"
  ON public.clubs FOR SELECT USING (auth.role() = 'authenticated');

-- 7. Club Members Policies
CREATE POLICY "Club memberships viewable by authenticated users"
  ON public.club_members FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own club memberships"
  ON public.club_members FOR ALL USING (auth.uid() = user_id);

-- 8. Notices Policies
CREATE POLICY "Notices are viewable by authenticated users"
  ON public.notices FOR SELECT USING (auth.role() = 'authenticated');

-- 9. Certifications Policies
CREATE POLICY "Users can view certifications"
  ON public.certifications FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can insert and modify their own certifications"
  ON public.certifications FOR ALL USING (auth.uid() = user_id);

-- 10. Notifications Policies
CREATE POLICY "Users can view and manage their own notifications"
  ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- 11. Placement Drives Policies
CREATE POLICY "Placement drives viewable by authenticated users"
  ON public.placement_drives FOR SELECT USING (auth.role() = 'authenticated');
