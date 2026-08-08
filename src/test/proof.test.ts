import { describe, it, expect } from 'vitest';
import { generateZkProof } from '../utils/crypto';
import { proofService } from '../services/proofService';
import { credentialService } from '../services/credentialService';
import { ProofClaimSelection } from '../types';

describe('2. Selective Disclosure & Zero-Knowledge Proof Generation Tests', () => {
  it('should generate valid ZK proof when claims match the credential attributes', async () => {
    const creds = await credentialService.getCredentials();
    const targetCred = creds[0];

    const validClaims: ProofClaimSelection = {
      isDegreeValid: true,
      isIssuerAuthorized: true,
      minCgpaThreshold: 7.5, // Target credential has 8.92
      minGraduationYear: 2023, // Target credential was issued in 2024
    };

    const proof = generateZkProof(targetCred, validClaims);

    expect(proof).toBeDefined();
    expect(proof.proofId.startsWith('prf_')).toBe(true);
    expect(proof.verificationCode.startsWith('CC-')).toBe(true);
    expect(proof.zkSnarkProof.protocol).toBe('midnight-zk');
    expect(proof.publicInputs.verifiedClaims.length).toBe(4);
  });

  it('should reject proof generation when CGPA claim threshold exceeds actual credential grade', async () => {
    const creds = await credentialService.getCredentials();
    const targetCred = creds[0]; // has CGPA 8.92

    const impossibleClaims: ProofClaimSelection = {
      isDegreeValid: true,
      isIssuerAuthorized: true,
      minCgpaThreshold: 9.95, // Exceeds 8.92
    };

    expect(() => generateZkProof(targetCred, impossibleClaims)).toThrowError(
      /Claim mismatch: Credential CGPA/
    );
  });

  it('should store and retrieve generated proofs via proofService', async () => {
    const creds = await credentialService.getCredentials();
    const proof = await proofService.generateProof(creds[0], {
      isDegreeValid: true,
      isIssuerAuthorized: true,
    });

    const retrieved = await proofService.getProofById(proof.proofId);
    expect(retrieved).toBeDefined();
    expect(retrieved?.verificationCode).toBe(proof.verificationCode);
  });
});
