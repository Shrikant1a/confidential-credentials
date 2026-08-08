import React, { useState } from 'react';
import { useCredentials } from '../../context/CredentialContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Lock, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface IssueCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IssueCredentialModal: React.FC<IssueCredentialModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { issuers, issueNewCredential } = useCredentials();
  const { error } = useToast();

  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [issuerId, setIssuerId] = useState(issuers[0]?.id || '');
  const [recipientAddress, setRecipientAddress] = useState('0x7A94bfa283ce93284028148b812048f9382103892');
  const [title, setTitle] = useState('Bachelor of Technology in Artificial Intelligence');
  const [degreeType, setDegreeType] = useState('Bachelor of Technology');
  const [major, setMajor] = useState('Artificial Intelligence & Machine Learning');
  const [issueYear, setIssueYear] = useState(2025);

  // Private fields
  const [fullName, setFullName] = useState('Aditi Sharma');
  const [studentId, setStudentId] = useState('IIT-AI-2025-4491');
  const [dateOfBirth, setDateOfBirth] = useState('2002-08-19');
  const [exactCgpa, setExactCgpa] = useState(9.45);
  const [cgpaScale, setCgpaScale] = useState(10.0);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !recipientAddress || !fullName || !studentId) {
      error('Missing Information', 'Please complete all required credential fields.');
      return;
    }
    setIsConfirming(true);
  };

  const handleFinalIssue = async () => {
    setIsSubmitting(true);
    try {
      await issueNewCredential(
        issuerId || issuers[0].id,
        recipientAddress,
        title,
        degreeType,
        major,
        issueYear,
        {
          fullName,
          studentId,
          dateOfBirth,
          exactCgpa,
          cgpaScale,
          degreeClassification: 'First Class with Distinction',
        }
      );
      setIsConfirming(false);
      onClose();
    } catch (err: any) {
      error('Issuance Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsConfirming(false);
        onClose();
      }}
      title={isConfirming ? 'Confirm Credential Issuance' : 'Issue Verifiable Credential'}
      subtitle={
        isConfirming
          ? 'Review public metadata and private commitment parameters before signing'
          : 'Issue a cryptographically signed credential into the recipient’s private state'
      }
      maxWidth="lg"
    >
      {isConfirming ? (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-purple-950/20 border border-brand-purple/30 space-y-2">
            <h4 className="text-xs font-semibold text-brand-purple uppercase tracking-wider">
              Public Ledger Metadata
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Degree:</span>
                <span className="text-slate-200 font-medium">{title}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Issuing Authority:</span>
                <span className="text-slate-200 font-medium">
                  {issuers.find((i) => i.id === issuerId)?.name || 'Accredited Issuer'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Year:</span>
                <span className="text-slate-200 font-medium">{issueYear}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Recipient:</span>
                <span className="text-slate-200 font-mono text-[11px] truncate block">
                  {recipientAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Private witness confirmation */}
          <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Shielded Private Witness (Not written to ledger)
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Student Name:</span>
                <span className="text-slate-300">{fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Student ID:</span>
                <span className="text-slate-300">{studentId}</span>
              </div>
              <div>
                <span className="text-slate-500 block">CGPA:</span>
                <span className="text-slate-300">
                  {exactCgpa} / {cgpaScale}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">DOB:</span>
                <span className="text-slate-300">{dateOfBirth}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsConfirming(false)}
              disabled={isSubmitting}
            >
              Back to Edit
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleFinalIssue}
              isLoading={isSubmitting}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Sign & Issue Credential
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleInitialSubmit} className="space-y-4">
          {/* Issuer selection */}
          <div className="w-full">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Issuing Institution
            </label>
            <select
              value={issuerId}
              onChange={(e) => setIssuerId(e.target.value)}
              className="w-full bg-midnight-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-brand-purple"
            >
              {issuers.map((iss) => (
                <option key={iss.id} value={iss.id}>
                  {iss.name} ({iss.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              required
            />
            <Input
              label="Graduation Year"
              type="number"
              value={issueYear}
              onChange={(e) => setIssueYear(parseInt(e.target.value) || 2025)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Credential Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Master of Science in Cybersecurity"
              required
            />
            <Input
              label="Major / Specialization"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              placeholder="e.g. Applied Cryptography"
              required
            />
          </div>

          {/* Private fields section */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-brand-purple" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Private Attributes (Client Shielded)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Legal Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Holder full name"
                required
              />
              <Input
                label="Student ID / Roll No."
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. SPPU-2024-001"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
              <Input
                label="Exact CGPA"
                type="number"
                step="0.01"
                value={exactCgpa}
                onChange={(e) => setExactCgpa(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button variant="ghost" size="md" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              Review & Issue
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
