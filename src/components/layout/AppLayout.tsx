import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WalletModal } from '../wallet/WalletModal';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-midnight-950 text-slate-100 relative selection:bg-brand-purple/30 selection:text-brand-purple">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[120px]" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">{children}</main>

      <Footer />

      <WalletModal />
    </div>
  );
};
