export type CredentialCategory =
  | 'academic'
  | 'professional'
  | 'identity'
  | 'security';

export interface PrivateAttributes {
  fullName: string;
  studentId: string;
  dateOfBirth: string;
  exactCgpa: number; // e.g. 3.84 or 8.9 / 10
  cgpaScale: number; // e.g. 4.0 or 10.0
  degreeClassification?: string;
  nationalIdNumber?: string;
  privateNotes?: string;
  blindingFactor: string;
}

export interface PublicMetadata {
  id: string;
  title: string;
  category: CredentialCategory;
  issuerName: string;
  issuerAddress: string;
  issuerLogo?: string;
  issueYear: number;
  issueDate: string;
  expiryDate?: string;
  degreeType: string;
  major: string;
  credentialCommitment: string;
  status: 'verified' | 'revoked' | 'pending';
}

export interface Credential {
  publicData: PublicMetadata;
  privateData: PrivateAttributes;
  issuerSignature: string;
}

export interface ProofClaimSelection {
  isDegreeValid: boolean;
  minCgpaThreshold?: number; // e.g., proved CGPA >= 3.5
  minGraduationYear?: number; // e.g., proved Grad Year >= 2023
  isIssuerAuthorized: boolean;
  degreeTypeMatch?: string; // e.g., proved degree is 'BSc Computer Science'
}

export interface ZeroKnowledgeProof {
  proofId: string;
  credentialId: string;
  credentialTitle: string;
  issuerName: string;
  issuerAddress: string;
  credentialCommitment: string;
  claims: ProofClaimSelection;
  proofHash: string;
  verificationCode: string; // Human-friendly code e.g. CC-78A9-2B3F
  circuitId: string;
  timestamp: number;
  publicInputs: {
    issuerAddress: string;
    credentialCommitment: string;
    verifiedClaims: string[];
    minCgpaPassed?: number;
    minGradYearPassed?: number;
  };
  zkSnarkProof: {
    pi_a: string[];
    pi_b: string[][];
    pi_c: string[];
    protocol: 'groth16' | 'plonk' | 'halo2' | 'midnight-zk';
  };
  status: 'valid' | 'revoked' | 'expired';
}

export interface VerificationAuditReport {
  isValid: boolean;
  proofId: string;
  verificationCode: string;
  verifiedAt: number;
  credentialTitle: string;
  issuerName: string;
  issuerAddress: string;
  verifiedClaims: string[];
  undisclosedPrivateFields: string[];
  midnightTxHash: string;
  circuitVerificationGas: string;
  issuerTrustScore: number;
  failureReason?: string;
}

export interface IssuerInfo {
  id: string;
  name: string;
  address: string;
  category: string;
  verified: boolean;
  logo: string;
  website: string;
  credentialsIssuedCount: number;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  shortAddress: string | null;
  balance: number;
  network: string;
  isConnecting: boolean;
  walletType?: 'lace' | 'devnet';
  isLaceDetected?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

export interface MidnightLaceInitialAPI {
  apiVersion?: string;
  name?: string;
  icon?: string;
  connect: (networkId?: string) => Promise<MidnightLaceConnectedAPI>;
  enable?: (networkId?: string) => Promise<MidnightLaceConnectedAPI>;
  isEnabled?: () => Promise<boolean>;
  getConnectionStatus?: () => Promise<boolean>;
}

export interface MidnightLaceConnectedAPI {
  getConnectionStatus: () => Promise<boolean>;
  getShieldedAddresses: () => Promise<{
    shieldedCoinPublicKey: string;
    shieldedEncryptionPublicKey: string;
  }>;
  getUnshieldedAddress?: () => Promise<string>;
  getConfiguration: () => Promise<{
    indexerUri?: string;
    indexerWsUri?: string;
    proverServerUri?: string;
    networkId?: string;
  }>;
  balanceUnsealedTransaction?: (tx: string) => Promise<any>;
  submitTransaction?: (tx: string) => Promise<any>;
}

declare global {
  interface Window {
    midnight?: {
      mnLace?: MidnightLaceInitialAPI;
      [key: string]: any;
    };
  }
}
