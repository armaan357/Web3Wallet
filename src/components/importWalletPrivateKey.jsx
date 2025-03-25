import { ethers } from 'ethers';
import { useState } from 'react';
import { InputBox } from './Input';
import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';

export const WalletImportPrivateKey = ({ onWalletCreate }) => {
  const [privateKey, setPrivateKey] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const importWallet = async () => {
    try {
      // Clear any previous errors
      setError('');
      
      // Validate private key format
      if (!privateKey.startsWith('0x')) {
        throw new Error('Private key must start with 0x');
      }
      
      if (privateKey.length !== 66) {  // 0x + 64 hex characters
        throw new Error('Private key must be 64 characters long (excluding 0x prefix)');
      }

      // Create wallet instance
      const wallet = new ethers.Wallet(privateKey);
      
      // Get wallet address
      const address = await wallet.getAddress();
      setWalletAddress(address);

      // Here you would typically:
      // 1. Connect to your provider
      const URL = import.meta.env.VITE_PROVIDER_URL;
      const provider = new ethers.JsonRpcProvider(URL);
      const connectedWallet = wallet.connect(provider);

      onWalletCreate(connectedWallet);
      navigate('/wallet-details');
      
      // 2. Store wallet info securely (never store private key!)
      // localStorage.setItem('walletAddress', address);
      
      // 3. Update your app's state
      // dispatch({ type: 'SET_WALLET', payload: address });

    } catch (err) {
      setError(err.message);
      setWalletAddress('');
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col items-center w-72 gap-4">
      <h2 className="text-xl font-bold mb-4">Import Wallet</h2>
      
      <InputBox
        type="password"
        placeholder="Enter private key (0x...)"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />

      {!walletAddress ? <Button
        onClick={importWallet}
        bgColor={'bg-[var(--button-bg)]'} 
        textColor={'text-[var(--button-text)]'} 
        hoverBgColor={'bg-[var(--button-hover)]'}
      >
        Import Wallet
      </Button> : <Button
            onClick={() => { navigate('/wallet-details') }}
            bgColor={'bg-[var(--button-bg)]'} 
            textColor={'text-[var(--button-text)]'} 
            hoverBgColor={'bg-[var(--button-hover)]'}>
              View Wallet
          </Button>}
      

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className='font-bold'>Error:</p> {error}
        </div>
      )}
      
    </div>
  );
};