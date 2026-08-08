import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WalletProvider } from './context/WalletContext';
import { CredentialProvider } from './context/CredentialContext';
import { AppLayout } from './components/layout/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { CredentialDetailPage } from './pages/CredentialDetailPage';
import { ProofsPage } from './pages/ProofsPage';
import { VerifyPage } from './pages/VerifyPage';
import { IssuerPage } from './pages/IssuerPage';
import { PrivacyCenterPage } from './pages/PrivacyCenterPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <WalletProvider>
          <CredentialProvider>
            <AppLayout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/credentials" element={<CredentialsPage />} />
                <Route path="/credentials/:id" element={<CredentialDetailPage />} />
                <Route path="/proofs" element={<ProofsPage />} />
                <Route path="/verify" element={<VerifyPage />} />
                <Route path="/issuer" element={<IssuerPage />} />
                <Route path="/privacy" element={<PrivacyCenterPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
              </Routes>
            </AppLayout>
          </CredentialProvider>
        </WalletProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
