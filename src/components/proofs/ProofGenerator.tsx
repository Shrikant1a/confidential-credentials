import React, { useState } from 'react';
import { Credential, ProofClaimSelection, ZeroKnowledgeProof } from '../../types';
import { useCredentials } from '../../context/CredentialContext';
import { ProofStepper } from './ProofStepper';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle2,
  Copy,
  Download,
  Share2,
  FileCode,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { copyToClipboard, truncateAddress } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

interface ProofGeneratorProps {
  credential: Credential;
  onSuccess?: (proof: ZeroKnowledgeProof) => void;
  onCancel?: () => void;
}

export const ProofGenerator: React.FC<ProofGeneratorProps> = ({
  credential,
  onSuccess,
  onCancel,
}) => {
  const { generateProofForCredential } = useCredentials();
  const { success } = useToast();

  const [step, setStep] = useState<number>(2); // Start at claim selection (step 2)
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProof, setGeneratedProof] = useState<ZeroKnowledgeProof | null>(null);

  // Claim configurations
  const [isDegreeValid, setIsDegreeValid] = useState(true);
  const [isIssuerAuthorized, setIsIssuerAuthorized] = useState(true);
  const [enableCgpaThreshold, setEnableCgpaThreshold] = useState(true);
  const [cgpaThreshold, setCgpaThreshold] = useState(
    credential.privateData.cgpaScale === 10.0 ? 7.5 : 3.5
  );
  const [enableGradYearThreshold, setEnableGradYearThreshold] = useState(true);
  const [gradYearThreshold, setGradYearThreshold] = useState(2023);

  const handleStartGeneration = async () => {
    setStep(3);
    setIsGenerating(true);

    const claims: ProofClaimSelection = {
      isDegreeValid,
      isIssuerAuthorized,
      minCgpaThreshold: enableCgpaThreshold ? cgpaThreshold : undefined,
      minGraduationYear: enableGradYearThreshold ? gradYearThreshold : undefined,
      degreeTypeMatch: credential.publicData.title,
    };

    try {
      // Simulate zero-knowledge constraint synthesis
      await new Promise((r) => setTimeout(r, 1400));
      const proof = await generateProofForCredential(credential, claims);
      setGeneratedProof(proof);
      setStep(4);
      if (onSuccess) onSuccess(proof);
    } catch (err) {
      setStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (generatedProof) {
      copyToClipboard(generatedProof.verificationCode);
      success('Code Copied', `Verification code ${generatedProof.verificationCode} copied to clipboard`);
    }
  };

  const handleDownloadJson = () => {
    if (!generatedProof) return;
    const blob = new Blob([JSON.stringify(generatedProof, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zkproof-${generatedProof.verificationCode}.json`;
    a.click();
    URL.revokeObjectURL(url);
    success('Proof Downloaded', 'Zero-Knowledge proof package saved as JSON');
  };

  return (
    <div className="space-y-6">
      <ProofStepper currentStep={step} />

      {/* Step 2: Configure Claims */}
      {step === 2 && (
        <Card variant="elevated" className="p-6 border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <Badge variant="purple" size="sm" className="mb-2">
              Selective Disclosure Configuration
            </Badge>
            <h3 className="text-lg font-bold text-slate-100">
              Select what you want to prove
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Choose the exact claims to prove cryptographically. Your personal identity, full name, student ID, and exact score will remain completely undisclosed.
            </p>
          </div>

          {/* Claims Checkboxes */}
          <div className="space-y-3.5">
            {/* Claim 1 */}
            <label className="flex items-start gap-3.5 p-3.5 rounded-xl bg-midnight-950/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={isDegreeValid}
                onChange={(e) => setIsDegreeValid(e.target.checked)}
                className="mt-1 rounded border-slate-700 bg-midnight-900 text-brand-purple focus:ring-brand-purple"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-100 block">
                  Degree Authenticity & Existence
                </span>
                <p className="text-slate-400 mt-0.5">
                  Proves that you hold a valid, non-revoked degree without disclosing student registration numbers.
                </p>
              </div>
            </label>

            {/* Claim 2 */}
            <label className="flex items-start gap-3.5 p-3.5 rounded-xl bg-midnight-950/80 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={isIssuerAuthorized}
                onChange={(e) => setIsIssuerAuthorized(e.target.checked)}
                className="mt-1 rounded border-slate-700 bg-midnight-900 text-brand-purple focus:ring-brand-purple"
              />
              <div className="text-xs">
                <span className="font-semibold text-slate-100 block">
                  Accredited Issuer Verification
                </span>
                <p className="text-slate-400 mt-0.5">
                  Proves that the credential was signed by an officially registered institution ({credential.publicData.issuerName}).
                </p>
              </div>
            </label>

            {/* Claim 3: CGPA Threshold */}
            <div className="p-3.5 rounded-xl bg-midnight-950/80 border border-slate-800 space-y-3">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableCgpaThreshold}
                  onChange={(e) => setEnableCgpaThreshold(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-midnight-900 text-brand-purple focus:ring-brand-purple"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-100 block">
                    Performance Threshold Claim
                  </span>
                  <p className="text-slate-400 mt-0.5">
                    Proves that your CGPA meets or exceeds a required threshold without revealing your exact CGPA score.
                  </p>
                </div>
              </label>

              {enableCgpaThreshold && (
                <div className="ml-7 pt-2 border-t border-slate-850 flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
                    Prove CGPA is ≥
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max={credential.privateData.cgpaScale}
                    value={cgpaThreshold}
                    onChange={(e) => setCgpaThreshold(parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-1.5 rounded-lg bg-midnight-900 border border-slate-700 text-slate-100 text-xs font-mono focus:border-brand-purple focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">
                    (Scale: max {credential.privateData.cgpaScale})
                  </span>
                </div>
              )}
            </div>

            {/* Claim 4: Graduation Year */}
            <div className="p-3.5 rounded-xl bg-midnight-950/80 border border-slate-800 space-y-3">
              <label className="flex items-start gap-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableGradYearThreshold}
                  onChange={(e) => setEnableGradYearThreshold(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-midnight-900 text-brand-purple focus:ring-brand-purple"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-100 block">
                    Recency / Graduation Year Claim
                  </span>
                  <p className="text-slate-400 mt-0.5">
                    Proves that you completed your degree on or after a specific year.
                  </p>
                </div>
              </label>

              {enableGradYearThreshold && (
                <div className="ml-7 pt-2 border-t border-slate-850 flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-medium whitespace-nowrap">
                    Prove Graduated on or after:
                  </span>
                  <input
                    type="number"
                    min="1990"
                    max="2030"
                    value={gradYearThreshold}
                    onChange={(e) => setGradYearThreshold(parseInt(e.target.value) || 2020)}
                    className="w-28 px-3 py-1.5 rounded-lg bg-midnight-900 border border-slate-700 text-slate-100 text-xs font-mono focus:border-brand-purple focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Privacy Guarantee Pill */}
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-brand-purple/20 flex items-center gap-3 text-xs text-purple-200">
            <Lock className="w-4 h-4 text-brand-purple shrink-0" />
            <span>
              <strong>Zero-Knowledge Assurance:</strong> The verifier will receive a cryptographic proof verifying your claims mathematically without learning your full name, student ID, or exact scores.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {onCancel && (
              <Button variant="ghost" size="md" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              onClick={handleStartGeneration}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Generate Private Proof
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Generation in progress */}
      {step === 3 && (
        <Card variant="elevated" className="p-12 border-slate-800 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-brand-purple/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-midnight-850 border border-brand-purple/50 flex items-center justify-center text-brand-purple shadow-xl shadow-purple-900/30">
              <RefreshCw className="w-8 h-8 animate-spin text-brand-purple" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-100">
              Generating privacy-preserving proof...
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Evaluating Midnight witness constraints, synthesizing zero-knowledge SNARK proof points, and establishing selective disclosure guarantees.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
            Circuit: midnight-selective-disclosure-v2
          </div>
        </Card>
      )}

      {/* Step 4: Proof Generated Successfully */}
      {step === 4 && generatedProof && (
        <Card variant="elevated" className="p-6 border-slate-800 space-y-6">
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-300">
                Proof Generated Successfully
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Your claim can now be verified by employers or institutions without revealing your private credential data.
              </p>
            </div>
          </div>

          {/* Verification Code Box */}
          <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
              Shareable Verification Code
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xl font-bold tracking-wider text-slate-100 bg-midnight-900 px-3 py-1.5 rounded-lg border border-slate-700/80">
                {generatedProof.verificationCode}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopyCode}
                leftIcon={<Copy className="w-3.5 h-3.5" />}
              >
                Copy Code
              </Button>
            </div>
            <p className="text-[11px] text-slate-400">
              Verifiers can enter this code at <code className="text-slate-300">/verify</code> to check authenticity instantly.
            </p>
          </div>

          {/* Proof Summary Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Proof ID</span>
              <span className="text-slate-200 font-mono font-medium truncate block mt-0.5">
                {generatedProof.proofId}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800">
              <span className="text-slate-500 text-[10px] uppercase font-mono block">Commitment</span>
              <span className="text-slate-200 font-mono font-medium truncate block mt-0.5">
                {truncateAddress(generatedProof.credentialCommitment, 8, 6)}
              </span>
            </div>
          </div>

          {/* Verified Claims Included */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Disclosed Claims:
            </span>
            <div className="space-y-1.5">
              {generatedProof.publicInputs.verifiedClaims.map((claim, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{claim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadJson}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Download Proof JSON
            </Button>

            <div className="flex items-center gap-2">
              <Link to="/proofs">
                <Button variant="secondary" size="sm">
                  View All Proofs
                </Button>
              </Link>
              <Link to={`/verify?code=${generatedProof.verificationCode}`}>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Test Verification
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
