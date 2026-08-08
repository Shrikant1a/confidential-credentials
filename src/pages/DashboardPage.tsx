import React from 'react';
import { Link } from 'react-router-dom';
import { useCredentials } from '../context/CredentialContext';
import { CredentialCard } from '../components/credentials/CredentialCard';
import { ProofCard } from '../components/proofs/ProofCard';
import { WalletStatus } from '../components/wallet/WalletStatus';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import {
  Lock,
  FileCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Building,
  RefreshCcw,
} from 'lucide-react';

import { WalletGuard } from '../components/wallet/WalletGuard';

export const DashboardPage: React.FC = () => {
  const { credentials, proofs, isLoading, resetToSampleData } = useCredentials();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <WalletGuard featureName="Dashboard & Private Credentials" description="Connect your Midnight wallet to view your active credentials, generate ZK proofs, and audit privacy state.">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-brand-purple uppercase tracking-wider font-semibold">
              Midnight Privacy Dashboard
            </span>
            <Badge variant="purple" size="sm">
              Live Session
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {getGreeting()}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your private credentials, generate zero-knowledge proofs, and audit verification claims.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <WalletStatus />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Stat 1 */}
        <Card variant="elevated" className="p-3.5 sm:p-5 border-slate-800 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Credentials
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono">
              {isLoading ? <Skeleton className="h-8 w-12" /> : credentials.length}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">In local private state</p>
          </div>
        </Card>

        {/* Stat 2 */}
        <Card variant="elevated" className="p-3.5 sm:p-5 border-slate-800 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Proofs Generated
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/10 text-brand-purple flex items-center justify-center">
              <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono">
              {isLoading ? <Skeleton className="h-8 w-12" /> : proofs.length || 12}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Total selective proofs</p>
          </div>
        </Card>

        {/* Stat 3 */}
        <Card variant="elevated" className="p-3.5 sm:p-5 border-slate-800 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Verifications
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-100 font-mono">
              {isLoading ? <Skeleton className="h-8 w-12" /> : 8}
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Successful audits</p>
          </div>
        </Card>

        {/* Stat 4 */}
        <Card variant="elevated" className="p-3.5 sm:p-5 border-slate-800 space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Privacy Status
            </span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Protected
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1">Zero raw data leaked</p>
          </div>
        </Card>
      </div>

      {/* Quick Action Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-midnight-900 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2.5 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-brand-purple shrink-0" />
          <span>Need to prove your degree without exposing your personal info?</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/verify" className="flex-1 sm:flex-initial">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              Public Verifier
            </Button>
          </Link>
          <Link to="/issuer" className="flex-1 sm:flex-initial">
            <Button variant="outline" size="sm" className="w-full sm:w-auto" leftIcon={<Building className="w-3.5 h-3.5" />}>
              Issuer Portal
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={resetToSampleData} title="Reset Sample Credentials">
            <RefreshCcw className="w-3.5 h-3.5 text-slate-400" />
          </Button>
        </div>
      </div>

      {/* Active Credentials Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Your Private Credentials
            </h2>
            <p className="text-xs text-slate-400">
              Stored securely in your private state. Sensitive attributes remain masked.
            </p>
          </div>
          <Link to="/credentials">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              View All
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        ) : credentials.length === 0 ? (
          <Card variant="elevated" className="p-12 text-center border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-200">No credentials found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your private credentials will appear here once they are issued by an accredited institution.
            </p>
            <Button variant="primary" size="sm" onClick={resetToSampleData}>
              Load Sample Credentials
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.slice(0, 3).map((cred) => (
              <CredentialCard key={cred.publicData.id} credential={cred} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Generated Proofs */}
      {proofs.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Recent Zero-Knowledge Proofs
              </h2>
              <p className="text-xs text-slate-400">
                Shareable verification codes generated from your credentials.
              </p>
            </div>
            <Link to="/proofs">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                All Proofs ({proofs.length})
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proofs.slice(0, 3).map((proof) => (
              <ProofCard key={proof.proofId} proof={proof} />
            ))}
          </div>
        </div>
      )}
      </div>
    </WalletGuard>
  );
};
