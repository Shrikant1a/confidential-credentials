# Confidential Credentials 🛡️

[![CI/CD Pipeline](https://github.com/Shrikant1a/confidential-credentials/actions/workflows/ci.yml/badge.svg)](https://github.com/Shrikant1a/confidential-credentials/actions/workflows/ci.yml)
[![Midnight Network](https://img.shields.io/badge/Midnight-Privacy%20DApp-8B5CF6)](https://midnight.network)
[![Tests Passing](https://img.shields.io/badge/Tests-14%2F14%20Passing-10B981)](https://vitest.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Prove what matters. Reveal nothing more.**  
> *Privacy-preserving credential verification powered by Midnight Network.*

---

## 🌓 Overview & Level 3 Mission

**Confidential Credentials** is a production-grade decentralized application (dApp) built on the **Midnight Network** privacy architecture. 

In traditional digital credential systems, sharing a degree or certificate forces the holder to expose 100% of their private information (full legal name, student ID, date of birth, exact GPA scores, home address). 

**Confidential Credentials** transforms this paradigm using **zero-knowledge selective disclosure**:
- Students and professionals store their full credentials securely in **client-side private state**.
- When applying for jobs or opportunities, holders generate cryptographic zero-knowledge proofs for **specific claims** (e.g. *“Degree is authentic”*, *“CGPA ≥ 3.5”*, *“Graduated after 2023”*, *“Issuer is accredited”*).
- Verifiers validate the proof against Midnight smart contracts in milliseconds **without learning any sensitive personal data**.

---

## 🔐 Midnight Privacy Model Analysis

### What an Observer CAN and CANNOT Learn

| Observer CAN See (Public Ledger) | Observer CANNOT See (Shielded Private Witness) |
| :--- | :--- |
| ✅ A verification transaction was submitted at a specific block time | 🔒 **Full Legal Name & Identity** |
| ✅ Consented public claim metadata (e.g., *“CGPA ≥ 3.5 threshold satisfied”*) | 🔒 **Student Registration / ID Number** |
| ✅ Verification validity result (`TRUE` / `FALSE`) | 🔒 **Exact Numerical Scores & Transcripts** (e.g., whether score was 3.51 or 4.0) |
| ✅ Public address and accreditation status of the issuing authority | 🔒 **Date of Birth, Age & Demographic Data** |
| ✅ Cryptographic commitment hash & smart contract gas execution | 🔒 **Blinding Salts, Private Keys & Secret Witness Data** |

> **Privacy Guarantee:** In Midnight, privacy depends on the information intentionally disclosed by the credential holder and the application's circuit design. With Confidential Credentials, no raw personal attributes are ever written to the public blockchain.

---

## 🏛️ System Architecture

```
 ┌────────────────────────────────────────────────────────┐
 │                   ISSUING AUTHORITY                    │
 │  1. Creates credential payload                        │
 │  2. Computes Commitment: Hash(Attrs || BlindingSalt)  │
 │  3. Signs Commitment with Ed25519 Authority Key       │
 └──────────────────────────┬─────────────────────────────┘
                            │ (Anchors Commitment to Ledger)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │              MIDNIGHT PUBLIC LEDGER                    │
 │  • Accredited Issuer Registry                          │
 │  • Credential Commitment & Nullifier Map               │
 │  • Compact Verification Circuit                        │
 └──────────────────────────┬─────────────────────────────┘
                            ▲
                            │ (Zero-Knowledge Proof: pi_a, pi_b, pi_c)
 ┌──────────────────────────┴─────────────────────────────┐
 │                  CREDENTIAL HOLDER                     │
 │  • Private State in Wallet / Client Enclave            │
 │  • Synthesizes ZK-SNARK for custom claims              │
 │  • Produces Shareable Verification Code / JSON Proof   │
 └──────────────────────────┬─────────────────────────────┘
                            │ (Share Code: CC-XXXX-XXXX)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │                   PUBLIC VERIFIER                      │
 │  • Enters Code or Uploads Proof JSON                   │
 │  • Verifies via Midnight Contract: 100% Assurance     │
 │  • Reads Audit Report: ZERO personal data exposed      │
 └────────────────────────────────────────────────────────┘
```

---

## 📄 Midnight Compact Smart Contract

The core smart contract is implemented in Midnight's native **Compact DSL** (`contracts/CredentialVerifier.compact`):

```compact
export circuit verifySelectiveDisclosureProof(
    claim: PublicVerificationClaim
): Boolean {
    // 1. Verify issuer accreditation on ledger
    if (claim.requireActiveIssuer) {
        assert(issuers.member(claim.issuerPublicKey), "Unknown issuer");
        assert(issuers.lookup(claim.issuerPublicKey).isActive, "Issuer revoked");
    }

    // 2. Verify credential is not revoked
    assert(!revokedCommitments.lookup(claim.credentialCommitment), "Credential revoked");

    // 3. Reconstruct commitment from private witness
    let computedCommitment = hash_sha256(
        witness.holderSecretKey,
        witness.fullStudentName,
        witness.studentIdNumber,
        witness.exactCgpaTimes100,
        witness.actualGraduationYear,
        witness.credentialBlindingFactor
    );
    assert(computedCommitment == claim.credentialCommitment, "Commitment mismatch");

    // 4. Verify issuer signature over commitment
    assert(verify_ed25519_signature(claim.issuerPublicKey, computedCommitment, witness.issuerSignature));

    // 5. Enforce selective disclosure range checks
    assert(witness.exactCgpaTimes100 >= claim.minCgpaThresholdTimes100, "CGPA requirement failed");
    assert(witness.actualGraduationYear >= claim.minGraduationYear, "Graduation year requirement failed");

    return true;
}
```

---

## 🧪 Test Suite (100% Passing)

The project includes an automated **Vitest** test suite covering 4 core domains:

```bash
npm test
```

### Test Suites Summary:
1. **`credential.test.ts`** — Cryptographic commitment generation, deterministic hashing, tamper resistance, and private attribute state retrieval.
2. **`proof.test.ts`** — Zero-knowledge proof synthesis, selective disclosure claim validation, mathematical constraint verification, and out-of-range claim rejection.
3. **`verifier.test.ts`** — Midnight verifier contract audit logic, revocation nullifier enforcement, human-friendly code verification, and anti-tamper tests.
4. **`wallet.test.ts`** — Midnight Lace wallet state management, address formatting, and cryptographic proof payload signing.

---

## 🚀 Quick Start & Development

### Prerequisites
- Node.js v18+ or v20+
- npm v9+

### 1. Clone & Install
```bash
git clone https://github.com/your-org/confidential-credentials.git
cd confidential-credentials
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 💡 Product Proposal: Confidential Credentials for Web3 & Enterprise

### 1. Problem Statement
Identity fraud in recruitment and academic verification costs organizations billions annually, while legacy background check processes leak sensitive PII (Personally Identifiable Information) to third-party databases, violating modern data privacy regulations (GDPR, CCPA, DPDP).

### 2. Solution
Confidential Credentials establishes a decentralized, privacy-preserving standard where institutions issue cryptographic commitments and students generate mathematically verifiable proofs of qualification on Midnight.

### 3. Market Applications
- **Tech Recruitment & Background Checks**: Prove engineering qualifications and honors without revealing full transcripts or age.
- **Regulated Professional Licensing**: Prove valid medical or legal bar status without exposing personal license numbers.
- **Decentralized Grants & DAO Governance**: Prove academic credentials or developer track records for anonymous voting weights.

---

## 📦 CI/CD Pipeline

The repository includes a complete GitHub Actions CI/CD workflow (`.github/workflows/ci.yml`) that executes on every push and pull request:
- ✅ Dependency verification (`npm ci`)
- ✅ TypeScript strict typechecking (`npm run typecheck`)
- ✅ Privacy circuit and cryptographic test suite execution (`npm test`)
- ✅ Optimized production bundle compilation (`npm run build`)

---

## 🛡️ License

MIT © 2026 Confidential Credentials Team. Built for the Midnight Network Level 3 Submission.
