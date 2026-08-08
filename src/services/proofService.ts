import { Credential, ProofClaimSelection, ZeroKnowledgeProof } from '../types';
import { generateZkProof } from '../utils/crypto';

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

class ProofService {
  private proofs: ZeroKnowledgeProof[] = [];

  constructor() {
    const saved = safeGetItem('midnight_proofs_store');
    if (saved) {
      try {
        this.proofs = JSON.parse(saved);
      } catch {
        this.proofs = [];
      }
    }
  }

  private saveToStorage() {
    safeSetItem('midnight_proofs_store', JSON.stringify(this.proofs));
  }

  public async generateProof(
    credential: Credential,
    claims: ProofClaimSelection
  ): Promise<ZeroKnowledgeProof> {
    // Generate simulated cryptographic ZK proof
    const proof = generateZkProof(credential, claims);
    this.proofs.unshift(proof);
    this.saveToStorage();
    return proof;
  }

  public async getProofs(): Promise<ZeroKnowledgeProof[]> {
    return [...this.proofs];
  }

  public async getProofById(proofId: string): Promise<ZeroKnowledgeProof | null> {
    const p = this.proofs.find((item) => item.proofId === proofId);
    return p ? { ...p } : null;
  }

  public async getProofByCode(code: string): Promise<ZeroKnowledgeProof | null> {
    const clean = code.trim().toUpperCase();
    const p = this.proofs.find((item) => item.verificationCode.toUpperCase() === clean);
    return p ? { ...p } : null;
  }

  public async importProof(proofJsonString: string): Promise<ZeroKnowledgeProof> {
    const parsed: ZeroKnowledgeProof = JSON.parse(proofJsonString);
    if (!parsed.proofId || !parsed.zkSnarkProof || !parsed.publicInputs) {
      throw new Error('Invalid Zero-Knowledge Proof format: missing required cryptographic fields');
    }
    const exists = this.proofs.some((p) => p.proofId === parsed.proofId);
    if (!exists) {
      this.proofs.unshift(parsed);
      this.saveToStorage();
    }
    return parsed;
  }

  public async deleteProof(proofId: string): Promise<boolean> {
    const idx = this.proofs.findIndex((p) => p.proofId === proofId);
    if (idx !== -1) {
      this.proofs.splice(idx, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }
}

export const proofService = new ProofService();
