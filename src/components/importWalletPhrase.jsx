import { useState } from 'react';
import { ethers } from 'ethers';
import * as web3 from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Button } from './Buttons';
import { InputBox } from './Input';

export const ImportWalletPhrase = () => {
  const [recoveryPhrase, setRecoveryPhrase] = useState('');
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [importedWallets, setImportedWallets] = useState({
    ethereum: null,
    solana: null
  });
  const [error, setError] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const validateRecoveryPhrase = (phrase) => {

    const words = phrase.trim().split(/\s+/);
    
    if (![12, 15, 18, 21, 24].includes(words.length)) {
      return false;
    }

    try {
      return bip39.validateMnemonic(words.join(' '));
    } catch {
      return false;
    }
  };

  const importWallet = async () => {

    setError('');
    setImportedWallets({ ethereum: null, solana: null });

    if (!validateRecoveryPhrase(recoveryPhrase)) {
      setError('Invalid recovery phrase. Please check and try again.');
      return;
    }

    if (passwordEnabled && !password) {
      setError('Please enter a password');
      return;
    }

    try {

      const ethWallet = ethers.Wallet.fromPhrase(recoveryPhrase);
      const seed = await bip39.mnemonicToSeed(recoveryPhrase);
      const derivedSeed = derivePath(`m/44'/501'/0'/0'`, seed.slice(0, 32));
      const solanaKeypair = web3.Keypair.fromSeed(derivedSeed.key);

      setImportedWallets({
        ethereum: {
          address: ethWallet.address,
          privateKey: ethWallet.privateKey
        },
        solana: {
          publicKey: solanaKeypair.publicKey.toString(),
          privateKey: Buffer.from(solanaKeypair.secretKey).toString('hex')
        }
      });

      setShowDetails(true);
    } catch (err) {
      setError(`Import failed: ${err.message}`);
    }
  };

  const WalletDetails = ({ chain, wallet }) => (
    <div className="mt-4 p-4 border rounded">
      <h3 className="font-bold text-lg mb-2">{chain} Wallet</h3>
      <div className="space-y-2">
        <div>
          <label className="font-medium">
            {chain === 'Ethereum' ? 'Address' : 'Public Key'}:
          </label>
          <div className="p-2 border rounded break-all text-sm">
            {wallet.address || wallet.publicKey}
          </div>
        </div>
        <div>
          <label className="font-medium">Private Key:</label>
          <div className="bg-white p-2 border rounded break-all text-sm">
            {wallet.privateKey}
          </div>
        </div>
        <Button
          onClick={() => navigator.clipboard.writeText(wallet.privateKey)}
          bgColor={'bg-[var(--button-bg)]'} 
          textColor={'text-[var(--button-text)]'} 
          hoverBgColor={'hover:bg-[var(--button-hover)]'}>
          Copy Private Key
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Import Wallet</h2>
      
      <div className="mb-4">

        <textarea
          rows="4"
          className="bg-[var(--input-bg)] w-full p-3 text-[var(--color-text)] text-base rounded-lg outline-none focus-within:shadow-md border border-[var(--input-border)] focus-within:border focus-within:border-[var(--input-focus-border)]"
          placeholder="Enter your 12 or 24 word recovery phrase"
          value={recoveryPhrase}
          onChange={(e) => setRecoveryPhrase(e.target.value)}
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="enable-password"
          className="mr-2"
          checked={passwordEnabled}
          onChange={() => setPasswordEnabled(!passwordEnabled)}
        />
        <label htmlFor="enable-password">Enable Additional Encryption</label>
      </div>

      {passwordEnabled && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Encryption Password</label>
          <InputBox
            type="password"
            placeholder="Enter encryption password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      <Button
        onClick={importWallet}
        bgColor={'bg-[var(--button-bg)]'} 
        textColor={'text-[var(--button-text)]'} 
        hoverBgColor={'bg-[var(--button-hover)]'}>
            Import Wallet
      </Button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showDetails && (
        <div>
          <WalletDetails chain="Ethereum" wallet={importedWallets.ethereum} />
          <WalletDetails chain="Solana" wallet={importedWallets.solana} />
        </div>
      )}
    </div>
  );
};
