import { VerificationAuditReport, ZeroKnowledgeProof } from '../types';
import { credentialService } from './credentialService';
import { proofService } from './proofService';
import { generateRandomHex } from '../utils/crypto';

class VerificationService {
  public async verifyProofObject(
    proof: ZeroKnowledgeProof
  ): Promise<VerificationAuditReport> {
    // 1. Simulate Midnight Smart Contract verification latency
    await new Promise((resolve) => setTimeout(resolve, 80));

    // 2. Validate cryptographic structure
    if (!proof.zkSnarkProof || !proof.zkSnarkProof.pi_a || !proof.publicInputs) {
      throw new Error('Malformed ZK Proof: Cryptographic proof points are missing.');
    }

    // 3. Check if the credential commitment is revoked in the credential ledger
    const credentials = await credentialService.getCredentials();
    const matchedCred = credentials.find(
      (c) => c.publicData.credentialCommitment === proof.credentialCommitment
    );

    if (matchedCred && matchedCred.publicData.status === 'revoked') {
      return {
        isValid: false,
        proofId: proof.proofId,
        verificationCode: proof.verificationCode,
        verifiedAt: Date.now(),
        credentialTitle: proof.credentialTitle,
        issuerName: proof.issuerName,
        issuerAddress: proof.issuerAddress,
        verifiedClaims: [],
        undisclosedPrivateFields: [
          'Full Name (Protected)',
          'Student ID (Protected)',
          'Date of Birth (Protected)',
          'Exact CGPA (Protected)',
        ],
        midnightTxHash: generateRandomHex(32),
        circuitVerificationGas: '0.0042 DUST',
        issuerTrustScore: 0,
        failureReason: 'The underlying credential was revoked by the issuing authority.',
      };
    }

    // 4. Check if issuer is known & accredited
    const issuers = await credentialService.getIssuers();
    const issuerRecord = issuers.find((i) => i.address === proof.issuerAddress || i.name === proof.issuerName);

    // List of private fields that remained completely shielded
    const undisclosedPrivateFields = [
      'Holder Full Legal Name',
      'Student Registration / ID Number',
      'Date of Birth & Age',
      'Exact Grade / CGPA Score',
      'Blinding Salt / Secret Witness',
    ];

    return {
      isValid: true,
      proofId: proof.proofId,
      verificationCode: proof.verificationCode,
      verifiedAt: Date.now(),
      credentialTitle: proof.credentialTitle,
      issuerName: proof.issuerName,
      issuerAddress: proof.issuerAddress,
      verifiedClaims: proof.publicInputs.verifiedClaims || [
        'Degree is authentic and valid',
        'Issuer is accredited',
      ],
      undisclosedPrivateFields,
      midnightTxHash: generateRandomHex(32),
      circuitVerificationGas: '0.0038 DUST',
      issuerTrustScore: issuerRecord ? 99 : 85,
    };
  }

  public async verifyByCode(code: string): Promise<VerificationAuditReport> {
    const proof = await proofService.getProofByCode(code);
    if (!proof) {
      throw new Error(`No proof found matching verification code "${code}". Please check the code or upload the proof JSON.`);
    }
    return this.verifyProofObject(proof);
  }
}

export const verificationService = new VerificationService();
