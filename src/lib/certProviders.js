import { CheckCircle2, Clock, AlertCircle, CircleDashed } from 'lucide-react';

export const providers = {
    AWS: {
        key: 'AWS',
        label: 'Amazon Web Services',
        short: 'AWS',
        tagline: 'Cloud • AI • Data • Development',
        tags: ['Cloud', 'AI', 'Data', 'Development'],
        accent: 'orange',
        categories: ['All', 'Foundational', 'Associate', 'Professional', 'Specialty', 'AI', 'Data'],
    },
    ServiceNow: {
        key: 'ServiceNow',
        label: 'ServiceNow',
        short: 'ServiceNow',
        tagline: 'Administration • Development • Implementation',
        tags: ['Administration', 'Development', 'Implementation'],
        accent: 'indigo',
        categories: ['All', 'Administration', 'Development', 'Implementation'],
    },
    Salesforce: {
        key: 'Salesforce',
        label: 'Salesforce',
        short: 'Salesforce',
        tagline: 'Administration • Development • Platform • AI • Data',
        tags: ['Administration', 'Development', 'Platform', 'AI', 'Data'],
        accent: 'sky',
        categories: ['All', 'Administration', 'Development', 'Platform', 'AI', 'Data', 'Cloud'],
    },
};

export const providerList = Object.values(providers);

export const accentClasses = {
    orange: {
        text: 'text-orange-600 dark:text-orange-400',
        bg: 'bg-orange-50 dark:bg-orange-950/40',
        border: 'border-orange-200 dark:border-orange-900/50',
        solid: 'bg-orange-500',
        soft: 'bg-orange-100 dark:bg-orange-950/60',
    },
    indigo: {
        text: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        border: 'border-indigo-200 dark:border-indigo-900/50',
        solid: 'bg-indigo-500',
        soft: 'bg-indigo-100 dark:bg-indigo-950/60',
    },
    sky: {
        text: 'text-sky-600 dark:text-sky-400',
        bg: 'bg-sky-50 dark:bg-sky-950/40',
        border: 'border-sky-200 dark:border-sky-900/50',
        solid: 'bg-sky-500',
        soft: 'bg-sky-100 dark:bg-sky-950/60',
    },
};

export const certStatus = {
    not_started: { label: 'Not Started', cls: 'bg-muted text-muted-foreground' },
    in_progress: { label: 'In Progress', cls: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
    exam_scheduled: { label: 'Exam Scheduled', cls: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-400' },
    earned: { label: 'Earned', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' },
    expired: { label: 'Expired', cls: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400' },
    verification_pending: { label: 'Verification Pending', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
};

export const verificationStatus = {
    pending: { label: 'Verification Pending', cls: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400', icon: Clock },
    verified: { label: 'Verified Credential', cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400', icon: CheckCircle2 },
    rejected: { label: 'Verification Required', cls: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400', icon: AlertCircle },
};

export const providerAccent = (key) => accentClasses[providers[key]?.accent || 'orange'];