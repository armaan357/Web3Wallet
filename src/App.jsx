import React, { useEffect, useState } from 'react';
import WalletCreator from './components/WalletCreator';
import WalletDetails from './components/WalletDetails';
import { NavBar } from './components/NavBar';
import { Button } from './components/Buttons';
import HomePage from './components/HomePage';
import { Transaction } from './components/Transaction';
import BlockchainNetworks from './components/BlockchainNetworks';
import ImportMethods from './components/importMethod';
import { BgGradient } from './components/BgGradient';
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { WalletImportPrivateKey } from './components/importWalletPrivateKey';
import { ImportWalletPhrase } from './components/importWalletPhrase';
import { ImportWalletPublicKey } from './components/importWalletPublicKey';
import CryptoPurchase from './components/Purchase';

function App() {
    const [ wallet, setWallet ] = useState(null);
    const [ mnemonicSaved, setMnemonicSaved ] = useState(false);
    const [ tab, setTab ] = useState('Home');
    const [ walletMethod, setWalletMethod ] = useState('');
    function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
        if (localStorageTheme !== null) {
          return localStorageTheme;
        }
        if (systemSettingDark.matches) {
          return "dark";
        }
        return "light";
    }
    
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

    const [currentThemeSetting, setCurrentThemeSetting] = useState(calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }));

    return (
        <div id='backGround' className={`w-full ${currentThemeSetting == 'dark' ? "bg-custom-gradient-dark" : "bg-custom-gradient-light" } transition-colors duration-200 text-[var(--color-text)] min-h-dvh h-full`}>
            <div className='max-w-7xl mx-auto'>
                <NavBar currentThemeSetting={currentThemeSetting} setCurrentThemeSetting={setCurrentThemeSetting} />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<HomePage setTab={ setTab } setWalletMethod={ setWalletMethod } />} />
                        <Route path='/networks' element={<BlockchainNetworks setTab={ setTab } walletMethod={ walletMethod } />} />
                        <Route path='/import-wallet' element={<ImportMethods setTab={ setTab } />} />
                        <Route path='/import-wallet/private-key' element={<WalletImportPrivateKey onWalletCreate={ setWallet } />} />
                        <Route path='/import-wallet/secret-phrase' element={<ImportWalletPhrase />} />
                        <Route path='/import-wallet/public-key' element={<ImportWalletPublicKey />} /> 
                        <Route path='/create-wallet' element={<WalletCreator onWalletCreate={ setWallet } setTab={ setTab } />} />
                        <Route path='/wallet-details' element={<WalletDetails wallet={ wallet } setTab={ setTab } />} />
                        <Route path='/purchase' element={<CryptoPurchase />} />
                        <Route path='/send' element={<Transaction wallet={ wallet } setTab={ setTab } />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;