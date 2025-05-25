
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

  const handleMethodSelect = (method: 'google-pay' | 'apple-pay' | 'crypto' | 'paypal') => {
    setSelectedPaymentMethod(method);
  };

  const handleContinue = () => {
    if (selectedPaymentMethod) {
      nextStep();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        {/* Google Pay Option */}
        <div 
          className={`p-4 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'google-pay' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('google-pay')}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 2L2 12l10 10 10-10z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="font-medium text-xs text-center">Google Pay</p>
          </div>
        </div>

        {/* Apple Pay Option */}
        <div 
          className={`p-4 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'apple-pay' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('apple-pay')}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#8B5CF6" strokeWidth="2">
                <path d="M12 3C9.5 3 7.5 4.5 7 6.5C8.5 7 9.5 8.5 9.5 10C9.5 11.5 8.5 13 7 13.5C7.5 15.5 9.5 17 12 17C14.5 17 16.5 15.5 17 13.5C15.5 13 14.5 11.5 14.5 10C14.5 8.5 15.5 7 17 6.5C16.5 4.5 14.5 3 12 3Z" />
              </svg>
            </div>
            <p className="font-medium text-xs text-center">Apple Pay</p>
          </div>
        </div>

        {/* PayPal Option */}
        <div 
          className={`p-4 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('paypal')}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#8B5CF6">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.608-.463c-.82-.51-2.093-.51-3.83-.51h-4.115c-.524 0-.968.382-1.05.9L10.85 9.97a.641.641 0 0 0 .633.74h2.705c2.930 0 4.914-.87 5.547-3.32.18-.698.231-1.35.13-1.96-.068-.41-.181-.744-.343-1.013z"/>
              </svg>
            </div>
            <p className="font-medium text-xs text-center">PayPal</p>
          </div>
        </div>

        {/* Cryptocurrency Option */}
        <div 
          className={`p-4 rounded-xl border border-gray-200 cursor-pointer payment-method-card
                    ${selectedPaymentMethod === 'crypto' ? 'active' : ''}`}
          onClick={() => handleMethodSelect('crypto')}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-payment-purple/10 flex items-center justify-center">
              <BitcoinIcon className="text-payment-purple" size={20} />
            </div>
            <p className="font-medium text-xs text-center">Cryptocurrency</p>
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
