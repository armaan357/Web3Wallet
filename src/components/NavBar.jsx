import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function NavBar({ currentThemeSetting, tab, setCurrentThemeSetting }) {

    const btnRef = useRef();

    const changeTheme = (e) => {
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        const label = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
        const button = e.currentTarget;
        const isChecked = button.getAttribute('aria-checked') === 'true';

        button.setAttribute('aria-checked', !isChecked);
        e.target.setAttribute("aria-label", label);
        document.querySelector("html").setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setCurrentThemeSetting(newTheme);
    }

    useEffect(() => {
        const button = btnRef.current;
        const isDarkTheme = currentThemeSetting === "dark";
        button.setAttribute('aria-checked', isDarkTheme);
        document.querySelector("html").setAttribute("data-theme", currentThemeSetting);
    }, [currentThemeSetting]);

    return (
        <nav className="items-center flex justify-between w-[97%] px-1 sm:px-4 max-w-[370px] sm:max-w-none mx-auto py-4 sm:py-6">
            <div className=" flex gap-16 items-center">
                {/* <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M20 10 L 50 50 L 20 90 L 50 70 L 20 10" stroke="var(--stroke-color)" strokeWidth="4" strokeLinejoin="round"/>
                    <path d="M80 10 L 50 50 L 80 90 L 50 30 L 80 10" stroke="var(--stroke-color)" strokeWidth="4" strokeLinejoin="round"/>
                </svg> */}
                <div className=" flex gap-1 sm:gap-2 items-center">
                    <a href="/" >
                        <svg width='34' height="34" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M20 10 L 50 50 L 20 90 L 50 70 L 20 10" stroke="none" strokeWidth="4" strokeLinejoin="round"/>
                            <path d="M80 10 L 50 50 L 80 90 L 50 30 L 80 10" stroke="none" strokeWidth="4" strokeLinejoin="round"/>
                        </svg>
                    </a>

                    <a href="/">
                        <h1 className='text-2xl sm:text-3xl font-semibold'>Web3 Wallet</h1>
                    </a>
                </div>
                
                
                {tab === 'Home' && <div className="hidden sm:flex gap-5 self-end">
                    <a href="#features">
                        <h3 className='text-lg transition-all duration-100 hover:text-[var(--primary-button-bg)]'>Features</h3>
                    </a>
                    <a href="#how-it-works">
                        <h3 className='text-lg transition-all duration-100 hover:text-[var(--primary-button-bg)]'>How it works</h3>
                    </a>
                    
                </div>}
            </div>
            <div className="flex justify-between gap-1 sm:gap-2 items-center">
                <button ref={btnRef} type="button" role="switch" data-theme-toggle aria-label="Change to light theme" onClick={changeTheme} aria-checked="false" value="on" className="p-2 transition-all hover:bg-[var(--toggle-bg)] hover-text-purple-400 rounded-lg">
                    {currentThemeSetting === 'dark' ? <Sun color="white" className="w-5 h-5" />
                    : <Moon color="black" className="w-5 h-5" />}
                </button>
            </div>
        </nav>
    )
}