import { useState, useEffect } from 'react';
import { InputBox } from './Input';
import { Button } from './Buttons';

const CryptoPurchase = () => {
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('ethereum');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cryptoAmount, setCryptoAmount] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    routingNumber: '',
    accountName: '',
  });

  const EXCHANGE_RATES = {
    ethereum: 3000,
    solana: 100,
  };

  const PAYMENT_METHODS = {
    card: {
      name: 'Credit/Debit Card',
      fees: 0.03, 
    },
    bank: {
      name: 'Bank Transfer',
      fees: 0.01,
    },
  };

  useEffect(() => {
    if (purchaseAmount) {
      const amount = parseFloat(purchaseAmount);
      const rate = EXCHANGE_RATES[selectedCrypto];
      const fees = PAYMENT_METHODS[paymentMethod].fees * amount;
      const finalAmount = (amount - fees) / rate;
      setCryptoAmount(finalAmount.toFixed(6));
    }
  }, [purchaseAmount, selectedCrypto, paymentMethod]);

  const validatePaymentDetails = () => {
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.length < 16) {
        throw new Error('Invalid card number');
      }
      if (!paymentDetails.expiryDate || !paymentDetails.expiryDate.match(/^\d{2}\/\d{2}$/)) {
        throw new Error('Invalid expiry date');
      }
      if (!paymentDetails.cvv || paymentDetails.cvv.length < 3) {
        throw new Error('Invalid CVV');
      }
    } else {
      if (!bankDetails.accountNumber || bankDetails.accountNumber.length < 8) {
        throw new Error('Invalid account number');
      }
      if (!bankDetails.routingNumber || bankDetails.routingNumber.length < 9) {
        throw new Error('Invalid routing number');
      }
    }
  };

  const handlePurchase = async () => {
    setError('');
    setLoading(true);

    try {
      if (!purchaseAmount || parseFloat(purchaseAmount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      validatePaymentDetails();

      await new Promise(resolve => setTimeout(resolve, 2000));

      alert(`Successfully purchased ${cryptoAmount} ${selectedCrypto.toUpperCase()}`);

      setPurchaseAmount('');
      setPaymentDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: '',
      });
      setBankDetails({
        accountNumber: '',
        routingNumber: '',
        accountName: '',
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CardPaymentForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Card Number</label>
        <InputBox
            type={'text'}
            value={paymentDetails.cardNumber}
            onChange={(e) => setPaymentDetails({
                ...paymentDetails,
                cardNumber: e.target.value.replace(/\D/g, '')
            })}
            placeholder={'1234 5678 9012 3456'} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Expiry Date</label>
          <InputBox
            type="text"
            value={paymentDetails.expiryDate}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails,
              expiryDate: e.target.value
            })}
            placeholder="MM/YY" />
            
        </div>
        <div>
          <label className="block mb-1">CVV</label>
          <InputBox
            type="text"
            maxLength="4"
            value={paymentDetails.cvv}
            onChange={(e) => setPaymentDetails({
              ...paymentDetails,
              cvv: e.target.value.replace(/\D/g, '')
            })}
            placeholder="123" />
        </div>
      </div>
      <div>
        <label className="block mb-1">Cardholder Name</label>
        <InputBox
          type="text"
          value={paymentDetails.name}
          onChange={(e) => setPaymentDetails({
            ...paymentDetails,
            name: e.target.value
          })}
          placeholder="John Doe"
        />
      </div>
    </div>
  );

  const BankTransferForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">Account Number</label>
        <InputBox
          type="text"
          value={bankDetails.accountNumber}
          onChange={(e) => setBankDetails({
            ...bankDetails,
            accountNumber: e.target.value.replace(/\D/g, '')
          })}
          placeholder="12345678"
        />
      </div>
      <div>
        <label className="block mb-1">Routing Number</label>
        <InputBox
          type="text"
          value={bankDetails.routingNumber}
          onChange={(e) => setBankDetails({
            ...bankDetails,
            routingNumber: e.target.value.replace(/\D/g, '')
          })}
          placeholder="123456789"
        />
      </div>
      <div>
        <label className="block mb-1">Account Holder Name</label>
        <InputBox
          type="text"
          value={bankDetails.accountName}
          onChange={(e) => setBankDetails({
            ...bankDetails,
            accountName: e.target.value
          })}
          placeholder="John Doe"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-6  rounded-lg mb-5">
      <h2 className="text-2xl font-bold mb-4">Purchase Crypto</h2>

      <div className="mb-4">
        <label className="block mb-2">Select Cryptocurrency</label>
        <select
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="bg-[var(--input-bg)] w-full p-3 text-[var(--color-text)] text-base rounded-lg outline-none focus-within:shadow-md border border-[var(--input-border)] focus-within:border focus-within:border-[var(--input-focus-border)]"
        >
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="solana">Solana (SOL)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Amount (USD)</label>
        <InputBox
            type={'number'}
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            placeholder={'Enter amount in USD'}
            // min="0"
        />
      </div>

      {purchaseAmount && (
        <div className="mb-4 p-2 bg-gray-50 rounded">
          <p>You will receive approximately:</p>
          <p className="font-bold">{cryptoAmount} {selectedCrypto.toUpperCase()}</p>
          <p className="text-sm text-gray-500">
            Fee: {(PAYMENT_METHODS[paymentMethod].fees * 100)}%
          </p>
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="bg-[var(--input-bg)] w-full p-3 text-[var(--color-text)] text-base rounded-lg outline-none focus-within:shadow-md border border-[var(--input-border)] focus-within:border focus-within:border-[var(--input-focus-border)]"
        >
          <option value="card">Credit/Debit Card</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {paymentMethod === 'card' ? <CardPaymentForm /> : <BankTransferForm />}

      {error && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className='py-5'>
        <Button
        bgColor={'bg-[var(--button-bg)]'}
        textColor={'text-[var(--button-text)]'}
        hoverBgColor={'bg-[var(--button-hover)]'}
        onClick={handlePurchase}
        disabled={loading}>
            {loading ? 'Processing...' : 'Purchase'}
        </Button>
      </div>
    </div>
  );
};

export default CryptoPurchase;