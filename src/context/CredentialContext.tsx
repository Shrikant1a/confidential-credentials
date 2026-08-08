import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Credential, IssuerInfo, ProofClaimSelection, ZeroKnowledgeProof } from '../types';
import { credentialService } from '../services/credentialService';
import { proofService } from '../services/proofService';
import { useToast } from './ToastContext';

interface CredentialContextType {
  credentials: Credential[];
  issuers: IssuerInfo[];
  proofs: ZeroKnowledgeProof[];
  isLoading: boolean;
  getCredential: (id: string) => Credential | undefined;
  generateProofForCredential: (
    credential: Credential,
    claims: ProofClaimSelection
  ) => Promise<ZeroKnowledgeProof>;
  issueNewCredential: (
    issuerId: string,
    recipientAddress: string,
    title: string,
    degreeType: string,
    major: string,
    issueYear: number,
    privateData: Omit<Credential['privateData'], 'blindingFactor'>
  ) => Promise<Credential>;
  revokeCredential: (id: string) => Promise<boolean>;
  deleteProof: (id: string) => Promise<boolean>;
  resetToSampleData: () => Promise<void>;
  refresh: () => Promise<void>;
}

const CredentialContext = createContext<CredentialContextType | undefined>(undefined);

export const CredentialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [issuers, setIssuers] = useState<IssuerInfo[]>([]);
  const [proofs, setProofs] = useState<ZeroKnowledgeProof[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error, info } = useToast();

  const loadAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [creds, issList, prfs] = await Promise.all([
        credentialService.getCredentials(),
        credentialService.getIssuers(),
        proofService.getProofs(),
      ]);
      setCredentials(creds);
      setIssuers(issList);
      setProofs(prfs);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const getCredential = (id: string) => {
    return credentials.find((c) => c.publicData.id === id);
  };

  const generateProofForCredential = async (
    credential: Credential,
    claims: ProofClaimSelection
  ): Promise<ZeroKnowledgeProof> => {
    try {
      const proof = await proofService.generateProof(credential, claims);
      await loadAll();
      success('Zero-Knowledge Proof Generated', `Proof ID: ${proof.proofId.slice(0, 10)}... (Code: ${proof.verificationCode})`);
      return proof;
    } catch (err: any) {
      error('Proof Generation Failed', err.message || 'Error occurred while computing proof');
      throw err;
    }
  };

  const issueNewCredential = async (
    issuerId: string,
    recipientAddress: string,
    title: string,
    degreeType: string,
    major: string,
    issueYear: number,
    privateData: Omit<Credential['privateData'], 'blindingFactor'>
  ): Promise<Credential> => {
    try {
      const newCred = await credentialService.issueCredential(
        issuerId,
        recipientAddress,
        title,
        degreeType,
        major,
        issueYear,
        privateData
      );
      await loadAll();
      success('Credential Issued & Signed', `Successfully created private credential "${title}"`);
      return newCred;
    } catch (err: any) {
      error('Issuance Failed', err.message);
      throw err;
    }
  };

  const revokeCredential = async (id: string): Promise<boolean> => {
    const res = await credentialService.revokeCredential(id);
    if (res) {
      await loadAll();
      info('Credential Revoked', 'The credential commitment has been marked as revoked on-chain');
    }
    return res;
  };

  const deleteProof = async (id: string): Promise<boolean> => {
    const res = await proofService.deleteProof(id);
    if (res) {
      await loadAll();
      info('Proof Removed', 'Local zero-knowledge proof record was removed');
    }
    return res;
  };

  const resetToSampleData = async () => {
    await credentialService.resetDefaults();
    await loadAll();
    success('Sample Data Restored', 'Default credentials have been reloaded');
  };

  return (
    <CredentialContext.Provider
      value={{
        credentials,
        issuers,
        proofs,
        isLoading,
        getCredential,
        generateProofForCredential,
        issueNewCredential,
        revokeCredential,
        deleteProof,
        resetToSampleData,
        refresh: loadAll,
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export const useCredentials = (): CredentialContextType => {
  const context = useContext(CredentialContext);
  if (!context) {
    throw new Error('useCredentials must be used within a CredentialProvider');
  }
  return context;
};
