import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { XCircle, AlertTriangle, RotateCcw, ShieldAlert, FileX } from 'lucide-react';

interface VerificationFailureProps {
  reason?: string;
  onRetry: () => void;
}

export const VerificationFailure: React.FC<VerificationFailureProps> = ({ reason, onRetry }) => {
  return (
    <Card
      variant="elevated"
      className="p-8 border-rose-500/40 bg-gradient-to-b from-rose-950/20 via-midnight-900 to-midnight-950 max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/30">
          <XCircle className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-100">Verification Failed</h3>
            <Badge variant="error" size="sm">
              Invalid Proof
            </Badge>
          </div>
          <p className="text-xs text-rose-400/90 mt-0.5 font-medium">
            The submitted cryptographic proof could not be verified by the Midnight verifier contract.
          </p>
        </div>
      </div>

      {reason && (
        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-xs text-rose-200 font-mono">
          <strong>Error:</strong> {reason}
        </div>
      )}

      {/* Possible Reasons List */}
      <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 space-y-2.5">
        <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Possible Reasons:
        </h4>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong>Invalid cryptographic proof</strong> — The ZK-SNARK witness constraints were tampered with or corrupted.</span>
          </li>
          <li className="flex items-center gap-2">
            <FileX className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span><strong>Credential revoked or expired</strong> — The credential commitment was nullified on the Midnight ledger.</span>
          </li>
          <li className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span><strong>Unauthorized issuer</strong> — The issuing authority is not recognized in the accredited issuer registry.</span>
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span><strong>Claim threshold not satisfied</strong> — The holder's private attributes do not fulfill the required claim conditions.</span>
          </li>
        </ul>
      </div>

      <div className="pt-2 flex justify-end">
        <Button variant="primary" size="md" onClick={onRetry} leftIcon={<RotateCcw className="w-4 h-4" />}>
          Try Again
        </Button>
      </div>
    </Card>
  );
};
