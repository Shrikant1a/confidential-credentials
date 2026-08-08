import React from 'react';
import { useWallet } from '../../context/WalletContext';
import { ShieldCheck, ShieldAlert, Cpu } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const WalletStatus: React.FC = () => {
  const { isConnected, shortAddress, network, walletType } = useWallet();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-midnight-900/90 border border-slate-800/80 backdrop-blur-md">
      <div className={`p-2 rounded-lg ${isConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
        {isConnected ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
      </div>
      <div className="text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">
            {isConnected
              ? walletType === 'lace'
                ? 'Midnight Lace Wallet'
                : 'Devnet Sandbox'
              : 'Wallet Disconnected'}
          </span>
          <Badge variant={isConnected ? 'success' : 'warning'} size="sm">
            {isConnected ? (walletType === 'lace' ? 'Authorized in Lace' : network) : 'Disconnected'}
          </Badge>
        </div>
        <p className="text-slate-400 font-mono text-[11px] mt-0.5">
          {isConnected ? shortAddress : 'Click Connect Wallet to authorize in Lace'}
        </p>
      </div>
    </div>
  );
};
