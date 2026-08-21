import React, { useState, useEffect } from 'react';
import { walletService } from '../services/walletService';
import { WalletState } from '../types';
import { AlertCircle, CheckCircle2, Loader2, Network, Wallet } from 'lucide-react';
// import { setupProviders } from '@meshsdk/midnight-setup';
// import { CredentialVerifierContract } from '../contract/CredentialVerifier';

export const DeployPage: React.FC = () => {
  const [walletState, setWalletState] = useState<WalletState>(walletService.getState());
  const [deployStatus, setDeployStatus] = useState<'idle' | 'connecting' | 'compiling' | 'deploying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    const unsubscribe = walletService.subscribe(setWalletState);
    return unsubscribe;
  }, []);

  const handleConnect = async () => {
    setErrorMessage('');
    setDeployStatus('connecting');
    try {
      await walletService.connect('lace', 'preprod');
      setDeployStatus('idle');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to connect wallet');
      setDeployStatus('error');
    }
  };

  const handleDeploy = async () => {
    setErrorMessage('');
    setContractAddress('');
    
    if (!walletState.isConnected) {
      setErrorMessage('Wallet not connected. Please connect Lace first.');
      setDeployStatus('error');
      return;
    }

    if (!walletState.network.toLowerCase().includes('preprod')) {
      setErrorMessage(`Wrong network detected: ${walletState.network}. Please switch Lace to Preprod.`);
      setDeployStatus('error');
      return;
    }

    setDeployStatus('deploying');

    try {
      // 1. Verify the contract is compiled
      // We cannot guess the exact API, so this is where the actual verified
      // deployment SDK call must be implemented using the generated contract bindings.
      
      throw new Error(
        'Deployment Setup Ready: Please compile CredentialVerifier.compact and insert the actual Midnight deployment call (e.g., using @meshsdk/midnight-setup) in DeployPage.tsx line 47. Do not guess the API.'
      );

      /* 
      // === ACTUAL DEPLOYMENT IMPLEMENTATION ===
      // const providers = await setupProviders();
      // const deployedContract = await CredentialVerifierContract.deploy(providers, { ...initialArgs });
      // setContractAddress(deployedContract.address);
      */
      
      // setDeployStatus('success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Deployment transaction failed or was rejected.');
      setDeployStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        
        <div className="border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Level 3 Preprod Deployment
          </h1>
          <p className="text-gray-400 mt-2">
            Securely deploy the CredentialVerifier compact contract to the Midnight Preprod network using Lace.
          </p>
        </div>

        {/* Status Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Wallet className={`w-6 h-6 ${walletState.isConnected ? 'text-green-400' : 'text-gray-500'}`} />
              <h2 className="text-xl font-semibold">Wallet Status</h2>
            </div>
            {walletState.isConnected ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Connected via {walletState.walletType}</p>
                <p className="font-mono text-sm break-all">{walletState.address}</p>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                disabled={deployStatus === 'connecting'}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {deployStatus === 'connecting' ? 'Connecting...' : 'Connect Lace Wallet'}
              </button>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Network className={`w-6 h-6 ${walletState.network.toLowerCase().includes('preprod') ? 'text-green-400' : 'text-yellow-500'}`} />
              <h2 className="text-xl font-semibold">Network Status</h2>
            </div>
            {walletState.isConnected ? (
              <div className="space-y-2">
                <p className="font-medium text-lg text-cyan-400">{walletState.network}</p>
                {!walletState.network.toLowerCase().includes('preprod') && (
                  <p className="text-sm text-yellow-500">
                    ⚠️ You must switch your Lace wallet to the Preprod network to deploy.
                  </p>
                )}
                <p className="text-sm text-gray-400">Ensure you have sufficient tDUST to cover gas fees.</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Connect wallet to view network</p>
            )}
          </div>
        </div>

        {/* Deployment Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Contract Deployment</h2>
          
          <div className="space-y-6">
            
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400 whitespace-pre-wrap">{errorMessage}</p>
              </div>
            )}

            {deployStatus === 'success' && contractAddress && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-bold text-green-400">Deployment Successful!</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">Real Preprod Contract Address:</p>
                <div className="bg-black/50 border border-gray-700 p-3 rounded font-mono text-cyan-300 select-all break-all">
                  {contractAddress}
                </div>
              </div>
            )}

            {(deployStatus === 'idle' || deployStatus === 'error' || deployStatus === 'deploying') && (
              <button
                onClick={handleDeploy}
                disabled={deployStatus === 'deploying' || !walletState.isConnected || !walletState.network.toLowerCase().includes('preprod')}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {deployStatus === 'deploying' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Deploying to Preprod... Check Lace Wallet...</span>
                  </>
                ) : (
                  <span>Deploy Contract to Preprod</span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
