// Comprehensive campus mock data store & utilities

export const INITIAL_USER = {
  id: 'usr_st_101',
  name: 'Alex Vance',
  email: 'alex.vance@campus.edu',
  role: 'Student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  department: 'Computer Science & Engineering',
  semester: '6th Semester',
  rollNo: '2022CSE1042',
  gpa: '3.84 / 4.0',
  phone: '+1 (555) 234-5678',
  bio: 'Passion for distributed systems, AI/ML, and campus open-source projects.'
};

export const ROLES = [
  { id: 'Student', label: 'Student', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' },
  { id: 'Faculty', label: 'Faculty Professor', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { id: 'Club_Coordinator', label: 'Club Coordinator', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  { id: 'Placement_Officer', label: 'Placement Officer', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  { id: 'Admin', label: 'System Admin', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
];

export function attStatus(pct) {
  if (pct >= 85) return 'good';
  if (pct >= 75) return 'warn';
  return 'low';
}

export function fmtDate(d) {
  return d || 'Today';
}

export function initials(name) {
  if (!name) return 'DC';
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

export function isUpcoming(d) {
  return true;
}

export const attLabel = {
  good: 'Good',
  warn: 'Warning',
  low: 'Low',
};

export const attColor = {
  good: 'text-emerald-400',
  warn: 'text-amber-400',
  low: 'text-rose-400',
};

export const attBar = {
  good: 'bg-emerald-500',
  warn: 'bg-amber-500',
  low: 'bg-rose-500',
};

export const attBadge = {
  good: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warn: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const MOCK_ATTENDANCE = [
  {
    code: 'CS301',
    subject: 'Distributed Systems & Cloud Architecture',
    faculty: 'Dr. Marcus Holloway',
    totalClasses: 42,
    attendedClasses: 38,
    percentage: 90.4,
    status: 'good',
    lastRecorded: 'Today, 10:30 AM',
    sessions: [
      { date: '2026-08-12', topic: 'Raft Consensus Protocol', status: 'Present' },
      { date: '2026-08-10', topic: 'MapReduce & Spark Fundamentals', status: 'Present' },
      { date: '2026-08-08', topic: 'CAP Theorem & Eventual Consistency', status: 'Present' },
      { date: '2026-08-05', topic: 'Vector Clocks', status: 'Absent' },
    ]
  },
  {
    code: 'CS304',
    subject: 'Advanced Machine Learning & Neural Nets',
    faculty: 'Prof. Elena Rostova',
    totalClasses: 36,
    attendedClasses: 33,
    percentage: 91.6,
    status: 'good',
    lastRecorded: 'Yesterday, 02:00 PM',
    sessions: [
      { date: '2026-08-11', topic: 'Transformer Architecture & Attention', status: 'Present' },
      { date: '2026-08-09', topic: 'Backpropagation Fine-tuning', status: 'Present' },
      { date: '2026-08-06', topic: 'Convolutional Operators', status: 'Present' },
    ]
  },
  {
    code: 'CS308',
    subject: 'Database Internals & Storage Engines',
    faculty: 'Dr. Arthur Pendelton',
    totalClasses: 38,
    attendedClasses: 27,
    percentage: 71.0,
    status: 'warning', // below 75%
    lastRecorded: 'Aug 11, 2026',
    sessions: [
      { date: '2026-08-11', topic: 'B+ Tree Indexing & Buffer Pool', status: 'Absent' },
      { date: '2026-08-07', topic: 'WAL Logging & ARIES Recovery', status: 'Present' },
      { date: '2026-08-04', topic: '2PL Lock Manager', status: 'Absent' },
    ]
  },
  {
    code: 'CS312',
    subject: 'Cybersecurity & Cryptography',
    faculty: 'Prof. David Sterling',
    totalClasses: 40,
    attendedClasses: 36,
    percentage: 90.0,
    status: 'good',
    lastRecorded: 'Aug 10, 2026',
    sessions: [
      { date: '2026-08-10', topic: 'Elliptic Curve Cryptography (ECC)', status: 'Present' },
      { date: '2026-08-06', topic: 'Zero-Knowledge Proofs (ZKP)', status: 'Present' },
    ]
  }
];

export const MOCK_NOTICES = [
  {
    id: 'n1',
    title: 'Autumn 2026 Mid-Semester Examination Schedule Released',
    category: 'Exam',
    priority: 'Urgent',
    author: 'Office of Academic Affairs',
    date: '2026-08-12',
    target: 'All Students & Faculty',
    content: 'The mid-semester examination timetable for all undergraduate and postgraduate engineering programs is now finalized. Examinations begin on September 1, 2026. Hall tickets will be downloadable via the portal starting August 25.',
    pinned: true,
    attachments: 2
  },
  {
    id: 'n2',
    title: 'Google & Microsoft Campus Placement Drive Registration',
    category: 'Placement',
    priority: 'High',
    author: 'Training & Placement Cell',
    date: '2026-08-11',
    target: 'Final Year CSE & ECE Students',
    content: 'Annual recruitment drive registrations are open for Software Engineering and Data Science roles. Minimum CGPA requirement: 7.5+. Deadline for uploading verified certifications and resume is August 18, 2026.',
    pinned: true,
    attachments: 1
  },
  {
    id: 'n3',
    title: 'Annual Campus Hackathon "HackCampus 2026" Announced ($15K Prize Pool)',
    category: 'Event',
    priority: 'Normal',
    author: 'DevX Innovators Club',
    date: '2026-08-10',
    target: 'All Campus Members',
    content: 'Get ready for 36 hours of non-stop building! HackCampus 2026 features tracks in AI for Education, Sustainable Tech, and Decentralized Finance. Mentorship by industry leaders from OpenAI and Stripe.',
    pinned: false,
    attachments: 0
  },
  {
    id: 'n4',
    title: 'Library Maintenance & Extended Night Hours during Exam Week',
    category: 'General',
    priority: 'Normal',
    author: 'Central University Library',
    date: '2026-08-08',
    target: 'All Students',
    content: 'The library server upgrade will take place this Sunday between 02:00 AM and 06:00 AM. Starting August 20, the main study halls will remain open 24/7 with card access.',
    pinned: false,
    attachments: 0
  }
];

export const MOCK_CERTIFICATIONS = [
  {
    id: 'cert_1',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: 'May 14, 2026',
    expiryDate: 'May 14, 2029',
    credentialId: 'AWS-908123-SA',
    category: 'Professional',
    status: 'Verified',
    verificationScore: 99,
    badgeUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=200',
    skills: ['Cloud Computing', 'IAM', 'VPC Architecture', 'Serverless'],
    fileUrl: '#'
  },
  {
    id: 'cert_2',
    title: 'TensorFlow Developer Certificate',
    issuer: 'DeepLearning.AI / Google Cloud',
    issueDate: 'Jan 22, 2026',
    expiryDate: 'Jan 22, 2028',
    credentialId: 'TF-DEV-44129',
    category: 'Academic',
    status: 'Verified',
    verificationScore: 97,
    badgeUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200',
    skills: ['Deep Learning', 'Computer Vision', 'NLP', 'TensorFlow 2.x'],
    fileUrl: '#'
  },
  {
    id: 'cert_3',
    title: 'National Cyber Security Hackathon - 1st Runner Up',
    issuer: 'Ministry of IT & University Council',
    issueDate: 'Nov 08, 2025',
    expiryDate: 'Lifetime',
    credentialId: 'NCSH-2025-02',
    category: 'Extracurricular',
    status: 'Verified',
    verificationScore: 100,
    badgeUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=200',
    skills: ['Ethical Hacking', 'Penetration Testing', 'Cryptanalysis'],
    fileUrl: '#'
  }
];

export const MOCK_CLUBS = [
  {
    id: 'club_1',
    name: 'DevX Innovators & Open Source Club',
    code: 'DEVX',
    category: 'Tech',
    lead: 'Alex Vance & Sarah Chen',
    membersCount: 248,
    rating: 4.9,
    description: 'Premier student tech organization dedicated to building open-source tools, competing in global hackathons, and hosting technical workshops.',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    isJoined: true,
    upcomingEventsCount: 3,
    projectsCount: 12
  },
  {
    id: 'club_2',
    name: 'Quantum AI & Data Science Society',
    code: 'QAIDS',
    category: 'Tech',
    lead: 'Dr. Elena Rostova',
    membersCount: 185,
    rating: 4.8,
    description: 'Exploring quantum computing algorithms, machine learning research papers, and hosting kaggle competitions.',
    banner: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    upcomingEventsCount: 2,
    projectsCount: 8
  },
  {
    id: 'club_3',
    name: 'Apex Robotics & Autonomous Systems',
    code: 'APEX',
    category: 'Robotics',
    lead: 'Prof. Marcus Holloway',
    membersCount: 130,
    rating: 4.7,
    description: 'Building autonomous drones, rover bots, and participating in international RoboCup competitions.',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    isJoined: false,
    upcomingEventsCount: 1,
    projectsCount: 5
  },
  {
    id: 'club_4',
    name: 'Crescendo Campus Cultural & Music Club',
    code: 'CRESC',
    category: 'Cultural',
    lead: 'Maya Lin',
    membersCount: 320,
    rating: 4.9,
    description: 'Uniting musicians, singers, dancers, and visual artists across campus for annual fests and acoustic jams.',
    banner: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    isJoined: true,
    upcomingEventsCount: 4,
    projectsCount: 3
  }
];

export const MOCK_EVENTS = [
  {
    id: 'evt_1',
    title: 'HackCampus 2026: 36-Hour Hackathon',
    club: 'DevX Innovators',
    date: '2026-08-28',
    time: '09:00 AM - 09:00 PM (36 Hrs)',
    venue: 'Innovation Center Auditorium',
    capacity: 300,
    registeredCount: 242,
    category: 'Hackathon',
    isRegistered: true,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    description: 'Build cutting-edge AI, cloud, or web3 projects with mentorship from tech leaders. Free food, swag bags, and $15,000 in prizes.'
  },
  {
    id: 'evt_2',
    title: 'Workshop: LLM Fine-Tuning & Quantization',
    club: 'Quantum AI Society',
    date: '2026-08-20',
    time: '03:00 PM - 05:30 PM',
    venue: 'CS Lab 3 & Online Stream',
    capacity: 80,
    registeredCount: 78,
    category: 'Workshop',
    isRegistered: false,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
    description: 'Hands-on session on QLoRA, vLLM, and deploying open-weights models on consumer GPU hardware.'
  },
  {
    id: 'evt_3',
    title: 'Placement Preparation Mock Technical Interviews',
    club: 'Placement Cell',
    date: '2026-08-22',
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall B',
    capacity: 150,
    registeredCount: 150,
    category: 'Career',
    isRegistered: true,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
    description: '1-on-1 mock interviews conducted by alumni engineers from Google, Amazon, and Meta.'
  }
];

export const MOCK_PLACEMENTS = [
  {
    id: 'p1',
    company: 'Google',
    role: 'Software Development Engineer I',
    package: '$140,000 / yr',
    location: 'Mountain View, CA / Remote',
    eligibility: 'CGPA 8.0+, CSE / ECE / IT',
    deadline: 'Aug 25, 2026',
    status: 'Open',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=150',
    rounds: ['Online Coding Screen', 'Tech Interview 1', 'Tech Interview 2', 'Behavioral']
  },
  {
    id: 'p2',
    company: 'Microsoft',
    role: 'Cloud Solution Architect',
    package: '$132,000 / yr',
    location: 'Seattle, WA',
    eligibility: 'CGPA 7.5+, All B.Tech Programs',
    deadline: 'Aug 28, 2026',
    status: 'Open',
    logo: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&q=80&w=150',
    rounds: ['System Design Test', 'Architecture Discussion', 'HR Round']
  }
];