import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, ShieldCheck, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { certStatus, verificationStatus, providerAccent } from '@/lib/certProviders';
import { fmtDate } from '@/lib/campus';

export default function UserCertCard({ cert, canVerify, onVerify }) {
    const accent = providerAccent(cert.provider);
    const status = certStatus[cert.status] || certStatus.in_progress;
    const vStatus = verificationStatus[cert.verification_status] || verificationStatus.pending;
    const VIcon = vStatus.icon;

    return (
        <Card className="card-hover h-full">
            <CardContent className="flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                    <span className={cn('text-xs font-semibold', accent.text)}>{cert.provider}</span>
                    <Badge className={cn('border-0 text-[10px] font-medium', status.cls)}>{status.label}</Badge>
                </div>
                <p className="mt-2 font-medium leading-tight">{cert.certification_name}</p>

                <div className={cn('mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium', vStatus.cls)}>
                    <VIcon className="h-3 w-3" /> {vStatus.label}
                </div>

                <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    {cert.credential_id && <p>Credential ID: <span className="font-medium text-foreground">{cert.credential_id}</span></p>}
                    {cert.issue_date && <p>Issued: {fmtDate(cert.issue_date, 'MMM yyyy')}</p>}
                    {cert.expiry_date && <p>Expires: {fmtDate(cert.expiry_date, 'MMM yyyy')}</p>}
                </div>

                {cert.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {cert.skills.slice(0, 4).map((s) => (
                            <span key={s} className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{s}</span>
                        ))}
                        {cert.skills.length > 4 && <span className="text-[10px] text-muted-foreground">+{cert.skills.length - 4}</span>}
                    </div>
                )}

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {cert.verification_url && (
                        <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                            <a href={cert.verification_url} target="_blank" rel="noreferrer"><ExternalLink className="mr-1 h-3 w-3" /> View Credential</a>
                        </Button>
                    )}
                    {cert.certificate_file && (
                        <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                            <a href={cert.certificate_file} target="_blank" rel="noreferrer"><FileText className="mr-1 h-3 w-3" /> Certificate</a>
                        </Button>
                    )}
                    {canVerify && cert.verification_status !== 'verified' && (
                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => onVerify(cert)}>
                            <ShieldCheck className="mr-1 h-3 w-3" /> Verify
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}