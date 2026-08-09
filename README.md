# Confidential Credentials

[![CI/CD Pipeline](https://github.com/Shrikant1a/confidential-credentials/actions/workflows/ci.yml/badge.svg)](https://github.com/Shrikant1a/confidential-credentials/actions/workflows/ci.yml)
[![Midnight Network](https://img.shields.io/badge/Midnight-Network-8B5CF6)](https://midnight.network)
[![Tests Passing](https://img.shields.io/badge/Tests-14%20passed-10B981)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A privacy-preserving decentralized credential verification system built on the **Midnight Network**. Allows students and professionals to prove credentials, university degrees, and performance thresholds using zero-knowledge selective disclosure without revealing raw personal data (such as legal name, date of birth, student ID, or exact scores).

---

## Project Overview

When verifying degrees, background checks, or professional licenses, traditional workflows force individuals to expose complete transcripts and personal identifying information (PII). 

**Confidential Credentials** implements a zero-knowledge credential verification model:
- **Issuance**: Accredited institutions issue cryptographic commitments `Hash(attributes || blinding_factor)` anchored to the Midnight public ledger.
- **Client Storage**: Full private attributes remain strictly inside the user's local browser enclave.
- **Selective Disclosure Proofs**: Holders construct ZK-SNARK proofs for specific predicates (e.g. *“Degree is valid”*, *“CGPA ≥ 3.5”*, *“Graduated ≥ 2023”*, *“Issuer is accredited”*).
- **Verification**: Verifiers validate proofs against the Midnight Compact smart contract in under 1 second without receiving any private witness data.

---

## 🎬 Demo Video & Screenshots

- **Demo Video (Full Walkthrough)**: [Watch Demo Video (`Video & ScreenShots/Demo Video.mp4`)](./Video%20%26%20ScreenShots/Demo%20Video.mp4)
- **Application & Test Screenshots**: Available in the [`Video & ScreenShots`](./Video%20%26%20ScreenShots) directory.


---

## Midnight Privacy Model Analysis

### Public Ledger vs. Shielded Private State

| Public On-Chain Ledger (Visible to Observers) | Shielded Private Witness (Client Enclave Only) |
| :--- | :--- |
| Verification transaction timestamp & block number | Full legal name of the credential holder |
| Consented claim predicates (e.g., `CGPA >= 7.5: true`) | Student ID & registration numbers |
| Verification outcome (`VALID` / `INVALID`) | Exact GPA / numeric marks (e.g. whether score is 8.1 or 9.9) |
| Accredited issuing authority public address | Date of birth, age, demographic information |
| Credential commitment hash & revocation nullifiers | Blinding factors, private keys, and witness salts |

### Privacy Design Principles
1. **Witness Confidentiality**: Private credential attributes are never submitted to the RPC or indexer.
2. **Anti-Correlation**: Each proof generation derives unique blinded proof commitments, preventing verifiers from linking multiple verifications to the same student identity.
3. **Revocation Nullifiers**: Issuers can nullify specific commitment hashes on-chain without exposing the underlying student identity.

---

## Architecture

```
                       [ Accredited Issuer ]
                                 │
                 Issues Commitment: Hash(Attrs || Salt)
                 Signs with Ed25519 Authority Key
                                 ▼
                     [ Midnight Public Ledger ]
                     • Issuer Registry Map
                     • Commitment & Nullifier Map
                     • Compact Verification Circuit
                                 ▲
                     Submits ZK Proof (pi_a, pi_b, pi_c)
                                 │
                      [ Credential Holder ]
                      • Private State (Local Enclave)
                      • Generates ZK-SNARK for custom claims
                      • Produces verification code (e.g. CC-4921-8842)
                                 │
                     Shares code or proof package
                                 ▼
                       [ Public Verifier ]
                      • Enters verification code or uploads JSON
                      • Executes Midnight smart contract verification
                      • Receives mathematical proof result (Zero Data Leak)
```

---

## Midnight Compact Contract Specification

The smart contract is written in Midnight's **Compact** language (`contracts/CredentialVerifier.compact`):

```compact
export circuit verifySelectiveDisclosureProof(
    claim: PublicVerificationClaim
): Boolean {
    // 1. Verify issuer accreditation status
    if (claim.requireActiveIssuer) {
        assert(issuers.member(claim.issuerPublicKey), "Unknown issuer");
        assert(issuers.lookup(claim.issuerPublicKey).isActive, "Issuer revoked");
    }

    // 2. Ensure credential has not been nullified on-chain
    assert(!revokedCommitments.lookup(claim.credentialCommitment), "Credential revoked");

    // 3. Reconstruct commitment from private witness inputs
    let computedCommitment = hash_sha256(
        witness.holderSecretKey,
        witness.fullStudentName,
        witness.studentIdNumber,
        witness.exactCgpaTimes100,
        witness.actualGraduationYear,
        witness.credentialBlindingFactor
    );
    assert(computedCommitment == claim.credentialCommitment, "Commitment mismatch");

    // 4. Verify cryptographic issuer signature over commitment
    assert(verify_ed25519_signature(claim.issuerPublicKey, computedCommitment, witness.issuerSignature));

    // 5. Enforce selective disclosure threshold constraints
    assert(witness.exactCgpaTimes100 >= claim.minCgpaThresholdTimes100, "CGPA requirement failed");
    assert(witness.actualGraduationYear >= claim.minGraduationYear, "Graduation year requirement failed");

    return true;
}
```

---

## Automated Test Suites

The project maintains 14 automated unit and integration tests across 4 suites using Vitest:

```bash
npm test
```

### Test Coverage Summary:
- **`src/test/credential.test.ts`**: Verifies SHA-256 commitment generation, deterministic hashing consistency, tamper detection on private attributes, and local state retrieval.
- **`src/test/proof.test.ts`**: Verifies zero-knowledge selective disclosure synthesis, threshold claim validation, and rejection of out-of-range claims.
- **`src/test/verifier.test.ts`**: Verifies contract verification logic, on-chain revocation nullifier enforcement, and tamper detection.
- **`src/test/wallet.test.ts`**: Tests Midnight Lace wallet connector lifecycle, address formatting, and cryptographic proof payload signing.

---

## Getting Started

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm (v9.x or later)
- Midnight Lace browser extension (optional, devnet sandbox included)

### Setup & Run
```bash
# Clone the repository
git clone https://github.com/Shrikant1a/confidential-credentials.git
cd confidential-credentials

# Install dependencies
npm install

# Start local development server
npm run dev
```

The dApp will be running at `http://localhost:3000`.

### Running Tests & Typechecking
```bash
# Run automated tests
npm test

# Run strict TypeScript typechecking
npm run typecheck

# Build production bundle
npm run build
```

---

## Product Proposal & Real-World Application

### Problem
Academic and professional credentials verification is currently broken in two ways:
1. **Pervasive credential fraud**: Paper certificates and easily editable PDFs lead to billions in recruitment fraud annually.
2. **Excessive personal data exposure**: Traditional background checks collect unredacted transcripts, IDs, and birthdates, creating massive data privacy liabilities under GDPR, CCPA, and DPDP.

### Solution with Midnight
Confidential Credentials decouples **validity** from **disclosure**. Institutions anchor commitments to the Midnight blockchain, allowing candidates to generate zero-knowledge mathematical proofs that satisfy hiring criteria without handing over personal transcripts.

### Key Use Cases
- **Tech Recruitment**: Candidates prove degree authenticity and minimum CGPA without disclosing age, background, or student registration numbers.
- **Cross-Border Licensing**: Medical, legal, and financial certifications verified instantly across jurisdictions with cryptographic finality.
- **Anonymous Governance & DAO Grants**: Individuals prove qualification thresholds to earn voting weights or grant funding without doxxing their identity.

---

## CI/CD Pipeline

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that validates every push and pull request:
1. `npm install --legacy-peer-deps` — clean dependency installation
2. `npm run typecheck` — strict TypeScript verification (`tsc --noEmit`)
3. `npm test` — execution of all 14 unit and integration tests
4. `npm run build` — Vite production build compilation

---

## Author & License

Built by **Shrikant Aher** for the Midnight Network Level 3 Developer Challenge.  
Licensed under the [MIT License](LICENSE).
