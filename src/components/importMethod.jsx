import React from 'react';
import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';

const ImportMethods = ({ setTab }) => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center my-12 px-1'>
            <h3 className='text-xl sm:text-2xl text-[var(--color-text)] font-semibold'>Import your wallet</h3>
            <p className='text-sm sm:text-base text-[var(--color-subHeading)]'>Choose a method for importing your wallet</p>
            <div className='flex flex-col w-72 justify-center gap-4 my-4'>
                <Button 
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'}
                    onClick={() => {navigate('/import-wallet/secret-phrase')}}>
                    Import secret recovery phrase
                </Button>
                <Button
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'}
                    onClick={() => {navigate('/import-wallet/private-key')}}>
                    Import from private key
                </Button>
                <Button
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'}
                    onClick={() => {navigate('/import-wallet/public-key')}}>
                    Add view-only public key
                </Button>
            </div>
        </div>
    );
};

export default ImportMethods;