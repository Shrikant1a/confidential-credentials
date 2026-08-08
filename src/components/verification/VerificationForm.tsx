import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VerificationAuditReport, ZeroKnowledgeProof } from '../../types';
import { verificationService } from '../../services/verificationService';
import { proofService } from '../../services/proofService';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { VerificationResult } from './VerificationResult';
import { VerificationFailure } from './VerificationFailure';
import {
  UploadCloud,
  FileCode,
  ShieldCheck,
  Search,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const VerificationForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { error, info } = useToast();

  const [activeTab, setActiveTab] = useState<'code' | 'upload'>('code');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationReport, setVerificationReport] = useState<VerificationAuditReport | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Pre-fill from URL query param if present
  useEffect(() => {
    const codeParam = searchParams.get('code');
    if (codeParam) {
      setVerificationCode(codeParam);
      handleVerifyByCode(codeParam);
    }
  }, [searchParams]);

  const handleVerifyByCode = async (codeToVerify?: string) => {
    const code = (codeToVerify || verificationCode).trim();
    if (!code) {
      error('Verification Code Required', 'Please enter a valid verification code (e.g. CC-78A9-2B3F)');
      return;
    }

    setIsVerifying(true);
    setFailureReason(null);
    setVerificationReport(null);

    try {
      const report = await verificationService.verifyByCode(code);
      if (report.isValid) {
        setVerificationReport(report);
      } else {
        setFailureReason(report.failureReason || 'Verification failed');
      }
    } catch (err: any) {
      setFailureReason(err.message || 'Failed to verify proof with Midnight verifier contract.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsVerifying(true);
      setFailureReason(null);
      const text = await file.text();
      const proofObj: ZeroKnowledgeProof = JSON.parse(text);
      const report = await verificationService.verifyProofObject(proofObj);
      if (report.isValid) {
        setVerificationReport(report);
      } else {
        setFailureReason(report.failureReason || 'Proof verification failed on ledger');
      }
    } catch (err: any) {
      setFailureReason(err.message || 'Invalid or unparseable proof JSON file');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setVerificationReport(null);
    setFailureReason(null);
    setVerificationCode('');
  };

  if (verificationReport) {
    return <VerificationResult report={verificationReport} onReset={handleReset} />;
  }

  if (failureReason) {
    return <VerificationFailure reason={failureReason} onRetry={handleReset} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Verification Tabs */}
      <div className="flex p-1 bg-midnight-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'code'
              ? 'bg-midnight-800 text-white shadow-md border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          Verification Code
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'upload'
              ? 'bg-midnight-800 text-white shadow-md border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5" />
          Upload Proof JSON
        </button>
      </div>

      {isVerifying ? (
        <Card variant="elevated" className="p-12 border-slate-800 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-midnight-850 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-900/30">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100">
              Verifying proof on Midnight...
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Evaluating zero-knowledge pairing equations, checking issuer signature against decentralized registry, and ensuring nullifier non-revocation.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Midnight Verifier Circuit: Active
          </div>
        </Card>
      ) : activeTab === 'code' ? (
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Verify with Code
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Enter the unique 8-character verification code provided by the credential holder.
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Verification Code"
              placeholder="e.g. CC-78A9-2B3F"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
              className="font-mono text-base uppercase tracking-wider"
              leftIcon={<Search className="w-4 h-4" />}
            />

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => handleVerifyByCode()}
              disabled={!verificationCode.trim()}
              leftIcon={<ShieldCheck className="w-5 h-5" />}
            >
              Verify Proof
            </Button>
          </div>

          {/* Sample quick test pill */}
          <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-850 flex items-center justify-between text-xs">
            <span className="text-slate-400">Want to test with sample code?</span>
            <button
              onClick={async () => {
                const proofs = await proofService.getProofs();
                if (proofs.length > 0) {
                  setVerificationCode(proofs[0].verificationCode);
                } else {
                  info('No Active Proofs', 'Generate a proof from the Credentials tab first');
                }
              }}
              className="text-brand-purple hover:text-purple-300 font-semibold transition-colors"
            >
              Autofill Active Proof
            </button>
          </div>
        </Card>
      ) : (
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Upload Proof Package
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Upload an exported cryptographic <code className="text-slate-300">zkproof-*.json</code> file to verify off-chain or on-chain claims.
            </p>
          </div>

          {/* Drag and Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-brand-purple bg-brand-purple/5'
                : 'border-slate-700/80 hover:border-slate-600 bg-midnight-950/60'
            }`}
            onClick={() => document.getElementById('proof-file-input')?.click()}
          >
            <input
              id="proof-file-input"
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <div className="w-14 h-14 rounded-2xl bg-midnight-850 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-7 h-7 text-brand-purple" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">
              Drag & drop proof file here
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              or click to browse your local filesystem (.json)
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
