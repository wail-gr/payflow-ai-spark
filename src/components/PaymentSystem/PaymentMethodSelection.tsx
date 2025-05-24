
import React from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { BitcoinIcon } from 'lucide-react';

const PaymentMethodSelection: React.FC = () => {
  const { 
    selectedPaymentMethod, 
    setSelectedPaymentMethod, 
    nextStep, 
    prevStep 
  } = usePayment();

  const handleMethodSelect = (method: 'google-pay' | 'apple-pay' | 'crypto') => {
    setSelectedPaymentMethod(method);
  };

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 gap-4">
        {/* Google Pay Option */}
        <div 
          className={`p-5 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'google-pay' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('google-pay')}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 2L2 12l10 10 10-10z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="font-medium text-sm text-center">Google Pay</p>
          </div>
        </div>

        {/* Apple Pay Option */}
        <div 
          className={`p-5 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'apple-pay' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('apple-pay')}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 3C9.5 3 7.5 4.5 7 6.5C8.5 7 9.5 8.5 9.5 10C9.5 11.5 8.5 13 7 13.5C7.5 15.5 9.5 17 12 17C14.5 17 16.5 15.5 17 13.5C15.5 13 14.5 11.5 14.5 10C14.5 8.5 15.5 7 17 6.5C16.5 4.5 14.5 3 12 3Z" />
              </svg>
            </div>
            <p className="font-medium text-sm text-center">Apple Pay</p>
          </div>
        </div>

        {/* Cryptocurrency Option */}
        <div 
          className={`p-5 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'crypto' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('crypto')}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <BitcoinIcon className="text-payment-purple" size={24} />
            </div>
            <p className="font-medium text-sm text-center">Cryptocurrency</p>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button 
          onClick={handleContinue}
          disabled={!selectedPaymentMethod}
          className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
        >
          Continue
        </Button>
        
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

export default PaymentMethodSelection;
