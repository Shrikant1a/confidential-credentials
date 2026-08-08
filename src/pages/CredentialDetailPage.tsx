import React, { useState } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCredentials } from '../context/CredentialContext';
import { ProofGenerator } from '../components/proofs/ProofGenerator';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  Building,
  Calendar,
  Sparkles,
  Key,
  Copy,
  Hash,
  AlertTriangle,
} from 'lucide-react';
import { copyToClipboard, truncateAddress, formatDate } from '../../src/utils/formatters';
import { useToast } from '../context/ToastContext';

export const CredentialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getCredential } = useCredentials();
  const { success } = useToast();

  const credential = id ? getCredential(id) : undefined;
  const [isLocallyRevealed, setIsLocallyRevealed] = useState(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState(
    searchParams.get('action') === 'generate'
  );

  if (!credential) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Credential Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested credential does not exist or has been removed from your local wallet state.
        </p>
        <Link to="/credentials">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Credentials
          </Button>
        </Link>
      </div>
    );
  }

  const { publicData, privateData, issuerSignature } = credential;
  const isRevoked = publicData.status === 'revoked';

  const handleCopyCommitment = () => {
    copyToClipboard(publicData.credentialCommitment);
    success('Commitment Copied', 'Cryptographic commitment copied to clipboard');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Back button and navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/credentials')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Credentials
        </button>

        <Badge variant={isRevoked ? 'error' : 'success'} size="md">
          {isRevoked ? 'Revoked by Issuer' : '✓ Verified & Active'}
        </Badge>
      </div>

      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase text-brand-purple tracking-wider font-semibold">
            {publicData.category} Credential Details
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {publicData.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Issued by <strong className="text-slate-300">{publicData.issuerName}</strong>
          </p>
        </div>

        {!isGeneratingProof && (
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsGeneratingProof(true)}
            leftIcon={<Sparkles className="w-4 h-4" />}
          >
            Create Private Proof
          </Button>
        )}
      </div>

      {/* Proof Generator Drawer / Inline */}
      {isGeneratingProof ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              Selective Disclosure Proof Generator
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setIsGeneratingProof(false)}>
              Close Generator
            </Button>
          </div>
          <ProofGenerator
            credential={credential}
            onCancel={() => setIsGeneratingProof(false)}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 1: Public Credential Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card variant="elevated" className="p-6 border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-400" />
                  Public Metadata
                </h3>
                <Badge variant="cyan" size="sm">
                  Ledger Registered
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                  <span className="text-slate-500 block">Credential Type:</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {publicData.degreeType}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                  <span className="text-slate-500 block">Major / Field:</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {publicData.major}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                  <span className="text-slate-500 block">Graduation Year:</span>
                  <span className="text-slate-200 font-semibold mt-0.5 block">
                    {publicData.issueYear} ({formatDate(publicData.issueDate)})
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
                  <span className="text-slate-500 block">Issuer Address:</span>
                  <span className="text-slate-200 font-mono text-[11px] mt-0.5 block truncate">
                    {publicData.issuerAddress}
                  </span>
                </div>
              </div>

              {/* Cryptographic Commitment */}
              <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-brand-purple" />
                    On-Chain Credential Commitment
                  </span>
                  <button
                    onClick={handleCopyCommitment}
                    className="text-[11px] text-brand-purple hover:text-purple-300 flex items-center gap-1 transition-colors"
                  >
                    <Copy className="w-3 h-3" /> Copy Hash
                  </button>
                </div>
                <code className="text-xs text-slate-300 font-mono break-all block bg-midnight-900 p-2.5 rounded-lg border border-slate-800">
                  {publicData.credentialCommitment}
                </code>
              </div>
            </Card>

            {/* Issuer Signature */}
            <Card variant="default" className="p-5 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-emerald-400" />
                  Issuer Cryptographic Ed25519 Signature
                </span>
                <Badge variant="success" size="sm">Valid Signature</Badge>
              </div>
              <code className="text-[11px] font-mono text-slate-400 break-all block bg-midnight-950 p-2.5 rounded-lg border border-slate-800">
                {issuerSignature}
              </code>
            </Card>
          </div>

          {/* Section 2: Private Attributes (Shielded) */}
          <div className="space-y-6">
            <Card variant="elevated" className="p-6 border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-purple" />
                  <h3 className="text-sm font-bold text-slate-100">Private Attributes</h3>
                </div>
                <button
                  onClick={() => setIsLocallyRevealed(!isLocallyRevealed)}
                  className="text-xs text-brand-purple hover:text-purple-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  {isLocallyRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" /> Mask
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" /> Reveal locally
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                These fields are never revealed to verifiers. They are used purely as witness inputs in zero-knowledge circuits.
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Full Name:
                  </span>
                  {isLocallyRevealed ? (
                    <span className="font-semibold text-slate-100">{privateData.fullName}</span>
                  ) : (
                    <span className="font-mono text-brand-purple font-bold tracking-wider">
                      ████████
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Student ID:
                  </span>
                  {isLocallyRevealed ? (
                    <span className="font-semibold text-slate-100">{privateData.studentId}</span>
                  ) : (
                    <span className="font-mono text-brand-purple font-bold tracking-wider">
                      ████████
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Date of Birth:
                  </span>
                  {isLocallyRevealed ? (
                    <span className="font-semibold text-slate-100">{privateData.dateOfBirth}</span>
                  ) : (
                    <span className="font-mono text-brand-purple font-bold tracking-wider">
                      ████████
                    </span>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    Exact CGPA:
                  </span>
                  {isLocallyRevealed ? (
                    <span className="font-semibold text-slate-100">
                      {privateData.exactCgpa} / {privateData.cgpaScale}
                    </span>
                  ) : (
                    <span className="font-mono text-brand-purple font-bold tracking-wider">
                      ████ Private
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setIsGeneratingProof(true)}
                  leftIcon={<Sparkles className="w-4 h-4" />}
                >
                  Generate Proof From Credential
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
