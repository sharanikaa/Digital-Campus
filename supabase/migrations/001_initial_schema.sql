-- Digital Campus PostgreSQL Database Schema for Supabase

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('Student', 'Faculty', 'Club_Coordinator', 'Placement_Officer', 'Admin')),
  avatar_url TEXT,
  department TEXT,
  semester TEXT,
  roll_no TEXT,
  gpa TEXT,
  phone TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  subject_name TEXT NOT NULL,
  faculty_name TEXT NOT NULL,
  faculty_id UUID REFERENCES public.profiles(id),
  department TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Attendance Records Table
CREATE TABLE IF NOT EXISTS public.attendance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL REFERENCES public.subjects(code) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent', 'Excused')),
  topic TEXT,
  recorded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  organizer TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  venue TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 100,
  description TEXT,
  image_url TEXT,
  banner_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Event Registrations Table
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'Confirmed',
  UNIQUE (event_id, user_id)
);

-- 6. Clubs Table
CREATE TABLE IF NOT EXISTS public.clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  lead_name TEXT NOT NULL,
  description TEXT,
  banner_url TEXT,
  rating NUMERIC(3,1) DEFAULT 4.5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Club Members Table
CREATE TABLE IF NOT EXISTS public.club_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'Member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (club_id, user_id)
);

-- 8. Notices Table
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'Normal',
  author TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT 'All Students',
  content TEXT NOT NULL,
  pinned BOOLEAN DEFAULT FALSE,
  attachments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Notice Reads Table
CREATE TABLE IF NOT EXISTS public.notice_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  notice_id UUID NOT NULL REFERENCES public.notices(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (notice_id, user_id)
);

-- 10. Certification Providers Catalog Table
CREATE TABLE IF NOT EXISTS public.certification_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  provider TEXT NOT NULL,
  category TEXT DEFAULT 'Professional',
  status TEXT DEFAULT 'earned' CHECK (status IN ('in_progress', 'exam_scheduled', 'earned', 'expired', 'Verified')),
  credential_id TEXT,
  issue_date DATE,
  expiry_date DATE,
  verification_url TEXT,
  verification_score INT DEFAULT 95,
  badge_url TEXT,
  file_url TEXT,
  skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  time_ago TEXT,
  unread BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Placements Drives Table
CREATE TABLE IF NOT EXISTS public.placement_drives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  package TEXT NOT NULL,
  location TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  deadline DATE NOT NULL,
  status TEXT DEFAULT 'Open',
  logo_url TEXT,
  rounds TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Automatic Profile Creation Trigger on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, department, semester)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Campus Member'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Student'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'Computer Science & Engineering'),
    COALESCE(NEW.raw_user_meta_data->>'semester', '6th Semester')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
