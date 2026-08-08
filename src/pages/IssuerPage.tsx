import React, { useState } from 'react';
import { useCredentials } from '../context/CredentialContext';
import { IssueCredentialModal } from '../components/issuer/IssueCredentialModal';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';
import { truncateAddress } from '../../src/utils/formatters';
import { WalletGuard } from '../components/wallet/WalletGuard';

export const IssuerPage: React.FC = () => {
  const { credentials, issuers, revokeCredential } = useCredentials();
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  const activeIssuer = issuers[0];

  return (
    <WalletGuard featureName="Issuer Authority Portal" description="Connect your accredited Midnight wallet to issue cryptographically signed credentials and manage on-chain revocation nullifiers.">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-brand-purple uppercase tracking-wider font-semibold">
                Institutional Authority Workspace
              </span>
              <Badge variant="purple" size="sm">
                Issuer Authority
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Issuer Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Issue cryptographically signed credentials, manage revocations, and audit issuance commitments.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
              onClick={() => setIsIssueModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Issue New Credential
            </Button>
          </div>
        </div>

        {/* Issuer Authority Profile Card */}
        <Card variant="elevated" className="p-5 sm:p-6 border-slate-800 space-y-4 bg-gradient-to-r from-midnight-900 via-midnight-900 to-blue-950/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-midnight-850 border border-slate-700 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                {activeIssuer.logo}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-100">{activeIssuer.name}</h3>
                  <Badge variant="success" size="sm">
                    <ShieldCheck className="w-3 h-3" /> Accredited Institution
                  </Badge>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5 break-all sm:break-normal">
                  Address: {truncateAddress(activeIssuer.address, 10, 6)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-midnight-950 border border-slate-800 text-center flex-1 sm:flex-initial">
                <span className="text-slate-500 block text-[9px] sm:text-[10px]">TOTAL ISSUED</span>
                <span className="text-sm sm:text-base font-bold text-slate-100">
                  {activeIssuer.credentialsIssuedCount}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-midnight-950 border border-slate-800 text-center flex-1 sm:flex-initial">
                <span className="text-slate-500 block text-[9px] sm:text-[10px]">LEDGER STATUS</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Issued Credentials Management Table */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              Issued Credential Registry
            </h2>
            <p className="text-xs text-slate-400">
              Credentials issued by accredited authorities on the Midnight ledger.
            </p>
          </div>

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block">
            <Card variant="default" className="border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-midnight-950 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-5 py-3.5">Credential</th>
                      <th className="px-5 py-3.5">Recipient</th>
                      <th className="px-5 py-3.5">Year</th>
                      <th className="px-5 py-3.5">Commitment Hash</th>
                      <th className="px-5 py-3.5">Status</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {credentials.map((cred) => {
                      const isRevoked = cred.publicData.status === 'revoked';
                      return (
                        <tr key={cred.publicData.id} className="hover:bg-midnight-850/50 transition-colors">
                          <td className="px-5 py-4 font-semibold text-slate-200">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{cred.publicData.issuerLogo || '🎓'}</span>
                              <div>
                                <span>{cred.publicData.title}</span>
                                <span className="text-[10px] text-slate-500 block font-mono">
                                  {cred.publicData.degreeType}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-4 font-mono text-slate-400">
                            {cred.privateData.fullName ? `${cred.privateData.fullName} (Private)` : 'Shielded'}
                          </td>
                          <td className="px-5 py-4 font-mono text-slate-300">
                            {cred.publicData.issueYear}
                          </td>
                          <td className="px-5 py-4 font-mono text-slate-400 text-[11px]">
                            {truncateAddress(cred.publicData.credentialCommitment, 8, 6)}
                          </td>
                          <td className="px-5 py-4">
                            <Badge variant={isRevoked ? 'error' : 'success'} size="sm">
                              {isRevoked ? 'Revoked' : 'Active'}
                            </Badge>
                          </td>
                          <td className="px-5 py-4 text-right">
                            {!isRevoked ? (
                              <button
                                onClick={() => revokeCredential(cred.publicData.id)}
                                className="px-2.5 py-1 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/40 transition-colors text-[11px] font-medium"
                              >
                                Revoke
                              </button>
                            ) : (
                              <span className="text-slate-500 font-mono text-[11px]">Nullified</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Mobile Card View (Visible on screens < 768px) */}
          <div className="md:hidden space-y-3">
            {credentials.map((cred) => {
              const isRevoked = cred.publicData.status === 'revoked';
              return (
                <Card key={cred.publicData.id} variant="default" className="p-4 border-slate-800 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{cred.publicData.issuerLogo || '🎓'}</span>
                      <div>
                        <h4 className="font-semibold text-xs text-slate-100 line-clamp-1">
                          {cred.publicData.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">
                          Year: {cred.publicData.issueYear}
                        </span>
                      </div>
                    </div>
                    <Badge variant={isRevoked ? 'error' : 'success'} size="sm">
                      {isRevoked ? 'Revoked' : 'Active'}
                    </Badge>
                  </div>

                  <div className="p-2.5 rounded-lg bg-midnight-950 border border-slate-850 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Recipient:</span>
                      <span className="text-slate-200 font-mono">{cred.privateData.fullName || 'Shielded'}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Commitment:</span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        {truncateAddress(cred.publicData.credentialCommitment, 6, 4)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    {!isRevoked ? (
                      <button
                        onClick={() => revokeCredential(cred.publicData.id)}
                        className="w-full py-1.5 px-3 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-800/40 transition-colors text-xs font-medium text-center"
                      >
                        Revoke Credential
                      </button>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px] text-center w-full block py-1">
                        Commitment Nullified
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Issue Credential Modal */}
        <IssueCredentialModal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
        />
      </div>
    </WalletGuard>
  );
};
