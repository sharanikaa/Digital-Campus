import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { providerAccent } from '@/lib/certProviders';

export default function CertCard({ cert }) {
    const accent = providerAccent(cert.provider);
    return (
        <Link to={`/certifications/${cert.id}`} className="card-hover block h-full">
            <Card className="h-full">
                <CardContent className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between">
                        <span className={cn('text-xs font-semibold', accent.text)}>{cert.provider}</span>
                        <Badge variant="outline" className="text-[10px] font-medium">{cert.level}</Badge>
                    </div>
                    <p className="mt-3 font-medium leading-tight">{cert.name}</p>
                    <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-muted-foreground">{cert.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <span className="text-xs text-muted-foreground">{cert.category}</span>
                        <span className={cn('text-xs font-medium', accent.text)}>View →</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}