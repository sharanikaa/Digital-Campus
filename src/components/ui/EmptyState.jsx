import { cn } from '@/lib/utils';

export default function EmptyState({ icon: Icon, title, description, action, className }) {
    return (
        <div className={cn('flex flex-col items-center justify-center rounded-xl border border-dashed py-14 text-center', className)}>
            {Icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="h-6 w-6" />
                </div>
            )}
            <p className="mt-4 font-heading text-base font-medium">{title}</p>
            {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}