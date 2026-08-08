import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Credential } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  GraduationCap,
  Award,
  Shield,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { truncateAddress } from '../../utils/formatters';

interface CredentialCardProps {
  credential: Credential;
  onGenerateProof?: (cred: Credential) => void;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  onGenerateProof,
}) => {
  const [isLocallyRevealed, setIsLocallyRevealed] = useState(false);
  const { publicData, privateData } = credential;

  const isAcademic = publicData.category === 'academic';
  const isRevoked = publicData.status === 'revoked';

  return (
    <Card
      variant="interactive"
      className="p-5 flex flex-col justify-between group border-slate-800 hover:border-brand-purple/40 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-midnight-800 border border-slate-700/80 flex items-center justify-center text-lg">
              {publicData.issuerLogo || (isAcademic ? <GraduationCap className="w-5 h-5 text-blue-400" /> : <Award className="w-5 h-5 text-purple-400" />)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                {isAcademic ? 'Academic Degree' : 'Professional Certification'}
              </span>
              <h3 className="font-semibold text-sm text-slate-100 group-hover:text-blue-300 transition-colors line-clamp-1">
                {publicData.title}
              </h3>
            </div>
          </div>

          <Badge variant={isRevoked ? 'error' : 'success'} size="sm">
            {isRevoked ? (
              <>
                <AlertTriangle className="w-3 h-3" /> Revoked
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3 h-3" /> Verified
              </>
            )}
          </Badge>
        </div>

        {/* Issuer info */}
        <div className="py-2.5 px-3 rounded-xl bg-midnight-950/70 border border-slate-850 my-3">
          <div className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
            <span>Issuer:</span>
            <span className="font-medium text-slate-200">{publicData.issuerName}</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
            <span>Issued: {publicData.issueYear}</span>
            <span>{truncateAddress(publicData.issuerAddress, 6, 4)}</span>
          </div>
        </div>

        {/* Privacy shield indicator and local reveal toggle */}
        <div className="p-3 rounded-xl bg-midnight-950/40 border border-slate-800/80 mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 flex items-center gap-1.5 font-medium">
              <Lock className="w-3.5 h-3.5 text-brand-purple" />
              Private Attributes
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLocallyRevealed(!isLocallyRevealed);
              }}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
            >
              {isLocallyRevealed ? (
                <>
                  <EyeOff className="w-3 h-3" /> Mask data
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" /> Reveal locally
                </>
              )}
            </button>
          </div>

          {/* Masked vs revealed preview */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Student / Holder</span>
              {isLocallyRevealed ? (
                <span className="text-slate-200 font-medium">{privateData.fullName}</span>
              ) : (
                <span className="font-mono text-slate-500 tracking-wider text-xs select-none">
                  ████████
                </span>
              )}
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Performance / CGPA</span>
              {isLocallyRevealed ? (
                <span className="text-slate-200 font-medium">
                  {privateData.exactCgpa} / {privateData.cgpaScale}
                </span>
              ) : (
                <span className="font-mono text-slate-500 tracking-wider text-xs select-none">
                  ████ Private
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
        <Link to={`/credentials/${publicData.id}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
        <Link to={`/credentials/${publicData.id}?action=generate`} className="flex-1">
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
          >
            Create Proof
          </Button>
        </Link>
      </div>
    </Card>
  );
};
