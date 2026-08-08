import { Credential, IssuerInfo } from '../types';
import { computeCredentialCommitment, generateRandomHex } from '../utils/crypto';

const safeGetItem = (key: string): string | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem(key);
  }
  return null;
};

const safeSetItem = (key: string, value: string): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, value);
  }
};

export const INITIAL_ISSUERS: IssuerInfo[] = [
  {
    id: 'iss_sppu_01',
    name: 'Savitribai Phule Pune University',
    address: '0x892a01B09c0F638f321A8090C8eA89C828399120',
    category: 'Accredited Higher Education',
    verified: true,
    logo: '🎓',
    website: 'http://www.unipune.ac.in',
    credentialsIssuedCount: 1420,
  },
  {
    id: 'iss_midnight_02',
    name: 'Midnight Developer Foundation',
    address: '0x3E829aF29019b9c028aF39029aB9820c81920398',
    category: 'Privacy Tech Certification Body',
    verified: true,
    logo: '🛡️',
    website: 'https://midnight.network',
    credentialsIssuedCount: 890,
  },
  {
    id: 'iss_mit_03',
    name: 'Stanford Cyber Privacy Institute',
    address: '0x5C89912bfa9382901a89c9210982739102839102',
    category: 'Research & Cryptography Institution',
    verified: true,
    logo: '🏛️',
    website: 'https://stanford.edu',
    credentialsIssuedCount: 430,
  },
];

const INITIAL_CREDENTIALS: Credential[] = [
  (() => {
    const privateData = {
      fullName: 'Shrikant Shinde',
      studentId: 'SPPU-CS-2024-8842',
      dateOfBirth: '2001-04-14',
      exactCgpa: 8.92,
      cgpaScale: 10.0,
      degreeClassification: 'First Class with Distinction',
      nationalIdNumber: 'IN-AADHAAR-8921-9921',
      privateNotes: 'Dean Honours List 2023 & 2024. Capstone in Zero-Knowledge Cryptography.',
      blindingFactor: '0x8f2a991823901bca092819028391029381029381029381029381029381029381',
    };
    const issuerAddress = '0x892a01B09c0F638f321A8090C8eA89C828399120';
    const issueYear = 2024;
    const commitment = computeCredentialCommitment(privateData, issuerAddress, issueYear);

    return {
      publicData: {
        id: 'cred_bsc_cs_2024',
        title: 'BSc Computer Science & Engineering',
        category: 'academic',
        issuerName: 'Savitribai Phule Pune University',
        issuerAddress,
        issuerLogo: '🎓',
        issueYear,
        issueDate: '2024-06-15',
        degreeType: 'Bachelor of Science',
        major: 'Computer Science & Engineering',
        credentialCommitment: commitment,
        status: 'verified',
      },
      privateData,
      issuerSignature: '0x992fa81029bca88102938102938102938102938102938102938102938102938177361829',
    };
  })(),
  (() => {
    const privateData = {
      fullName: 'Shrikant Shinde',
      studentId: 'MND-DEV-PRO-4019',
      dateOfBirth: '2001-04-14',
      exactCgpa: 9.8,
      cgpaScale: 10.0,
      degreeClassification: 'Distinguished Fellow',
      privateNotes: 'Mastery over Compact smart contracts, witness generation, and selective disclosure.',
      blindingFactor: '0x3348190283910293810293810293810293810293810293810293810293810293',
    };
    const issuerAddress = '0x3E829aF29019b9c028aF39029aB9820c81920398';
    const issueYear = 2025;
    const commitment = computeCredentialCommitment(privateData, issuerAddress, issueYear);

    return {
      publicData: {
        id: 'cred_mnd_zk_2025',
        title: 'Certified Midnight Privacy Architect (CMPA)',
        category: 'professional',
        issuerName: 'Midnight Developer Foundation',
        issuerAddress,
        issuerLogo: '🛡️',
        issueYear,
        issueDate: '2025-02-10',
        degreeType: 'Professional Master Certification',
        major: 'Zero-Knowledge Circuit Engineering',
        credentialCommitment: commitment,
        status: 'verified',
      },
      privateData,
      issuerSignature: '0x12a938102938102938102938102938102938102938102938102938102938102988192019',
    };
  })(),
  (() => {
    const privateData = {
      fullName: 'Shrikant Shinde',
      studentId: 'STAN-CYBER-9912',
      dateOfBirth: '2001-04-14',
      exactCgpa: 3.94,
      cgpaScale: 4.0,
      degreeClassification: 'High Honors',
      privateNotes: 'Advanced Cryptographic Protocols & Differential Privacy Specialization.',
      blindingFactor: '0xaa18293810293810293810293810293810293810293810293810293810293810',
    };
    const issuerAddress = '0x5C89912bfa9382901a89c9210982739102839102';
    const issueYear = 2024;
    const commitment = computeCredentialCommitment(privateData, issuerAddress, issueYear);

    return {
      publicData: {
        id: 'cred_stan_cyber_2024',
        title: 'Postgraduate Diploma in Applied Cryptography',
        category: 'academic',
        issuerName: 'Stanford Cyber Privacy Institute',
        issuerAddress,
        issuerLogo: '🏛️',
        issueYear,
        issueDate: '2024-11-20',
        degreeType: 'Postgraduate Diploma',
        major: 'Applied Cryptography',
        credentialCommitment: commitment,
        status: 'verified',
      },
      privateData,
      issuerSignature: '0x883719203910293810293810293810293810293810293810293810293810293899281920',
    };
  })(),
];

class CredentialService {
  private credentials: Credential[] = [];
  private issuers: IssuerInfo[] = INITIAL_ISSUERS;

  constructor() {
    const stored = safeGetItem('midnight_credentials_store');
    if (stored) {
      try {
        this.credentials = JSON.parse(stored);
      } catch {
        this.credentials = [...INITIAL_CREDENTIALS];
      }
    } else {
      this.credentials = [...INITIAL_CREDENTIALS];
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    safeSetItem('midnight_credentials_store', JSON.stringify(this.credentials));
  }

  public async getCredentials(): Promise<Credential[]> {
    return [...this.credentials];
  }

  public async getCredentialById(id: string): Promise<Credential | null> {
    const cred = this.credentials.find((c) => c.publicData.id === id);
    return cred ? { ...cred } : null;
  }

  public async getIssuers(): Promise<IssuerInfo[]> {
    return [...this.issuers];
  }

  public async issueCredential(
    issuerId: string,
    recipientAddress: string,
    title: string,
    degreeType: string,
    major: string,
    issueYear: number,
    privateData: Omit<Credential['privateData'], 'blindingFactor'>
  ): Promise<Credential> {
    const issuer = this.issuers.find((i) => i.id === issuerId) || this.issuers[0];
    const blindingFactor = generateRandomHex(32);

    const fullPrivateData = {
      ...privateData,
      blindingFactor,
    };

    const commitment = computeCredentialCommitment(fullPrivateData, issuer.address, issueYear);
    const id = `cred_${Math.random().toString(36).substring(2, 9)}_${Date.now()}`;

    const newCredential: Credential = {
      publicData: {
        id,
        title,
        category: 'academic',
        issuerName: issuer.name,
        issuerAddress: issuer.address,
        issuerLogo: issuer.logo,
        issueYear,
        issueDate: new Date().toISOString().split('T')[0],
        degreeType,
        major,
        credentialCommitment: commitment,
        status: 'verified',
      },
      privateData: fullPrivateData,
      issuerSignature: generateRandomHex(64),
    };

    this.credentials.unshift(newCredential);
    this.saveToStorage();

    // Increment issuer counter
    issuer.credentialsIssuedCount += 1;

    return newCredential;
  }

  public async revokeCredential(id: string): Promise<boolean> {
    const cred = this.credentials.find((c) => c.publicData.id === id);
    if (cred) {
      cred.publicData.status = 'revoked';
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public async resetDefaults(): Promise<void> {
    this.credentials = [...INITIAL_CREDENTIALS];
    this.saveToStorage();
  }
}

export const credentialService = new CredentialService();
