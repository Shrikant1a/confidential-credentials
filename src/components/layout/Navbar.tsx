import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WalletButton } from '../wallet/WalletButton';
import {
  Shield,
  CheckCircle2,
  Lock,
  Layers,
  FileCheck,
  Building2,
  Menu,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'Credentials', path: '/credentials', icon: Lock },
    { name: 'Proofs', path: '/proofs', icon: FileCheck },
    { name: 'Verify', path: '/verify', icon: CheckCircle2, highlight: true },
    { name: 'Issuer', path: '/issuer', icon: Building2 },
    { name: 'Privacy Center', path: '/privacy', icon: Shield },
    { name: 'How It Works', path: '/how-it-works', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-midnight-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-midnight-800 border border-brand-purple/40 flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:border-brand-purple transition-all duration-300">
              <Shield className="w-5 h-5 text-brand-purple group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">
                  Confidential
                </span>
                <span className="font-bold text-base tracking-tight text-brand-purple">
                  Credentials
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono block -mt-0.5">
                Powered by Midnight
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-midnight-800/90 text-white border border-slate-700 shadow-sm'
                      : item.highlight
                      ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-950/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${active ? 'text-brand-purple' : 'opacity-70'}`} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Wallet Action */}
          <div className="hidden sm:flex items-center gap-3">
            <WalletButton />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="sm:hidden">
              <WalletButton />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-midnight-950/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-1.5 animate-in slide-in-from-top duration-200">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-midnight-800 text-white border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-4 h-4 ${active ? 'text-brand-purple' : 'text-slate-400'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
