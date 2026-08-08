import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CheckCircle2, XCircle, Lock, Shield, Eye, ArrowRight, ShieldAlert, ShieldCheck } from 'lucide-react';

export const DisclosureComparison: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="purple" size="sm">
          Privacy Architecture
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Share proof, not personal data.
        </h2>
        <p className="text-sm text-slate-400">
          Traditional verification forces you to hand over entire documents containing sensitive personal identity markers. Confidential Credentials replaces data exposure with zero-knowledge mathematical certainty.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Left: Traditional Verification */}
        <Card
          variant="elevated"
          className="p-6 sm:p-7 border-rose-900/40 bg-gradient-to-b from-rose-950/20 via-midnight-900 to-midnight-950 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-rose-900/30 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Traditional Verification
              </h3>
            </div>
            <span className="text-[11px] font-mono text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
              100% Data Exposed
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Verifiers collect full identity records, exposing you to identity theft, tracking, and unauthorized profiling:
          </p>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Full Legal Name:</span>
              <span className="text-rose-300 font-semibold">Shrikant Shinde (Exposed)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="text-rose-300 font-semibold">14-Apr-2001 (Exposed)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Student / National ID:</span>
              <span className="text-rose-300 font-semibold">SPPU-CS-2024-8842 (Exposed)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">University / College:</span>
              <span className="text-slate-300">Savitribai Phule Pune Univ</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Degree & Major:</span>
              <span className="text-slate-300">BSc Computer Science</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Exact CGPA & Transcripts:</span>
              <span className="text-rose-300 font-semibold">8.92 / 10.0 (Exposed)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-rose-900/30">
              <span className="text-slate-400">Graduation Year:</span>
              <span className="text-slate-300">2024</span>
            </div>
          </div>
        </Card>

        {/* Right: Confidential Credentials (Midnight) */}
        <Card
          variant="elevated"
          className="p-6 sm:p-7 border-brand-purple/40 bg-gradient-to-b from-purple-950/20 via-midnight-900 to-midnight-950 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-brand-purple/30 pb-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center border border-brand-purple/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Confidential Credentials
              </h3>
            </div>
            <span className="text-[11px] font-mono text-brand-purple font-semibold px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20">
              Selective Disclosure
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Midnight evaluates private witness statements locally and submits only the cryptographic proof:
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Valid Credential Verified
              </span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">True</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Approved Accredited Issuer
              </span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">True</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Degree Requirement Satisfied (BSc CS)
              </span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">True</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Eligibility / CGPA Threshold Satisfied (≥ 7.5)
              </span>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-semibold">True</span>
            </div>

            <div className="p-3 rounded-lg bg-midnight-950 border border-brand-purple/20 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-brand-purple" />
                  Full Name & ID:
                </span>
                <span className="text-brand-purple select-none font-bold">████████ [Hidden]</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-brand-purple" />
                  DOB & Exact CGPA:
                </span>
                <span className="text-brand-purple select-none font-bold">████████ [Hidden]</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
