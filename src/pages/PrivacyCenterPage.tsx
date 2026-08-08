import React from 'react';
import { PrivacyModel } from '../components/privacy/PrivacyModel';
import { DisclosureComparison } from '../components/privacy/DisclosureComparison';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Cpu,
  KeyRound,
  CheckCircle2,
  FileCode,
  Sparkles,
  Terminal,
} from 'lucide-react';

export const PrivacyCenterPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="purple" size="sm">
          Midnight Privacy Architecture
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Privacy Center
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          How Midnight&apos;s dual-state blockchain model enables zero-knowledge selective disclosure without leaking sensitive personal credentials.
        </p>
      </div>

      {/* Hero Visual: What you reveal vs What remains private */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: What You Reveal */}
        <Card variant="elevated" className="p-6 sm:p-8 border-emerald-500/30 bg-midnight-900/90 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">What You Reveal</h3>
              <p className="text-xs text-emerald-400 font-medium">Consented Public Claims Only</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Consented claim:</strong> Proof that you met the specific criteria (e.g. &ldquo;Degree is Authentic&rdquo;).</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Proof Validity:</strong> Cryptographic mathematical validity of the zero-knowledge SNARK.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Required Public Metadata:</strong> Issuing institution name and verification timestamp.</span>
            </li>
          </ul>
        </Card>

        {/* Card 2: What Remains Private */}
        <Card variant="elevated" className="p-6 sm:p-8 border-brand-purple/40 bg-midnight-900/90 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/10 text-brand-purple border border-brand-purple/20 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">What Remains Private</h3>
              <p className="text-xs text-brand-purple font-medium">Never Disclosed or Broadcasted</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span><strong>🔒 Legal Full Name:</strong> Your real-world identity is never exposed to the verifier or the network.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span><strong>🔒 Student ID / National ID:</strong> Registration numbers and IDs stay shielded in client memory.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span><strong>🔒 Date of Birth & Demographics:</strong> Birth dates, age, and home addresses remain confidential.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2 rounded-lg bg-midnight-950 border border-slate-850">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span><strong>🔒 Exact CGPA & Performance:</strong> Exact numerical grades are never revealed, only threshold satisfaction.</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Visual Flow Diagram */}
      <Card variant="elevated" className="p-8 border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="cyan" size="sm">Zero Knowledge Flow</Badge>
          <h3 className="text-xl font-bold text-slate-100">The Selective Disclosure Pipeline</h3>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 py-6 font-mono text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 text-center flex-1 w-full">
            <span className="text-[10px] text-brand-purple uppercase font-bold block mb-1">
              1. Private State
            </span>
            <div className="text-slate-300 font-bold mb-2">RAW WITNESS DATA</div>
            <div className="p-2 rounded bg-midnight-900 text-brand-purple text-xs tracking-wider">
              ████████████████
            </div>
            <span className="text-[10px] text-slate-500 block mt-2">Client Enclave</span>
          </div>

          <div className="text-brand-purple font-bold text-lg md:rotate-0 rotate-90">➔</div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-purple-950/20 border border-brand-purple/40 text-center flex-1 w-full">
            <span className="text-[10px] text-brand-purple uppercase font-bold block mb-1">
              2. Midnight Circuit
            </span>
            <div className="text-slate-200 font-bold mb-2">SELECTIVE DISCLOSURE</div>
            <div className="p-2 rounded bg-midnight-900 text-blue-400 text-xs">
              ZK-SNARK Synthesis
            </div>
            <span className="text-[10px] text-slate-400 block mt-2">Witness Math Proof</span>
          </div>

          <div className="text-emerald-400 font-bold text-lg md:rotate-0 rotate-90">➔</div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-center flex-1 w-full">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
              3. Public Ledger
            </span>
            <div className="text-emerald-300 font-bold mb-2">PUBLIC PROOF</div>
            <div className="p-2 rounded bg-midnight-900 text-emerald-400 text-xs font-bold">
              ✓ Requirement Valid
            </div>
            <span className="text-[10px] text-slate-400 block mt-2">Zero Identity Leaked</span>
          </div>
        </div>
      </Card>

      {/* Observer Capabilities Section */}
      <PrivacyModel />

      {/* Comparison Section */}
      <DisclosureComparison />
    </div>
  );
};
