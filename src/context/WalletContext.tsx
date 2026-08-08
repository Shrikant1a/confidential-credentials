import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletState } from '../types';
import { walletService } from '../services/walletService';
import { useToast } from './ToastContext';

interface WalletContextType extends WalletState {
  isModalOpen: boolean;
  openWalletModal: () => void;
  closeWalletModal: () => void;
  connectWallet: (type?: 'lace' | 'devnet', networkId?: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>(walletService.getState());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, info, error } = useToast();

  useEffect(() => {
    const unsubscribe = walletService.subscribe((state) => {
      setWalletState(state);
    });
    return () => unsubscribe();
  }, []);

  const openWalletModal = () => setIsModalOpen(true);
  const closeWalletModal = () => setIsModalOpen(false);

  const connectWallet = async (type?: 'lace' | 'devnet', networkId?: string) => {
    try {
      const state = await walletService.connect(type, networkId);
      setIsModalOpen(false);
      const isLace = state.walletType === 'lace';
      success(
        isLace ? 'Midnight Lace Wallet Authorized' : 'Devnet Wallet Connected',
        `Connected (${state.shortAddress}) on ${state.network}`
      );
    } catch (err: any) {
      console.error(err);
      error(
        'Wallet Connection Rejected',
        err.message || 'Could not connect to Midnight Lace wallet.'
      );
    }
  };

  const disconnectWallet = async () => {
    await walletService.disconnect();
    info('Wallet Disconnected', 'Midnight session terminated');
  };

  return (
    <WalletContext.Provider
      value={{
        ...walletState,
        isModalOpen,
        openWalletModal,
        closeWalletModal,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
