
import React, { useState } from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from 'lucide-react';

const AlternativePaymentMethods: React.FC = () => {
  const { 
    selectedPaymentMethod, 
    amount, 
    currency, 
    prevStep,
    setProcessing,
    completeTransaction
  } = usePayment();
  
  const [generatingAddress, setGeneratingAddress] = useState(false);
  const [cryptoAddress, setCryptoAddress] = useState('');
  
  const handlePay = () => {
    if (selectedPaymentMethod === 'crypto') {
      setGeneratingAddress(true);
      // Simulate API call to generate crypto address
      setTimeout(() => {
        setCryptoAddress('bc1qxy2kgdygjrsqtzf2263ytzv8ptdvsywgf3z2tc');
        setGeneratingAddress(false);
      }, 1500);
    } else {
      // For Google Pay or Apple Pay
      setProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        completeTransaction();
      }, 2000);
    }
  };
  
  // Render content based on payment method
  const renderMethodContent = () => {
    if (selectedPaymentMethod === 'google-pay') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-payment-purple/10 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#8B5CF6" strokeWidth="2">
              <path d="M12 2L2 12l10 10 10-10z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Google Pay</h3>
          <p className="text-sm text-gray-500 text-center">
            Click the button below to complete your payment of {currency} {amount.toFixed(2)} using Google Pay.
          </p>
        </div>
      );
    } 
    else if (selectedPaymentMethod === 'apple-pay') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-payment-purple/10 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#8B5CF6" strokeWidth="2">
              <path d="M12 3C9.5 3 7.5 4.5 7 6.5C8.5 7 9.5 8.5 9.5 10C9.5 11.5 8.5 13 7 13.5C7.5 15.5 9.5 17 12 17C14.5 17 16.5 15.5 17 13.5C15.5 13 14.5 11.5 14.5 10C14.5 8.5 15.5 7 17 6.5C16.5 4.5 14.5 3 12 3Z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg">Apple Pay</h3>
          <p className="text-sm text-gray-500 text-center">
            Click the button below to complete your payment of {currency} {amount.toFixed(2)} using Apple Pay.
          </p>
        </div>
      );
    } 
    else if (selectedPaymentMethod === 'crypto') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-payment-purple/10 rounded-full flex items-center justify-center">
            <BitcoinIcon className="text-payment-purple" size={32} />
          </div>
          <h3 className="font-semibold text-lg">Cryptocurrency Payment</h3>
          
          {!cryptoAddress ? (
            <p className="text-sm text-gray-500 text-center">
              Click the button below to generate a {currency === 'BTC' ? 'Bitcoin' : 'cryptocurrency'} address for your payment of {currency} {amount.toFixed(2)}.
            </p>
          ) : (
            <div className="w-full space-y-4 animate-fade-in">
              <p className="text-sm text-gray-500 text-center">
                Please send {amount.toFixed(6)} {currency === 'BTC' ? 'BTC' : 'ETH'} to the following address:
              </p>
              <div className="bg-gray-100 p-3 rounded-md overflow-hidden">
                <p className="text-xs text-center font-mono break-all select-all">{cryptoAddress}</p>
              </div>
              <div className="flex justify-center">
                <div className="rounded-md bg-payment-purple/5 p-3 crypto-shimmer">
                  <svg width="150" height="150" viewBox="0 0 100 100">
                    <rect x="15" y="15" width="70" height="70" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                    {/* Simple representation of a QR code */}
                    <rect x="25" y="25" width="10" height="10" fill="#8B5CF6" />
                    <rect x="45" y="25" width="10" height="10" fill="#8B5CF6" />
                    <rect x="65" y="25" width="10" height="10" fill="#8B5CF6" />
                    <rect x="25" y="45" width="10" height="10" fill="#8B5CF6" />
                    <rect x="45" y="45" width="10" height="10" fill="#8B5CF6" />
                    <rect x="65" y="45" width="10" height="10" fill="#8B5CF6" />
                    <rect x="25" y="65" width="10" height="10" fill="#8B5CF6" />
                    <rect x="45" y="65" width="10" height="10" fill="#8B5CF6" />
                    <rect x="65" y="65" width="10" height="10" fill="#8B5CF6" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-center text-gray-500">
                The payment will be automatically confirmed after 1 network confirmation.
              </p>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        {renderMethodContent()}
      </div>
      
      <div className="pt-4 space-y-3">
        {!cryptoAddress && (
          <Button 
            onClick={handlePay}
            disabled={generatingAddress}
            className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
          >
            {generatingAddress ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating Address...</span>
              </span>
            ) : (
              selectedPaymentMethod === 'crypto' ? 'Generate Payment Address' : `Pay with ${selectedPaymentMethod === 'google-pay' ? 'Google Pay' : 'Apple Pay'}`
            )}
          </Button>
        )}
        
        {cryptoAddress && (
          <Button
            onClick={completeTransaction}
            className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
          >
            I've Sent the Payment
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="w-full"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default AlternativePaymentMethods;
