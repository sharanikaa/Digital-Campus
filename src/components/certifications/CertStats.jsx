import { useMemo } from 'react';
import StatCard from '@/components/ui/StatCard';
import { Award, BadgeCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function CertStats({ userCerts }) {
    const stats = useMemo(() => {
        const verified = userCerts.filter((c) => c.verification_status === 'verified').length;
        const inProgress = userCerts.filter((c) => c.status === 'in_progress' || c.status === 'exam_scheduled').length;
        const skills = new Set();
        userCerts.forEach((c) => (c.skills || []).forEach((s) => skills.add(s)));
        return { total: userCerts.length, verified, inProgress, skills: skills.size };
    }, [userCerts]);

    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={Award} label="Total Certifications" value={stats.total} accent="blue" />
            <StatCard icon={BadgeCheck} label="Verified" value={stats.verified} accent="green" />
            <StatCard icon={TrendingUp} label="In Progress" value={stats.inProgress} accent="amber" />
            <StatCard icon={Sparkles} label="Skills" value={stats.skills} />
        </div>
    );
}