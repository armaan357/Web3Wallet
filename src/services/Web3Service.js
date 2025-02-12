// src/services/Web3Service.js
import { ethers } from 'ethers';

class Web3Service {
    constructor() {
        const providerUrl = import.meta.env.VITE_PROVIDER_URL;
        
        if (!providerUrl) {
            throw new Error(
                'Provider URL not found. Please make sure you have VITE_PROVIDER_URL in your .env file'
            );
        }
        
        try {
            // This is the new way to create a provider in ethers.js v6
            this.provider = new ethers.JsonRpcProvider(providerUrl);
        } catch (error) {
            console.error('Error initializing provider:', error);
            throw new Error('Failed to initialize Web3 provider');
        }
    }

    generateMnemonic() {
        // In v6, we use Wallet.createRandom() directly
        const wallet = ethers.Wallet.createRandom();
        return wallet.mnemonic?.phrase;
    }

    createWalletFromMnemonic(mnemonic) {
        // Updated for v6
        return ethers.HDNodeWallet.fromPhrase(mnemonic).connect(this.provider);
    }

    async getBalance(address) {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance); // Updated formatting method
    }

    async sendTransaction(wallet, toAddress, amount) {
        if(amount !== Number) {
            console.log("amount should be numbers")
            return;
        }
        try {
            const tx = {
                to: toAddress,
                value: ethers.parseEther(amount.toString()) // Updated parsing method
            };

            // Get current gas price
            const feeData = await this.provider.getFeeData();
            tx.gasPrice = feeData.gasPrice;

            // Estimate gas limit
            const gasLimit = await this.provider.estimateGas(tx);
            tx.gasLimit = gasLimit;

            // Send transaction
            const transaction = await wallet.sendTransaction(tx);
            
            // Wait for transaction to be mined
            const receipt = await transaction.wait();
            
            return receipt;
        } catch (error) {
            throw new Error(`Transaction failed: ${error.message}`);
        }
    }

    async getTokenBalance(tokenAddress, walletAddress) {
        const minABI = [
            {
                constant: true,
                inputs: [{ name: "_owner", type: "address" }],
                name: "balanceOf",
                outputs: [{ name: "balance", type: "uint256" }],
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "decimals",
                outputs: [{ name: "", type: "uint8" }],
                type: "function",
            }
        ];

        const contract = new ethers.Contract(tokenAddress, minABI, this.provider);
        const decimals = await contract.decimals();
        const balance = await contract.balanceOf(walletAddress);
        return ethers.formatUnits(balance, decimals); // Updated formatting method
    }
}

export default Web3Service;