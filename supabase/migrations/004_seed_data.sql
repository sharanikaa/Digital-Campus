-- Seed Data for Digital Campus Supabase Database

-- 1. Subjects Seed
INSERT INTO public.subjects (code, subject_name, faculty_name, department, semester) VALUES
('CS301', 'Distributed Systems & Cloud Architecture', 'Dr. Marcus Holloway', 'Computer Science & Engineering', '6th Semester'),
('CS304', 'Advanced Machine Learning & Neural Nets', 'Prof. Elena Rostova', 'Computer Science & Engineering', '6th Semester'),
('CS308', 'Database Internals & Storage Engines', 'Dr. Arthur Pendelton', 'Computer Science & Engineering', '6th Semester'),
('CS312', 'Cybersecurity & Cryptography', 'Prof. David Sterling', 'Computer Science & Engineering', '6th Semester')
ON CONFLICT (code) DO NOTHING;

-- 2. Events Seed
INSERT INTO public.events (id, title, organizer, category, event_date, event_time, venue, capacity, description, image_url) VALUES
('a0000000-0000-0000-0000-000000000001', 'HackCampus 2026: 36-Hour Hackathon', 'DevX Innovators', 'Hackathon', '2026-08-28', '09:00 AM - 09:00 PM (36 Hrs)', 'Innovation Center Auditorium', 300, 'Build cutting-edge AI, cloud, or web3 projects with mentorship from tech leaders. Free food, swag bags, and $15,000 in prizes.', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'),
('a0000000-0000-0000-0000-000000000002', 'Workshop: LLM Fine-Tuning & Quantization', 'Quantum AI Society', 'Workshop', '2026-08-20', '03:00 PM - 05:30 PM', 'CS Lab 3 & Online Stream', 80, 'Hands-on session on QLoRA, vLLM, and deploying open-weights models on consumer GPU hardware.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'),
('a0000000-0000-0000-0000-000000000003', 'Placement Preparation Mock Technical Interviews', 'Placement Cell', 'Career', '2026-08-22', '10:00 AM - 04:00 PM', 'Seminar Hall B', 150, '1-on-1 mock interviews conducted by alumni engineers from Google, Amazon, and Meta.', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600')
ON CONFLICT (id) DO NOTHING;

-- 3. Clubs Seed
INSERT INTO public.clubs (id, name, code, category, lead_name, description, banner_url, rating) VALUES
('b0000000-0000-0000-0000-000000000001', 'DevX Innovators & Open Source Club', 'DEVX', 'Tech', 'Alex Vance & Sarah Chen', 'Premier student tech organization dedicated to building open-source tools, competing in global hackathons, and hosting technical workshops.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800', 4.9),
('b0000000-0000-0000-0000-000000000002', 'Quantum AI & Data Science Society', 'QAIDS', 'Tech', 'Dr. Elena Rostova', 'Exploring quantum computing algorithms, machine learning research papers, and hosting kaggle competitions.', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', 4.8),
('b0000000-0000-0000-0000-000000000003', 'Apex Robotics & Autonomous Systems', 'APEX', 'Robotics', 'Prof. Marcus Holloway', 'Building autonomous drones, rover bots, and participating in international RoboCup competitions.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800', 4.7),
('b0000000-0000-0000-0000-000000000004', 'Crescendo Campus Cultural & Music Club', 'CRESC', 'Cultural', 'Maya Lin', 'Uniting musicians, singers, dancers, and visual artists across campus for annual fests and acoustic jams.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800', 4.9)
ON CONFLICT (id) DO NOTHING;

-- 4. Notices Seed
INSERT INTO public.notices (id, title, category, priority, author, target, content, pinned, attachments_count) VALUES
('c0000000-0000-0000-0000-000000000001', 'Autumn 2026 Mid-Semester Examination Schedule Released', 'Exam', 'Urgent', 'Office of Academic Affairs', 'All Students & Faculty', 'The mid-semester examination timetable for all undergraduate and postgraduate engineering programs is now finalized. Examinations begin on September 1, 2026. Hall tickets will be downloadable via the portal starting August 25.', true, 2),
('c0000000-0000-0000-0000-000000000002', 'Google & Microsoft Campus Placement Drive Registration', 'Placement', 'High', 'Training & Placement Cell', 'Final Year CSE & ECE Students', 'Annual recruitment drive registrations are open for Software Engineering and Data Science roles. Minimum CGPA requirement: 7.5+. Deadline for uploading verified certifications and resume is August 18, 2026.', true, 1),
('c0000000-0000-0000-0000-000000000003', 'Annual Campus Hackathon "HackCampus 2026" Announced ($15K Prize Pool)', 'Event', 'Normal', 'DevX Innovators Club', 'All Campus Members', 'Get ready for 36 hours of non-stop building! HackCampus 2026 features tracks in AI for Education, Sustainable Tech, and Decentralized Finance. Mentorship by industry leaders from OpenAI and Stripe.', false, 0),
('c0000000-0000-0000-0000-000000000004', 'Library Maintenance & Extended Night Hours during Exam Week', 'General', 'Normal', 'Central University Library', 'All Students', 'The library server upgrade will take place this Sunday between 02:00 AM and 06:00 AM. Starting August 20, the main study halls will remain open 24/7 with card access.', false, 0)
ON CONFLICT (id) DO NOTHING;

-- 5. Placement Drives Seed
INSERT INTO public.placement_drives (id, company, role, package, location, eligibility, deadline, status, logo_url, rounds) VALUES
('d0000000-0000-0000-0000-000000000001', 'Google', 'Software Development Engineer I', '$140,000 / yr', 'Mountain View, CA / Remote', 'CGPA 8.0+, CSE / ECE / IT', '2026-08-25', 'Open', 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=150', ARRAY['Online Coding Screen', 'Tech Interview 1', 'Tech Interview 2', 'Behavioral']),
('d0000000-0000-0000-0000-000000000002', 'Microsoft', 'Cloud Solution Architect', '$132,000 / yr', 'Seattle, WA', 'CGPA 7.5+, All B.Tech Programs', '2026-08-28', 'Open', 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&q=80&w=150', ARRAY['System Design Test', 'Architecture Discussion', 'HR Round'])
ON CONFLICT (id) DO NOTHING;
