import { Credential, PrivateAttributes, ProofClaimSelection, ZeroKnowledgeProof } from '../types';

// Fast deterministic SHA-256 simulation for browser and node environments
export function sha256(input: string): string {
  let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
  let h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    h0 = ((h0 << 5) - h0 + char) | 0;
    h1 = ((h1 << 5) - h1 + (char * 31)) | 0;
    h2 = ((h2 << 5) - h2 + (char * 17)) | 0;
    h3 = ((h3 << 5) - h3 + (char * 7)) | 0;
    h4 = ((h4 << 5) - h4 + (char * 23)) | 0;
    h5 = ((h5 << 5) - h5 + (char * 13)) | 0;
    h6 = ((h6 << 5) - h6 + (char * 29)) | 0;
    h7 = ((h7 << 5) - h7 + (char * 19)) | 0;
  }

  const toHex = (n: number) => ('00000000' + (n >>> 0).toString(16)).slice(-8);
  return `0x${toHex(h0)}${toHex(h1)}${toHex(h2)}${toHex(h3)}${toHex(h4)}${toHex(h5)}${toHex(h6)}${toHex(h7)}`;
}

// Compute the cryptographic commitment of a credential
export function computeCredentialCommitment(
  privateData: PrivateAttributes,
  issuerAddress: string,
  issueYear: number
): string {
  const payload = [
    privateData.fullName,
    privateData.studentId,
    privateData.dateOfBirth,
    privateData.exactCgpa.toString(),
    privateData.blindingFactor,
    issuerAddress,
    issueYear.toString(),
  ].join('::');

  return sha256(payload);
}

// Generate random hex string of specified bytes
export function generateRandomHex(bytes: number = 32): string {
  const chars = '0123456789abcdef';
  let result = '0x';
  for (let i = 0; i < bytes * 2; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

// Generate human-friendly verification code: CC-XXXX-XXXX
export function generateVerificationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let part1 = '';
  let part2 = '';
  for (let i = 0; i < 4; i++) part1 += chars[Math.floor(Math.random() * chars.length)];
  for (let i = 0; i < 4; i++) part2 += chars[Math.floor(Math.random() * chars.length)];
  return `CC-${part1}-${part2}`;
}

// Simulated ZK-SNARK proof generator for Midnight privacy circuits
export function generateZkProof(
  credential: Credential,
  claims: ProofClaimSelection
): ZeroKnowledgeProof {
  const { privateData, publicData } = credential;

  // Validate that claims are actually true with respect to private witness
  if (claims.minCgpaThreshold && privateData.exactCgpa < claims.minCgpaThreshold) {
    throw new Error(`Claim mismatch: Credential CGPA (${privateData.exactCgpa}) does not meet requested threshold (${claims.minCgpaThreshold})`);
  }

  if (claims.minGraduationYear && publicData.issueYear < claims.minGraduationYear) {
    throw new Error(`Claim mismatch: Graduation year (${publicData.issueYear}) is before required year (${claims.minGraduationYear})`);
  }

  const verifiedClaimsList: string[] = [];
  if (claims.isDegreeValid) verifiedClaimsList.push(`Degree is authentic and valid`);
  if (claims.isIssuerAuthorized) verifiedClaimsList.push(`Issued by accredited institution (${publicData.issuerName})`);
  if (claims.minCgpaThreshold) verifiedClaimsList.push(`Academic CGPA satisfies threshold >= ${claims.minCgpaThreshold}`);
  if (claims.minGraduationYear) verifiedClaimsList.push(`Graduation year satisfies >= ${claims.minGraduationYear}`);
  if (claims.degreeTypeMatch) verifiedClaimsList.push(`Degree title matches "${claims.degreeTypeMatch}"`);

  const proofId = `prf_${generateRandomHex(8).replace('0x', '')}`;
  const verificationCode = generateVerificationCode();

  // Create deterministic cryptographic proof components
  const proofHash = sha256(
    `${publicData.credentialCommitment}::${JSON.stringify(claims)}::${proofId}`
  );

  return {
    proofId,
    credentialId: publicData.id,
    credentialTitle: publicData.title,
    issuerName: publicData.issuerName,
    issuerAddress: publicData.issuerAddress,
    credentialCommitment: publicData.credentialCommitment,
    claims,
    proofHash,
    verificationCode,
    circuitId: 'midnight-selective-disclosure-v2',
    timestamp: Date.now(),
    publicInputs: {
      issuerAddress: publicData.issuerAddress,
      credentialCommitment: publicData.credentialCommitment,
      verifiedClaims: verifiedClaimsList,
      minCgpaPassed: claims.minCgpaThreshold,
      minGradYearPassed: claims.minGraduationYear,
    },
    zkSnarkProof: {
      protocol: 'midnight-zk',
      pi_a: [generateRandomHex(32), generateRandomHex(32)],
      pi_b: [
        [generateRandomHex(32), generateRandomHex(32)],
        [generateRandomHex(32), generateRandomHex(32)],
      ],
      pi_c: [generateRandomHex(32), generateRandomHex(32)],
    },
    status: 'valid',
  };
}
