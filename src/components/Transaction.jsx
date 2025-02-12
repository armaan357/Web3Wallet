import React from 'react'
import { Button } from './Buttons'
import { InputBox } from './Input'

export const Transaction = ({ wallet, setTab }) => {
    const [recipient, setRecipient] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [status, setStatus] = React.useState('');

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

    return (
    <div className='flex flex-col items-center my-12 px-1'>
        <form onSubmit={sendTransaction} className='flex flex-col items-center gap-3 p-2 w-72'>
            <div className='flex flex-col gap-3 items-center w-full'>
                <label className='text-lg font-medium'>Recipient Address:</label>
                <InputBox
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-3 items-center w-full mb-3 sm:mb-4'>
                <label className='text-lg font-medium'>Amount (ETH):</label>
                <InputBox
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                bgColor={'bg-[var(--button-bg)]'} 
                textColor={'text-[var(--button-text)]'} 
                hoverBgColor={'bg-[var(--button-hover)]'} type="submit">
                Send Transaction
            </Button>
        </form>

        {status && (
            <div>
                {status}
            </div>
        )}
    </div>
    );
}