import React from 'react';
import { Link } from 'react-router-dom';
import { ZeroKnowledgeProof } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileCheck,
  Copy,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Download,
  Trash2,
  Calendar,
} from 'lucide-react';
import { copyToClipboard, formatDate, truncateAddress } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { useCredentials } from '../../context/CredentialContext';

export const ProofCard: React.FC<{ proof: ZeroKnowledgeProof }> = ({ proof }) => {
  const { success } = useToast();
  const { deleteProof } = useCredentials();

  const handleCopyCode = () => {
    copyToClipboard(proof.verificationCode);
    success('Code Copied', `Code ${proof.verificationCode} copied to clipboard`);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proof-${proof.verificationCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success('Downloaded', 'Proof JSON downloaded');
  };

  return (
    <Card variant="interactive" className="p-5 border-slate-800 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-brand-purple">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400">
              Zero-Knowledge Proof
            </span>
            <h4 className="font-semibold text-sm text-slate-100 line-clamp-1">
              {proof.credentialTitle}
            </h4>
          </div>
        </div>

        <Badge variant="success" size="sm">
          <ShieldCheck className="w-3 h-3" /> Valid
        </Badge>
      </div>

      {/* Code Banner */}
      <div className="p-3 rounded-xl bg-midnight-950/80 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-500 uppercase font-mono block">
            Verification Code
          </span>
          <span className="text-sm font-mono font-bold text-slate-200">
            {proof.verificationCode}
          </span>
        </div>
        <button
          onClick={handleCopyCode}
          className="p-1.5 rounded-lg bg-midnight-800 hover:bg-midnight-750 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
          title="Copy Code"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Claims preview */}
      <div className="space-y-1.5 text-xs text-slate-300">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Proved Claims:
        </span>
        {proof.publicInputs.verifiedClaims.slice(0, 2).map((claim, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{claim}</span>
          </div>
        ))}
        {proof.publicInputs.verifiedClaims.length > 2 && (
          <span className="text-[10px] text-slate-500 font-mono block pl-4">
            +{proof.publicInputs.verifiedClaims.length - 2} more claim(s)
          </span>
        )}
      </div>

      {/* Metadata */}
      <div className="pt-2 border-t border-slate-850 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(proof.timestamp)}
        </span>
        <span>{truncateAddress(proof.credentialCommitment, 6, 4)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleDownload}
          leftIcon={<Download className="w-3 h-3" />}
        >
          JSON
        </Button>
        <Link to={`/verify?code=${proof.verificationCode}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            Verify
          </Button>
        </Link>
        <button
          onClick={() => deleteProof(proof.proofId)}
          className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-800/40 transition-colors"
          title="Delete Proof"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};
