import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { providerList } from '@/lib/certProviders';
import { Upload, Loader2 } from 'lucide-react';
import { certificationsService } from '@/services/certifications.service';
import { useAuth } from '@/lib/AuthContext';

const statusOptions = ['in_progress', 'exam_scheduled', 'earned', 'expired'];

export default function AddCertificationDialog({ open, onOpenChange, catalog, onAdded }) {
    const { toast } = useToast();
    const { user } = useAuth();
    const [provider, setProvider] = useState('AWS');
    const [certId, setCertId] = useState('');
    const [status, setStatus] = useState('in_progress');
    const [credentialId, setCredentialId] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [verificationUrl, setVerificationUrl] = useState('');
    const [skills, setSkills] = useState('');
    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const providerCerts = catalog.filter((c) => c.provider === provider);
    const selectedCert = catalog.find((c) => c.id === certId);

    useEffect(() => { if (open) { setCertId(''); } }, [provider, open]);

    const onFile = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!['application/pdf', 'image/png', 'image/jpeg'].includes(f.type)) {
            toast({ title: 'Invalid file type', description: 'PDF, PNG or JPG only.', variant: 'destructive' });
            return;
        }
        if (f.size > 5 * 1024 * 1024) {
            toast({ title: 'File too large', description: 'Maximum size is 5 MB.', variant: 'destructive' });
            return;
        }
        setFile(f);
    };

    const reset = () => {
        setCredentialId(''); setIssueDate(''); setExpiryDate(''); setVerificationUrl('');
        setSkills(''); setFile(null); setCertId(''); setStatus('in_progress');
    };

    const submit = async () => {
        if (!selectedCert) { toast({ title: 'Select a certification', variant: 'destructive' }); return; }
        setSaving(true);
        try {
            const skillsArr = skills
                ? skills.split(',').map((s) => s.trim()).filter(Boolean)
                : selectedCert.skills || [];

            await certificationsService.addCertification(user?.id, {
                title: selectedCert.name,
                certification_name: selectedCert.name,
                provider: selectedCert.provider,
                status,
                credential_id: credentialId || undefined,
                issue_date: issueDate || undefined,
                expiry_date: expiryDate || undefined,
                verification_url: verificationUrl || undefined,
                skills: skillsArr,
                file
            });

            toast({ title: 'Certification added', description: selectedCert.name });
            reset();
            onOpenChange(false);
            if (onAdded) onAdded();
        } catch (e) {
            toast({ title: 'Could not save', description: String(e.message || e), variant: 'destructive' });
        } finally { setSaving(false); }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Certification</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-xs">
                    <div>
                        <Label>Provider</Label>
                        <Select value={provider} onValueChange={setProvider}>
                            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {providerList.map((p) => (
                                    <SelectItem key={p.code} value={p.code}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Certification</Label>
                        <Select value={certId} onValueChange={setCertId}>
                            <SelectTrigger className="mt-1"><SelectValue placeholder="Select certification..." /></SelectTrigger>
                            <SelectContent>
                                {providerCerts.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((s) => (
                                    <SelectItem key={s} value={s}>{s.replace('_', ' ')}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Credential ID</Label>
                            <Input className="mt-1" value={credentialId} onChange={(e) => setCredentialId(e.target.value)} placeholder="e.g. AWS-12345" />
                        </div>
                        <div>
                            <Label>Verification URL</Label>
                            <Input className="mt-1" value={verificationUrl} onChange={(e) => setVerificationUrl(e.target.value)} placeholder="https://..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label>Issue Date</Label>
                            <Input className="mt-1" type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                        </div>
                        <div>
                            <Label>Expiry Date</Label>
                            <Input className="mt-1" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <Label>Skills (comma-separated)</Label>
                        <Input className="mt-1" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, AWS, Node.js" />
                    </div>

                    <div>
                        <Label>Certificate File (PDF or Image)</Label>
                        <div className="mt-1 flex items-center gap-3">
                            <Label htmlFor="cert-file-input" className="flex items-center gap-2 px-3 py-2 border rounded-xl cursor-pointer hover:bg-slate-900">
                                <Upload className="w-4 h-4 text-indigo-400" />
                                <span>{file ? file.name : 'Choose File'}</span>
                            </Label>
                            <input id="cert-file-input" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={onFile} className="hidden" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={submit} disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 text-white">
                            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Save Certification
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}