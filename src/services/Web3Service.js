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
            this.provider = new ethers.JsonRpcProvider(providerUrl);
        } catch (error) {
            console.error('Error initializing provider:', error);
            throw new Error('Failed to initialize Web3 provider');
        }
    }

    generateMnemonic() {
        const wallet = ethers.Wallet.createRandom();
        return wallet.mnemonic?.phrase;
    }

    createWalletFromMnemonic(mnemonic) {
        return ethers.HDNodeWallet.fromPhrase(mnemonic).connect(this.provider);
    }

    async getBalance(address) {
        const balance = await this.provider.getBalance(address);
        return ethers.formatEther(balance); 
    }

    async sendTransaction(wallet, toAddress, amount) {
        if(amount !== Number) {
            console.log("amount should be numbers")
            return;
        }
        try {
            const tx = {
                to: toAddress,
                value: ethers.parseEther(amount.toString()) 
            };

            const feeData = await this.provider.getFeeData();
            tx.gasPrice = feeData.gasPrice;

            const gasLimit = await this.provider.estimateGas(tx);
            tx.gasLimit = gasLimit;

            const transaction = await wallet.sendTransaction(tx);
            
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
        return ethers.formatUnits(balance, decimals); 
    }
}

export default Web3Service;