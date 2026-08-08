import { describe, it, expect } from 'vitest';
import { walletService } from '../services/walletService';
import { truncateAddress } from '../utils/formatters';

describe('4. Midnight Wallet Connection & Session Tests', () => {
  it('should correctly format and truncate wallet addresses', () => {
    const fullAddress = '0x7A94bfa283ce93284028148b812048f9382103892';
    const truncated = truncateAddress(fullAddress, 6, 4);

    expect(truncated).toBe('0x7A94...3892');
  });

  it('should connect to Midnight testnet and update wallet state', async () => {
    const state = await walletService.connect();

    expect(state.isConnected).toBe(true);
    expect(state.address).toBeDefined();
    expect(state.network).toContain('Midnight Testnet');
    expect(state.balance).toBeGreaterThan(0);
  });

  it('should sign proof verification payload when connected', async () => {
    await walletService.connect();
    const signature = await walletService.signProofPayload('verify-credential-claim');

    expect(signature).toBeDefined();
    expect(signature.startsWith('0x_midnight_sig_')).toBe(true);
  });

  it('should disconnect and clear wallet session', async () => {
    await walletService.connect();
    const disconnectedState = await walletService.disconnect();

    expect(disconnectedState.isConnected).toBe(false);
    expect(disconnectedState.address).toBeNull();
  });
});
