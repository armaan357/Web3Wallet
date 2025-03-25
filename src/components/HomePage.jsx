import { Button } from './Buttons';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Coins } from "lucide-react"

const HomePage = ({ setWalletMethod }) => {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center px-4 py-16 md:py-20 w-[97%] mx-auto gap-3 lg:gap-6">

            <h1 className='text-4xl md:text-6xl lg:text-7xl text-[var(--color-text)] font-bold'>Welcome to <span className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text'>Web3</span> Wallet</h1>
            <p className='text-lg md:text-2xl max-w-3xl mb-10 text-[var(--color-subHeading)]'>Secure, simple, and powerful. Manage your Solana and Ethereum assets with our easy-to-use wallet.</p>
            <div className='flex flex-col md:flex-row w-72 md:w-[400px] lg:w-[500px] justify-center gap-4 my-4'>
                <Button
                    bgColor={'bg-[var(--primary-button-bg)] hover:bg-[var(--primary-button-hover)]'}
                    textColor={'text-white'}
                    onClick={() => { setWalletMethod('Create'); navigate('/networks');  }}>
                    Create New Wallet
                </Button>
                <Button 
                    bgColor={'bg-[var(--button-bg)]'} 
                    textColor={'text-[var(--button-text)]'} 
                    hoverBgColor={'bg-[var(--button-hover)]'} onClick={() => { setWalletMethod('Import'); navigate('/networks'); }}>
                    Import Wallet
                </Button>
            </div>
                <section id="features" className="container mx-auto px-4 py-20">
                    <h2 className=" text-3xl md:text-5xl font-bold mb-12 text-center">Why Choose Web3 Wallet?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                        {
                            icon: ShieldCheck,
                            title: "Bank-Grade Security",
                            description: "Your assets are protected by state-of-the-art encryption and security measures.",
                        },
                        {
                            icon: Zap,
                            title: "Lightning Fast Transactions",
                            description: "Experience near-instantaneous transfers across multiple blockchains.",
                        },
                        {
                            icon: Coins,
                            title: "Multi-Chain Support",
                            description: "Seamlessly manage assets across various blockchain networks from one interface.",
                        },
                        ].map((feature, index) => (
                        <div key={index} className="bg-[var(--card-bg)] bg-opacity-50 p-6 rounded-xl backdrop-blur-sm shadow-md">
                            <feature.icon className="w-12 h-12 text-[#1127F1] mb-4 mx-auto" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-[var(--color-subHeading)]">{feature.description}</p>
                        </div>
                        ))}
                    </div>
                </section>

                <section id="how-it-works" className="container mx-auto px-4 py-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        {[
                        {
                            step: "1",
                            title: "Create Your Wallet",
                            description: "Set up your CryptoVault wallet in minutes with our easy-to-follow process.",
                        },
                        {
                            step: "2",
                            title: "Secure Your Assets",
                            description: "Transfer your digital assets into your new, highly secure CryptoVault wallet.",
                        },
                        {
                            step: "3",
                            title: "Manage & Grow",
                            description: "Easily manage your portfolio, make transactions, and watch your assets grow.",
                        },
                        ].map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-[var(--card-bg)] bg-opacity-50 p-6 rounded-xl backdrop-blur-sm shadow-md">
                            <div className="text-5xl font-bold text-[#1127F1] mb-4">{step.step}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-[var(--color-subHeading)]">{step.description}</p>
                            </div>
                            {index < 2 && (
                            <ArrowRight className="hidden md:block absolute top-1/2 -right-6 text-[#1127F1] w-8 h-8 transform -translate-y-1/2" />
                            )}
                        </div>
                        ))}
                    </div>
                </section>
        </div>
    );
};

export default HomePage;