
import React from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { Bitcoin } from 'lucide-react';

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
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
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
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="#000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
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
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="#003087">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.608-.463c-.82-.51-2.093-.51-3.83-.51h-4.115c-.524 0-.968.382-1.05.9L10.85 9.97a.641.641 0 0 0 .633.74h2.705c2.930 0 4.914-.87 5.547-3.32.18-.698.231-1.35.13-1.96-.068-.41-.181-.744-.343-1.013z"/>
                <path d="M6.538 19.943h3.94a.641.641 0 0 0 .633-.74l.848-5.376a.641.641 0 0 1 .633-.546h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.15.054-.294.077-.437C24.49 4.067 24.196 2.797 23.186 1.647 22.074.38 20.073-.163 17.503-.163h-7.46c-.524 0-.972.382-1.054.9L5.883 19.203a.641.641 0 0 0 .655.74z" fill="#009cde"/>
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
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <Bitcoin className="text-orange-500" size={32} />
            </div>
            <p className="font-medium text-xs text-center">Bitcoin</p>
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
