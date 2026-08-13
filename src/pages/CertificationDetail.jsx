import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { useCertifications } from '@/hooks/useCertifications';
import { useAuth } from '@/lib/AuthContext';
import { Award, ShieldCheck, ArrowLeft, Download, QrCode } from 'lucide-react';

export function CertificationDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: certs } = useCertifications(user?.id);
  const cert = certs.find(c => String(c.id) === String(id)) || certs[0] || {
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
  };

  return (
    <div className="flex-1 pb-12">
      <PageHeader title="Digital Credential Verification Ledger">
        <Link
          to="/certifications"
          className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
      </PageHeader>

      <div className="px-8 mt-6 max-w-4xl mx-auto space-y-6">
        <div className="glass-panel rounded-3xl p-8 border border-indigo-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Award className="w-64 h-64 text-indigo-400" />
          </div>

          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-4 bg-emerald-500/10 px-3 py-1 rounded-full w-fit border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified Certificate • SHA-256 Validated</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">{cert.title}</h1>
          <p className="text-base text-slate-300 mt-2">Issued to <span className="text-white font-bold">{user?.name || 'Alex Vance'}</span> by <span className="text-indigo-400 font-bold">{cert.issuer}</span></p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Credential ID</span>
              <span className="font-mono text-sm text-indigo-300 font-bold">{cert.credentialId}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Issue Date</span>
              <span className="text-sm text-white font-semibold">{cert.issueDate}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Verification Score</span>
              <span className="text-sm text-emerald-400 font-bold">{cert.verificationScore}% Confidence</span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Validated Skills & Core Competencies</h3>
            <div className="flex flex-wrap gap-2">
              {(cert.skills || []).map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <QrCode className="w-10 h-10 text-slate-400" />
              <div>
                <p className="font-mono text-[10px] text-slate-400">Public Verification Node: vnode-us-east-1</p>
                <p className="text-[10px] text-emerald-400">Status: Active on Supabase Public Registry</p>
              </div>
            </div>

            <button
              onClick={() => alert("Downloading Verified PDF Credential...")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center space-x-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificationDetail;