import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, Check, X, Lock, FileCode, Layers } from 'lucide-react';

export const PrivacyModel: React.FC = () => {
  return (
    <div id="observer-model" className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <Badge variant="purple" size="sm">
          Midnight Privacy Analysis
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          What can an observer learn?
        </h2>
        <p className="text-sm text-slate-400">
          A transparent breakdown of public ledger visibility versus private client-side zero-knowledge state.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Observer CAN see */}
        <Card variant="elevated" className="p-6 sm:p-7 border-blue-900/40 bg-midnight-900/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Observer CAN See
              </h3>
            </div>
            <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Public Ledger
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Verification Event:</strong> That a verification transaction occurred at a specific timestamp.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Public Claim Metadata:</strong> Explicitly consented claims (e.g. &ldquo;Degree is authentic&rdquo;, &ldquo;CGPA &ge; 3.5&rdquo;).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Verification Outcome:</strong> Whether the zero-knowledge circuit evaluated to TRUE or FALSE.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Issuer Public Key & Registry:</strong> The public address of the issuing institution.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Circuit & Transaction Hash:</strong> Cryptographic commitment hashes and gas execution records.
              </span>
            </li>
          </ul>
        </Card>

        {/* Observer CANNOT see */}
        <Card variant="elevated" className="p-6 sm:p-7 border-brand-purple/40 bg-midnight-900/90 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-purple/10 text-brand-purple flex items-center justify-center border border-brand-purple/20">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Observer CANNOT See
              </h3>
            </div>
            <span className="text-[10px] font-mono text-brand-purple uppercase font-semibold bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20">
              Private Witness
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span>
                <strong>Full Legal Name & Identity:</strong> The student&apos;s real-world identity is never published or broadcasted.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span>
                <strong>Student / National ID Numbers:</strong> Registration codes and government IDs remain shielded in private state.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span>
                <strong>Exact Academic Scores / CGPA:</strong> Observers only know the threshold was met, not whether the score was 3.51 or 4.0.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span>
                <strong>Date of Birth & Demographics:</strong> Age, address, and personal metadata never leave client memory.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
              <span>
                <strong>Blinding Factors & Private Secrets:</strong> The cryptographic salt prevents rainbow table attacks and linkage.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Critical Note Callout */}
      <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 flex items-start gap-3.5 text-xs text-slate-300">
        <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-100">Privacy Guarantee:</strong> Privacy in Midnight depends on the information intentionally disclosed by the credential holder and the application&apos;s privacy circuit design. With Confidential Credentials, no personal identifying attributes are ever written to the public ledger.
        </p>
      </div>
    </div>
  );
};
