import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Shield, Copy, LogOut, ExternalLink, Globe } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { SUPPORTED_MIDNIGHT_NETWORKS } from '../../services/walletService';

export const WalletModal: React.FC = () => {
  const {
    isModalOpen,
    closeWalletModal,
    isConnected,
    address,
    shortAddress,
    balance,
    network,
    isConnecting,
    walletType,
    isLaceDetected,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const { success } = useToast();
  const [selectedNetwork, setSelectedNetwork] = useState<string>('undeployed');

  const handleCopy = () => {
    if (address) {
      copyToClipboard(address);
      success('Address Copied', 'Wallet address copied to clipboard');
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeWalletModal}
      title={isConnected ? 'Midnight Wallet Account' : 'Connect Midnight Wallet'}
      subtitle={
        isConnected
          ? 'Manage your zero-knowledge private key and authorized session'
          : 'Authorize Confidential Credentials in Midnight Lace or connect local devnet'
      }
      maxWidth="md"
    >
      {isConnected ? (
        <div className="space-y-5">
          {/* Status header */}
          <div className="p-4 rounded-xl bg-midnight-950/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-100">
                    {walletType === 'lace' ? 'Midnight Lace DApp' : 'Midnight Devnet'}
                  </span>
                  <Badge variant="success" size="sm">
                    {walletType === 'lace' ? 'Authorized in Lace' : 'Connected'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{shortAddress}</p>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-midnight-800 hover:bg-midnight-750 text-slate-400 hover:text-slate-200 border border-slate-700/60 transition-colors"
              title="Copy Address"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          {/* Details breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
              <span className="text-slate-500 font-medium">Network</span>
              <p className="text-slate-200 font-semibold mt-1">{network}</p>
            </div>
            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
              <span className="text-slate-500 font-medium">Private Balance</span>
              <p className="text-slate-200 font-semibold mt-1">{balance} tDUST</p>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-300/90 leading-relaxed flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Your private keys remain in your browser/hardware enclave. Only zero-knowledge proofs and selective disclosure claims are transmitted to verifiers.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="danger"
              size="sm"
              className="w-full"
              onClick={async () => {
                await disconnectWallet();
                closeWalletModal();
              }}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Disconnect Wallet
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Network Selector */}
          <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-brand-purple" />
                Select Midnight Network:
              </span>
            </div>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full bg-midnight-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-medium focus:outline-none focus:border-brand-purple"
            >
              {SUPPORTED_MIDNIGHT_NETWORKS.map((net) => (
                <option key={net.id} value={net.id}>
                  {net.label} ({net.id})
                </option>
              ))}
            </select>
          </div>

          {/* Option 1: Official Midnight Lace Wallet */}
          <div
            className={`p-4 rounded-xl border transition-all cursor-pointer group flex items-center justify-between ${
              isLaceDetected
                ? 'bg-midnight-950 border-brand-purple/40 hover:border-brand-purple hover:bg-midnight-900'
                : 'bg-midnight-950/60 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => connectWallet('lace', selectedNetwork)}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 flex items-center justify-center text-xl">
                🌙
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-100 group-hover:text-brand-purple transition-colors">
                    Midnight Lace Wallet
                  </h4>
                  {isLaceDetected ? (
                    <Badge variant="success" size="sm">
                      Extension Detected
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      Check Extension
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Official zero-knowledge wallet (triggers Lace authorization prompt)
                </p>
              </div>
            </div>
          </div>

          {/* Option 2: Devnet / Sandbox Simulation */}
          <div
            className="p-4 rounded-xl bg-midnight-950 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group flex items-center justify-between"
            onClick={() => connectWallet('devnet')}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
                🛡️
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100">
                  Devnet Sandbox Mode
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulate privacy proofs without browser extension
                </p>
              </div>
            </div>
            <Badge variant="neutral" size="sm">Sandbox</Badge>
          </div>

          {/* Lace install helper if not detected */}
          {!isLaceDetected && (
            <div className="p-3 rounded-xl bg-purple-950/20 border border-brand-purple/20 text-xs text-slate-400 flex items-center justify-between">
              <span>Need Midnight Lace wallet extension?</span>
              <a
                href="https://midnight.network"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-purple hover:text-purple-300 font-medium inline-flex items-center gap-1"
              >
                Get Lace <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              isLoading={isConnecting}
              onClick={() => connectWallet('lace', selectedNetwork)}
            >
              {isConnecting
                ? 'Authorizing with Midnight Lace...'
                : 'Connect Midnight Lace Wallet'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
