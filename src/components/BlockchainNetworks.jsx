import React from 'react';
import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';

const BlockchainNetworks = ({ setTab, walletMethod, setNetwork }) => {
    const navigate = useNavigate();
    const redirect = (network) => {
        setNetwork(network);
        if(walletMethod === 'Create') {
            navigate('/create-wallet');
            setTab('WalletCreator');
        } else {
            navigate('/import-wallet')
            setTab('ImportMethod');
        }
    }
    return (
        <div className='flex flex-col items-center my-12 p-2 sm:p-8 w-[97%] mx-auto gap-2 lg:gap-3'>
            <h3 className='text-xl sm:text-2xl lg:text-3xl text-[var(--color-text)] font-semibold'>Select Your Preferred Blockchain</h3>
            <p className='text-sm sm:text-base lg:text-lg text-[var(--color-subHeading)] sm:font-medium'>
                Explore the world of decentralized finance by choosing your preferred blockchain. Click on the button below to get started with either Solana or Ethereum.
            </p>
            
            <div className='flex flex-col md:flex-row w-72 md:w-[400px] lg:w-[500px] justify-center gap-4 my-4'>
                <Button 
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'} onClick={() => redirect("Sol")}>
                    Solana
                </Button>
                <Button 
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'} onClick={() => redirect("Eth")}>
                    Ethereum
                </Button>
            </div>
        </div>
    );
};

export default BlockchainNetworks;