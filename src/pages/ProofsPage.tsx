import React, { useState } from 'react';
import { useCredentials } from '../context/CredentialContext';
import { ProofCard } from '../components/proofs/ProofCard';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FileCheck, Sparkles, PlusCircle, UploadCloud, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { proofService } from '../services/proofService';
import { useToast } from '../context/ToastContext';

import { WalletGuard } from '../components/wallet/WalletGuard';

export const ProofsPage: React.FC = () => {
  const { proofs, refresh } = useCredentials();
  const { success, error } = useToast();
  const [search, setSearch] = useState('');

  const handleImportProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const text = await e.target.files[0].text();
        await proofService.importProof(text);
        await refresh();
        success('Proof Imported', 'Zero-knowledge proof package successfully loaded into your session');
      } catch (err: any) {
        error('Import Failed', err.message || 'Invalid proof JSON format');
      }
    }
  };

  const filtered = proofs.filter(
    (p) =>
      p.credentialTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.verificationCode.toLowerCase().includes(search.toLowerCase()) ||
      p.issuerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WalletGuard featureName="Generated Proofs" description="Connect your Midnight wallet to manage your zero-knowledge proofs and export shareable verification codes.">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-brand-purple uppercase tracking-wider font-semibold">
              Selective Disclosure Registry
            </span>
            <Badge variant="success" size="sm">
              ZK Proofs
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Generated Proofs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Zero-knowledge proofs generated from your private credentials ready for verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportProof}
            />
            <Button
              variant="outline"
              size="sm"
              type="button"
              leftIcon={<UploadCloud className="w-4 h-4" />}
              onClick={(e) => {
                const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
                input?.click();
              }}
            >
              Import Proof JSON
            </Button>
          </label>

          <Link to="/credentials">
            <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />} >
              Generate New Proof
            </Button>
          </Link>
        </div>
      </div>

      {/* Proofs Grid */}
      {filtered.length === 0 ? (
        <Card variant="elevated" className="p-12 text-center border-slate-800 space-y-4 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-200">No generated proofs yet</h3>
          <p className="text-xs text-slate-400">
            Generate a zero-knowledge proof from one of your private credentials to share verification codes with employers or verifiers.
          </p>
          <Link to="/credentials">
            <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
              Go to Credentials
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proof) => (
            <ProofCard key={proof.proofId} proof={proof} />
          ))}
        </div>
      )}
    </div>
    </WalletGuard>
  );
};
