import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ExternalLink, Lock, CheckCircle2, Github, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-midnight-950/90 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-slate-100 tracking-tight">
                Confidential Credentials
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Prove what matters. Reveal nothing more. Privacy-preserving academic and professional credential verification powered by Midnight Network's zero-knowledge selective disclosure.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-midnight-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                <Lock className="w-3 h-3 text-brand-purple" />
                Zero-Knowledge Privacy
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-midnight-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Midnight Compact v0.20
              </span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="hover:text-slate-200 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Center & Model
                </Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-slate-200 transition-colors text-blue-400">
                  Verify a Credential
                </Link>
              </li>
              <li>
                <Link to="/issuer" className="hover:text-slate-200 transition-colors">
                  Issuer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Developer links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Technology & Specs
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://midnight.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  Midnight Network
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 transition-colors inline-flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link to="/privacy#observer-model" className="hover:text-slate-200 transition-colors">
                  Observer Capabilities
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© 2026 Confidential Credentials. Built for Midnight Network Level 3 Submission.</p>
          <p className="text-[10px] text-slate-500">
            Confidential Credentials is an independent dApp implementation designed for Midnight's privacy model.
          </p>
        </div>
      </div>
    </footer>
  );
};
