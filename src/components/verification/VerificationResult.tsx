import React from 'react';
import { VerificationAuditReport } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  CheckCircle2,
  Shield,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
  Cpu,
  FileCheck2,
  Building,
  RotateCcw,
} from 'lucide-react';
import { formatDateTime, truncateAddress } from '../../utils/formatters';

interface VerificationResultProps {
  report: VerificationAuditReport;
  onReset: () => void;
}

export const VerificationResult: React.FC<VerificationResultProps> = ({ report, onReset }) => {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      {/* Header Banner */}
      <Card
        variant="elevated"
        className="p-6 border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 via-midnight-900 to-midnight-950 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-100">
                  Credential Verified
                </h3>
                <Badge variant="success" size="sm">
                  Valid Proof
                </Badge>
              </div>
              <p className="text-xs text-emerald-400/90 mt-0.5 font-medium">
                The submitted zero-knowledge proof is cryptographically valid.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Private by Design
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              Verified on Midnight
            </span>
          </div>
        </div>
      </Card>

      {/* Main Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: What Was Verified */}
        <Card variant="default" className="p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-100">Verified Claims</h4>
            </div>
            <Badge variant="success" size="sm">Confirmed</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-850 space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Credential Title</span>
            <span className="text-sm font-semibold text-slate-200">{report.credentialTitle}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-850 space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Issuing Institution</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-200">{report.issuerName}</span>
              <span className="text-[10px] font-mono text-slate-400">{truncateAddress(report.issuerAddress, 6, 4)}</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-semibold text-slate-300 block">
              Cryptographically Verified Statements:
            </span>
            {report.verifiedClaims.map((claim, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{claim}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right: What Remained Private (Zero Knowledge) */}
        <Card variant="default" className="p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-purple" />
              <h4 className="text-sm font-bold text-slate-100">Protected Private Data</h4>
            </div>
            <span className="text-[10px] font-mono uppercase text-brand-purple font-bold tracking-wider">
              NOT DISCLOSED
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            In compliance with Midnight Network's privacy architecture, the prover proved validity mathematically without disclosing any of the following sensitive fields:
          </p>

          <div className="space-y-2">
            {report.undisclosedPrivateFields.map((field, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-slate-800/80 text-xs"
              >
                <span className="text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  {field}
                </span>
                <span className="font-mono text-[11px] text-slate-500 select-none">
                  ████████ [Hidden]
                </span>
              </div>
            ))}
          </div>

          {/* Midnight Ledger Verification Meta */}
          <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2 text-[11px] font-mono text-slate-400">
            <div className="flex justify-between">
              <span>Verification TX:</span>
              <span className="text-slate-200">{truncateAddress(report.midnightTxHash, 8, 6)}</span>
            </div>
            <div className="flex justify-between">
              <span>Circuit Execution Gas:</span>
              <span className="text-emerald-400">{report.circuitVerificationGas}</span>
            </div>
            <div className="flex justify-between">
              <span>Verified At:</span>
              <span>{formatDateTime(report.verifiedAt)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" size="md" onClick={onReset} leftIcon={<RotateCcw className="w-4 h-4" />}>
          Verify Another Credential
        </Button>
        <span className="text-xs text-slate-500">
          Proof ID: <span className="font-mono text-slate-400">{report.proofId}</span>
        </span>
      </div>
    </div>
  );
};
