import React from 'react';
import { VerificationForm } from '../components/verification/VerificationForm';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, CheckCircle2, Lock, Cpu } from 'lucide-react';

export const VerifyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="purple" size="sm">
          Midnight Public Verifier
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verify a Credential
        </h1>
        <p className="text-sm text-slate-300">
          Verify academic degrees and professional claims with mathematical certainty without accessing the holder&apos;s private personal data.
        </p>
      </div>

      {/* Main Verification Form & Results Container */}
      <VerificationForm />

      {/* Verification Trust Explainer */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
        <div className="p-4 rounded-xl bg-midnight-900 border border-slate-800 space-y-1.5">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            100% Cryptographic
          </span>
          <p className="text-slate-400 leading-relaxed">
            Proofs are verified against Midnight smart contract witness constraints and cryptographic nullifiers.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-midnight-900 border border-slate-800 space-y-1.5">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-brand-purple" />
            Zero Data Leakage
          </span>
          <p className="text-slate-400 leading-relaxed">
            Verifiers learn only that claims are true. Legal names, IDs, exact CGPAs, and DOBs never leave the holder.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-midnight-900 border border-slate-800 space-y-1.5">
          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-blue-400" />
            Instant & Tamper-Proof
          </span>
          <p className="text-slate-400 leading-relaxed">
            Any modification to the claims or proof points immediately causes verification to fail.
          </p>
        </div>
      </div>
    </div>
  );
};
