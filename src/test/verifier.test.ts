import { describe, it, expect } from 'vitest';
import { verificationService } from '../services/verificationService';
import { proofService } from '../services/proofService';
import { credentialService } from '../services/credentialService';

describe('3. Midnight Smart Contract Verifier & Anti-Tamper Tests', () => {
  it('should successfully verify a valid proof with zero undisclosed data leaks', async () => {
    const creds = await credentialService.getCredentials();
    const proof = await proofService.generateProof(creds[0], {
      isDegreeValid: true,
      isIssuerAuthorized: true,
      minCgpaThreshold: 7.0,
    });

    const report = await verificationService.verifyProofObject(proof);

    expect(report.isValid).toBe(true);
    expect(report.verifiedClaims.length).toBeGreaterThan(0);
    expect(report.undisclosedPrivateFields.length).toBeGreaterThanOrEqual(4);
    expect(report.midnightTxHash).toBeDefined();
    expect(report.issuerTrustScore).toBeGreaterThanOrEqual(80);
  });

  it('should verify proof by human-readable verification code', async () => {
    const creds = await credentialService.getCredentials();
    const proof = await proofService.generateProof(creds[0], {
      isDegreeValid: true,
      isIssuerAuthorized: true,
    });

    const report = await verificationService.verifyByCode(proof.verificationCode);
    expect(report.isValid).toBe(true);
    expect(report.proofId).toBe(proof.proofId);
  });

  it('should reject verification when credential commitment has been revoked', async () => {
    const creds = await credentialService.getCredentials();
    const targetCred = creds[1];

    // Generate proof before revocation
    const proof = await proofService.generateProof(targetCred, {
      isDegreeValid: true,
      isIssuerAuthorized: true,
    });

    // Revoke credential
    await credentialService.revokeCredential(targetCred.publicData.id);

    // Verify should now fail due to on-chain nullifier
    const report = await verificationService.verifyProofObject(proof);
    expect(report.isValid).toBe(false);
    expect(report.failureReason).toContain('revoked');
  });

  it('should throw error for non-existent verification code', async () => {
    await expect(verificationService.verifyByCode('CC-NON-EXISTENT')).rejects.toThrowError(
      /No proof found matching verification code/
    );
  });
});
