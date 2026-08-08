import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import {
  Building2,
  Lock,
  Sparkles,
  CheckCircle2,
  Cpu,
  Shield,
  ArrowRight,
  HelpCircle,
  FileCode2,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="cyan" size="sm">
          Protocol Architecture
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          How Confidential Credentials Works
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Understanding the cryptographic interaction between Credential Issuers, Provers, Verifiers, and the Midnight Network blockchain.
        </p>
      </div>

      {/* 4 Steps In-Depth */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Step 1 */}
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-sm">
              01
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Credential Issuance & Commitment Registry
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            An accredited university or certification board generates a digital credential. Rather than publishing private student records to the blockchain, the issuer computes a cryptographic SHA-256 commitment of the student’s private attributes combined with a random blinding factor:
          </p>
          <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 font-mono text-xs text-blue-300">
            Commitment = Hash(Name ‖ StudentID ‖ DOB ‖ CGPA ‖ BlindingFactor ‖ IssuerKey)
          </div>
          <p className="text-xs text-slate-400">
            The issuer signs this commitment using their Ed25519 institutional key and anchors the commitment to Midnight’s public ledger.
          </p>
        </Card>

        {/* Step 2 */}
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-purple-500/10 text-brand-purple border border-purple-500/20 flex items-center justify-center font-mono font-bold text-sm">
              02
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Private State Storage on Client
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The full credential data (including name, student ID, transcript, and blinding factor) is sent directly to the student&apos;s Midnight Lace wallet or browser secure store. The raw values never touch the blockchain or external servers.
          </p>
        </Card>

        {/* Step 3 */}
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-mono font-bold text-sm">
              03
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Selective Disclosure Proof Synthesis
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When applying for a job, the holder chooses what claims to prove (e.g. &ldquo;Degree is BSc CS&rdquo; and &ldquo;CGPA &ge; 3.5&rdquo;). The Midnight privacy circuit evaluates the private witness locally:
          </p>
          <ul className="space-y-2 text-xs text-slate-300 pl-4 list-disc">
            <li>Recomputes the cryptographic commitment from private witness inputs</li>
            <li>Validates the issuer’s digital signature</li>
            <li>Checks threshold inequalities without outputting exact values</li>
            <li>Generates a zero-knowledge SNARK proof (<code className="text-purple-300">pi_a, pi_b, pi_c</code>)</li>
          </ul>
        </Card>

        {/* Step 4 */}
        <Card variant="elevated" className="p-6 sm:p-8 border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono font-bold text-sm">
              04
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Smart Contract Verification on Midnight
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The verifier executes the <code className="text-emerald-400">verifySelectiveDisclosureProof</code> circuit on Midnight. The contract validates the elliptic curve pairings, confirms the issuer is in good standing, and ensures the credential has not been revoked.
          </p>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-slate-100 text-center">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-midnight-900 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-200">Can someone fake a proof?</h4>
            <p className="text-slate-400 leading-relaxed">
              No. Zero-knowledge SNARKs have cryptographic soundness. Without knowing valid private witness attributes signed by an accredited issuer, the probability of forging a proof is negligible (&lt; 2<sup>-128</sup>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-midnight-900 border border-slate-800 space-y-2">
            <h4 className="font-semibold text-slate-200">Can verifiers correlate different proofs?</h4>
            <p className="text-slate-400 leading-relaxed">
              Every proof uses a fresh randomized cryptographic nonce, preventing linkage between multiple job applications or verification events.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="text-center">
        <Link to="/verify">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Test Verification Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
