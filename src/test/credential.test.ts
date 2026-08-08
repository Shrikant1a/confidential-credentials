import { describe, it, expect } from 'vitest';
import { computeCredentialCommitment, sha256 } from '../utils/crypto';
import { credentialService } from '../services/credentialService';
import { PrivateAttributes } from '../types';

describe('1. Credential Private Commitment & Integrity Tests', () => {
  const mockPrivateData: PrivateAttributes = {
    fullName: 'Shrikant Aher',
    studentId: 'SPPU-CS-2024-8842',
    dateOfBirth: '2001-04-14',
    exactCgpa: 8.92,
    cgpaScale: 10.0,
    blindingFactor: '0x8f2a991823901bca092819028391029381029381029381029381029381029381',
  };
  const issuerAddress = '0x892a01B09c0F638f321A8090C8eA89C828399120';
  const issueYear = 2024;

  it('should deterministically calculate credential commitment hash', () => {
    const commitment1 = computeCredentialCommitment(mockPrivateData, issuerAddress, issueYear);
    const commitment2 = computeCredentialCommitment(mockPrivateData, issuerAddress, issueYear);

    expect(commitment1).toBeDefined();
    expect(commitment1.startsWith('0x')).toBe(true);
    expect(commitment1).toBe(commitment2);
  });

  it('should change commitment if any private attribute is modified (tamper resistance)', () => {
    const originalCommitment = computeCredentialCommitment(mockPrivateData, issuerAddress, issueYear);
    
    // Tamper with CGPA
    const tamperedPrivateData = { ...mockPrivateData, exactCgpa: 9.99 };
    const tamperedCommitment = computeCredentialCommitment(tamperedPrivateData, issuerAddress, issueYear);

    expect(tamperedCommitment).not.toBe(originalCommitment);
  });

  it('should successfully retrieve initial default credentials', async () => {
    const creds = await credentialService.getCredentials();
    expect(creds.length).toBeGreaterThanOrEqual(3);
    
    const csDegree = creds.find(c => c.publicData.id === 'cred_bsc_cs_2024');
    expect(csDegree).toBeDefined();
    expect(csDegree?.publicData.title).toContain('Computer Science');
    expect(csDegree?.publicData.status).toBe('verified');
  });
});
