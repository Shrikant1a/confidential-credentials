import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Lock, Shield, Wallet, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Card
        variant="elevated"
        className="p-8 sm:p-12 border-slate-800 bg-gradient-to-b from-midnight-900 via-midnight-950 to-midnight-950 text-center space-y-6 relative overflow-hidden"
      >
        {/* Ambient glow behind lock */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-purple/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-midnight-850 border border-brand-purple/40 flex items-center justify-center text-brand-purple shadow-xl shadow-purple-950/50">
          <Lock className="w-8 h-8 text-brand-purple animate-pulse" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <Badge variant="purple" size="sm" className="mb-2">
            Authentication Required
          </Badge>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Connect Wallet to Access {featureName}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Security / Privacy Highlights */}
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left text-xs pt-2">
          <div className="p-3 rounded-xl bg-midnight-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-brand-purple" />
              Private Enclave
            </span>
            <p className="text-[11px] text-slate-400">
              Keys remain in your client enclave.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-midnight-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Zero Leakage
            </span>
            <p className="text-[11px] text-slate-400">
              Proofs are evaluated locally.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={openWalletModal}
            leftIcon={<Wallet className="w-4 h-4" />}
          >
            Connect Midnight Wallet
          </Button>

          <Link to="/verify">
            <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Public Verifier
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
