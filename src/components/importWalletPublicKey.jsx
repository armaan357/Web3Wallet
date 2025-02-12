import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import * as web3 from '@solana/web3.js';
import { Button } from './Buttons';
import { InputBox } from './Input';

export const ImportWalletPublicKey = () => {
  const [chain, setChain] = useState('ethereum');
  const [publicKey, setPublicKey] = useState('');
  const [walletInfo, setWalletInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Blockchain configurations
  const CHAINS = {
    ethereum: {
      name: 'Ethereum',
      provider: new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'),
      validateAddress: (address) => ethers.isAddress(address),
      fetchBalance: async (address) => {
        try {
          const balance = await CHAINS.ethereum.provider.getBalance(address);
          return ethers.formatEther(balance);
        } catch (err) {
          throw new Error(`Failed to fetch Ethereum balance: ${err.message}`);
        }
      }
    },
    solana: {
      name: 'Solana',
      provider: new web3.Connection(web3.clusterApiUrl('mainnet-beta')),
      validateAddress: (address) => {
        try {
          new web3.PublicKey(address);
          return true;
        } catch {
          return false;
        }
      },
      fetchBalance: async (address) => {
        try {
          const publicKey = new web3.PublicKey(address);
          const balance = await CHAINS.solana.provider.getBalance(publicKey);
          return (balance / web3.LAMPORTS_PER_SOL).toFixed(4);
        } catch (err) {
          throw new Error(`Failed to fetch Solana balance: ${err.message}`);
        }
      }
    }
  };

  const fetchWalletInfo = async () => {
    // Reset previous state
    setWalletInfo(null);
    setError('');
    setLoading(true);

    try {
      // Validate public key
      const currentChain = CHAINS[chain];
      if (!currentChain.validateAddress(publicKey)) {
        throw new Error('Invalid public key for selected blockchain');
      }

      // Fetch balance
      const balance = await currentChain.fetchBalance(publicKey);

      // Additional wallet info can be added here
      setWalletInfo({
        publicKey,
        chain: currentChain.name,
        balance,
        explorerLink: chain === 'ethereum'
          ? `https://etherscan.io/address/${publicKey}`
          : `https://solscan.io/account/${publicKey}`
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch wallet info when public key changes
  useEffect(() => {
    if (publicKey) {
      fetchWalletInfo();
    }
  }, [chain, publicKey]);

  return (
    <div className="max-w-md mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">View-Only Wallet Import</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Blockchain</label>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="bg-[var(--input-bg)] w-full p-3 text-[var(--color-text)] text-base rounded-lg outline-none focus-within:shadow-md border border-[var(--input-border)] focus-within:border focus-within:border-[var(--input-focus-border)]"
        >
          <option value="ethereum">Ethereum</option>
          <option value="solana">Solana</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Public Key/Address</label>
        <InputBox
          type="text"
          placeholder={`Enter ${CHAINS[chain].name} Public Key`}
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </div>

      <Button
        onClick={fetchWalletInfo}
        disabled={!publicKey || loading}
        bgColor={'bg-[var(--button-bg)]'} 
        textColor={'text-[var(--button-text)]'} 
        hoverBgColor={'bg-[var(--button-hover)]'}>
        {loading ? 'Fetching...' : 'Import View-Only Wallet'}
      </Button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {walletInfo && (
        <div className="mt-4 p-4 bg-gray-50 border rounded">
          <h3 className="font-bold text-lg mb-2">Wallet Information</h3>
          <div className="space-y-2">
            <div>
              <label className="font-medium">Blockchain:</label>
              <p>{walletInfo.chain}</p>
            </div>
            <div>
              <label className="font-medium">Public Key:</label>
              <p className="break-all">{walletInfo.publicKey}</p>
            </div>
            <div>
              <label className="font-medium">Balance:</label>
              <p>{walletInfo.balance} {chain === 'ethereum' ? 'ETH' : 'SOL'}</p>
            </div>
            <a
              href={walletInfo.explorerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-500 hover:underline"
            >
              View on Block Explorer
            </a>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <strong>Note:</strong> View-only wallets allow you to monitor balance and transactions without access to private keys.
      </div>
    </div>
  );
};