import React, { useState, useEffect } from 'react';
import Web3Service from '../services/Web3Service';
import copyIcon from '../assets/copy.svg';
import TransitionsSnackbar from './BiscuitAlert.jsx';
import Slide from '@mui/material/Slide';
import { Button } from './Buttons.jsx';
import { useNavigate } from 'react-router-dom';

const WalletDetails = ({ wallet, setTab }) => {
    const [balance, setBalance] = useState('0');
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [state, setState] = React.useState({
        open: false,
        Transition: Slide,
    });
    const navigate = useNavigate();
    const web3Service = new Web3Service();

    console.log("details wallet = ", wallet);

    function copyToClipboard(key) {
        navigator.clipboard.writeText(key)
        .then(() => {
            setState({open: true, Transition: Slide});
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    useEffect(() => {
        if (wallet) {
            updateBalance();
        }
    }, [wallet]);

    const updateBalance = async () => {
        if (wallet) {
            const newBalance = await web3Service.getBalance(wallet.address);
            setBalance(newBalance);
        }
    };

    const changeTab = () => {
        setTab('Transaction');
    }

    const sendTransaction = async (e) => {
        e.preventDefault();
        setStatus('Sending transaction...');
        try {
            const receipt = await web3Service.sendTransaction(wallet, recipient, amount);
            setStatus(`Transaction successful! Hash: ${receipt.transactionHash}`);
            updateBalance();
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    if (!wallet) return null;

    return (
        <div className='flex flex-col items-center my-12 px-1]'>
            <TransitionsSnackbar state={state} setState={setState} message='Copied!' />
            <div className='flex gap-3 flex-col w-5/6'> 
                <h1 className='text-2xl sm:text-3xl font-bold self-start'>Wallet Details</h1>
                <div>
                    
                    <div className='flex flex-col border w-full border-[var(--color-border)] rounded-2xl gap-5 items-center hover:shadow-box bg-[var(--wallet-bg)] my-10'>
                        <div className='w-full flex justify-items-start px-3 sm:px-6 py-3 sm:py-6'>
                            <h3 className='text-xl sm:text-2xl'><strong>Wallet:</strong></h3>
                        </div>
                        <div className='flex flex-col justify-start text-left w-full px-3 sm:px-6 py-3 sm:py-6 bg-[var(--creator-bg)] rounded-2xl'>
                            <h4 className='text-lg sm:text-xl font-semibold'>Public Address:</h4>
                            <div className='flex gap-5'>
                                <p className='truncate w-full'> {wallet.address}</p>
                                <div onClick={() => copyToClipboard(wallet.address)} className='cursor-pointer object-contain'>
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" role="img" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 3H14.6C16.8402 3 17.9603 3 18.816 3.43597C19.5686 3.81947 20.1805 4.43139 20.564 5.18404C21 6.03969 21 7.15979 21 9.4V16.5M6.2 21H14.3C15.4201 21 15.9802 21 16.408 20.782C16.7843 20.5903 17.0903 20.2843 17.282 19.908C17.5 19.4802 17.5 18.9201 17.5 17.8V9.7C17.5 8.57989 17.5 8.01984 17.282 7.59202C17.0903 7.21569 16.7843 6.90973 16.408 6.71799C15.9802 6.5 15.4201 6.5 14.3 6.5H6.2C5.0799 6.5 4.51984 6.5 4.09202 6.71799C3.71569 6.90973 3.40973 7.21569 3.21799 7.59202C3 8.01984 3 8.57989 3 9.7V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='mb-5 text-xl'><strong>Balance:</strong> {balance} ETH</p>
                </div>
                <div className='w-5/6 sm:w-72 self-center'>
                    <Button
                        bgColor={'bg-[var(--button-bg)]'} 
                        textColor={'text-[var(--button-text)]'} 
                        hoverBgColor={'bg-[var(--button-hover)]'} onClick={() =>{ setTab('Transaction'); navigate('/send') }} >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WalletDetails;