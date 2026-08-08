import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { Button } from '../ui/Button';
import { Wallet, ShieldCheck, ChevronDown } from 'lucide-react';

export const WalletButton: React.FC = () => {
  const { isConnected, shortAddress, isConnecting, openWalletModal } = useWallet();

  if (isConnected && shortAddress) {
    return (
      <button
        onClick={openWalletModal}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-midnight-850 hover:bg-midnight-800 border border-brand-purple/30 hover:border-brand-purple/60 transition-all text-xs font-mono text-slate-200 group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="flex items-center gap-1.5 text-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-purple" />
          {shortAddress}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform" />
      </button>
    );
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={openWalletModal}
      isLoading={isConnecting}
      leftIcon={<Wallet className="w-4 h-4" />}
    >
      Connect Wallet
    </Button>
  );
};
