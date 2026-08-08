import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Lock, Shield, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WalletGuardProps {
  children: React.ReactNode;
  featureName?: string;
  description?: string;
}

export const WalletGuard: React.FC<WalletGuardProps> = ({
  children,
  featureName = 'Private State & Credentials',
  description = 'You must connect your Midnight wallet to access private credentials, generate zero-knowledge proofs, or perform issuer operations.',
}) => {
  const { isConnected, openWalletModal } = useWallet();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-16">
      <Card
        variant="elevated"
        className="p-5 sm:p-10 md:p-12 border-slate-800 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-950 text-center space-y-5 sm:space-y-6 relative overflow-hidden"
      >
        {/* Ambient glow behind lock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-24 sm:h-32 bg-brand-purple/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-midnight-850 border border-brand-purple/40 flex items-center justify-center text-brand-purple shadow-xl shadow-purple-950/50">
          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-brand-purple animate-pulse" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <Badge variant="purple" size="sm" className="mb-1">
            Authentication Required
          </Badge>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Connect Wallet to Access {featureName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Security / Privacy Highlights */}
        <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left text-xs pt-1">
          <div className="p-3 rounded-xl bg-midnight-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-purple shrink-0" />
              Private Enclave
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Keys remain in your client enclave.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-midnight-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Zero Leakage
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Proofs are evaluated locally.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={openWalletModal}
            leftIcon={<Wallet className="w-4 h-4" />}
          >
            Connect Midnight Wallet
          </Button>

          <Link to="/verify" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Public Verifier
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
