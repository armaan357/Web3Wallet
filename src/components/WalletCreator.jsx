import React, { useEffect } from 'react';
import Web3Service from '../services/Web3Service';
import "../App.css";
import { Button } from './Buttons.jsx';
import TransitionsSnackbar from './BiscuitAlert.jsx';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const WalletCreator = ({ onWalletCreate, wallet, mnemonic, setMnemonic }) => {
    const [state, setState] = React.useState({
        open: false,
        Transition: Slide,
    });
    const navigate = useNavigate();
    const web3Service = new Web3Service();

    useEffect(() => {
        if(wallet) return;
        const generateNewWallet = () => {
            const newMnemonic = web3Service.generateMnemonic();
            setMnemonic(newMnemonic);
            const wallet = web3Service.createWalletFromMnemonic(newMnemonic);
            onWalletCreate(wallet);
        }
        generateNewWallet();
    }, []);

    const copyToClipboard = (mnemonic) => {
        navigator.clipboard.writeText(mnemonic)
        .then(() => {
            setState({ open: true, Transition: Slide});
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    const expand = (e) => {
        setVisibilityPhrase(isVisible => !isVisible);
    }

    return (
        <div className='flex flex-col gap-4 items-center my-12 px-1'>
            <TransitionsSnackbar state={state} setState={setState} message='Copied!' />
            <div className='flex flex-col gap-3 items-center w-full' onClick={expand}>
                <h3 className="text-2xl sm:text-3xl font-bold">Secret Recovery Phrase</h3>
                <p className='text-[var(--color-subHeading)] p-0 m-0 tracking-tight font-medium text-md sm:text-xl'>
                    Save this phrase securely! It can't be recovered if lost.
                </p> 
            </div>
            <div className='flex flex-col gap-2 border border-[var(--color-border)] rounded-[10px] p-2 min-w-64 sm:min-w-[600px] bg-[var(--creator-bg)]  dark:text[#f4f4f9] my-5 shadow-lg cursor-pointer hover:shadow-box'>
                
                <div className='flex flex-col gap-2' onClick={() => copyToClipboard(mnemonic)} > 
                    <div className='grid grid-cols-2 sm:grid-cols-3 items-center gap-x-4 gap-y-2 p-3 justify-center' >
                        {mnemonic.split(" ").map((word, index) => <MnemonicWords
                            key = {word}
                            word={word}
                            index={index}
                        />)}
                    </div>
                    <hr className='border-[var(--hr-border)]' />
                    <div className='flex items-center justify-center h-5'>
                        <p className='text-[var(--color-subHeading)] tracking-tighter sm:tracking-normal text-sm font-medium'>Click anywhere to copy</p>
                    </div>
                    
                </div>
            </div>
            <br /> <br />
            <div className='w-72 self-center'>
                <Button
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'} onClick={() =>{ navigate('/wallet-details') }}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

function MnemonicWords(props) {
    return (
        <div className='flex gap-2 items-center justify-start'>
            <p className="text-sm sm:text-base">{props.index+1}</p>
            <p className='px-3 py-2 text-sm sm:text-base font-bold '>{props.word}</p>
        </div>
    )
}

export default WalletCreator;