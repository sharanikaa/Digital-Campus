import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { providers, providerAccent } from '@/lib/certProviders';

export default function ProviderCard({ providerKey, count, onSelect }) {
    const provider = providers[providerKey];
    const accent = providerAccent(providerKey);
    return (
        <button onClick={onSelect} className="card-hover group block text-left">
            <Card className="h-full overflow-hidden">
                <div className={cn('h-1 w-full', accent.solid)} />
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl font-heading text-sm font-bold', accent.soft, accent.text)}>
                                {provider.short.slice(0, 2)}
                            </div>
                            <div>
                                <p className="font-heading text-base font-semibold leading-tight">{provider.short}</p>
                                <p className="text-xs text-muted-foreground">{provider.label}</p>
                            </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">{provider.tagline}</p>
                    <div className="mt-4 flex items-center justify-between border-t pt-3">
                        <span className="text-sm font-medium">{count} Certifications</span>
                        <span className={cn('text-xs font-medium', accent.text)}>Explore →</span>
                    </div>
                </CardContent>
            </Card>
        </button>
    );
}