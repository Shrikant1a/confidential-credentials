import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { DisclosureComparison } from '../components/privacy/DisclosureComparison';
import {
  Shield,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  FileCheck,
  Building,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                MIDNIGHT PRIVACY TECHNOLOGY
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Prove your credentials.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-300 to-brand-purple bg-clip-text text-transparent">
                  Keep your identity private.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Confidential Credentials lets students and professionals prove that their credentials are valid without exposing unnecessary personal information such as legal names, IDs, dates of birth, or exact GPA.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/verify">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Verify a Credential
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    How It Works
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-brand-purple" />
                  Zero-Knowledge Proofs
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-400" />
                  Client-Side Private State
                </span>
                <span className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Midnight Compact Circuits
                </span>
              </div>
            </div>

            {/* Right Col: Sophisticated Privacy / Proof Visualization */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Glow behind card */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-2xl opacity-70 pointer-events-none" />

                <Card variant="elevated" className="p-6 border-slate-800 space-y-5 relative bg-midnight-900/90 backdrop-blur-2xl">
                  {/* Visual Step 1: Private Credential */}
                  <div className="p-4 rounded-xl bg-midnight-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                        Private Credential Record
                      </span>
                      <Badge variant="success" size="sm">
                        ✓ Verified
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100">
                      BSc Computer Science & Engineering
                    </h4>

                    {/* Shielded Data Fields */}
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Holder Identity:</span>
                        <span className="text-brand-purple font-bold tracking-widest">
                          ████████████
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Student ID / DOB:</span>
                        <span className="text-brand-purple font-bold tracking-widest">
                          ████████████
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Exact Score:</span>
                        <span className="text-brand-purple font-bold tracking-widest">
                          ████ Private
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow with Zero Knowledge Badge */}
                  <div className="flex flex-col items-center justify-center py-1 relative">
                    <div className="w-0.5 h-4 bg-gradient-to-b from-slate-700 to-brand-purple" />
                    <div className="px-3 py-1 rounded-full bg-midnight-800 border border-brand-purple/40 text-[10px] font-mono font-semibold text-brand-purple shadow-lg shadow-purple-950/50 my-1 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-brand-purple" />
                      ZERO-KNOWLEDGE WITNESS EVALUATION
                    </div>
                    <div className="w-0.5 h-4 bg-gradient-to-b from-brand-purple to-emerald-500" />
                  </div>

                  {/* Visual Step 2: Public Verification Proof */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400">
                        Public Midnight Verification
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        VALID PROOF
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Degree is authentic and unrevoked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>CGPA requirement satisfied (&ge; 3.5)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Issuer accredited by Ministry / Board</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRIVACY HIGHLIGHT SECTION (COMPARISON) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DisclosureComparison />
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="cyan" size="sm">
            Step-by-Step Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            How Confidential Credentials Works
          </h2>
          <p className="text-sm text-slate-400">
            A privacy-preserving 4-phase lifecycle powered by Midnight smart contracts and zero-knowledge circuits.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 01 */}
          <Card variant="interactive" className="p-6 border-slate-800 space-y-4 relative">
            <span className="text-3xl font-black text-slate-700/80 font-mono block">
              01
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Issue</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              An authorized university or institution signs and issues a digital credential commitment to the student’s address.
            </p>
          </Card>

          {/* Step 02 */}
          <Card variant="interactive" className="p-6 border-slate-800 space-y-4 relative">
            <span className="text-3xl font-black text-slate-700/80 font-mono block">
              02
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-brand-purple">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Store Privately</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The full credential payload remains protected in the holder’s private client state and hardware wallet enclave.
            </p>
          </Card>

          {/* Step 03 */}
          <Card variant="interactive" className="p-6 border-slate-800 space-y-4 relative">
            <span className="text-3xl font-black text-slate-700/80 font-mono block">
              03
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Generate Proof</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The user selects specific claims and synthesizes a zero-knowledge proof without leaking raw witness attributes.
            </p>
          </Card>

          {/* Step 04 */}
          <Card variant="interactive" className="p-6 border-slate-800 space-y-4 relative">
            <span className="text-3xl font-black text-slate-700/80 font-mono block">
              04
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-100">Verify</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The verifier confirms validity via Midnight smart contracts with 100% mathematical assurance and zero data exposure.
            </p>
          </Card>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card
          variant="elevated"
          className="p-8 sm:p-12 border-slate-800 bg-gradient-to-r from-blue-950/40 via-midnight-900 to-purple-950/40 text-center space-y-6 relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to verify credentials privately?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore active credentials, generate custom selective disclosure proofs, or verify an applicant’s claim instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button variant="primary" size="lg">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/verify">
              <Button variant="outline" size="lg">
                Open Public Verifier
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};
