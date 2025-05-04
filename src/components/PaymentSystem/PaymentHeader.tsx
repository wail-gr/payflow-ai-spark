
import React from 'react';
import { usePayment } from './PaymentContext';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';

const PaymentHeader: React.FC = () => {
  const { step, isSecure } = usePayment();
  
  return (
    <div className="w-full mb-6 space-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-payment-purple to-payment-teal bg-clip-text text-transparent">
          {step === 1 && "Payment Details"}
          {step === 2 && "Select Payment Method"}
          {step === 3 && "Complete Payment"}
          {step === 4 && "Payment Confirmation"}
        </h1>
        
        <div 
          className={`flex items-center space-x-1 px-2 py-1 rounded-full 
                    ${isSecure ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'} 
                    secure-badge animate-fade-in`}
        >
          {isSecure ? (
            <>
              <ShieldCheckIcon size={16} className="animate-pulse-slow" />
              <span className="text-xs font-medium">SSL Secure</span>
            </>
          ) : (
            <>
              <LockIcon size={16} className="animate-pulse-slow" />
              <span className="text-xs font-medium">Checking security...</span>
            </>
          )}
        </div>
      </div>
      
      <div className="w-full flex justify-between mb-8 relative">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`z-10 w-8 h-8 rounded-full flex items-center justify-center 
                       text-xs font-medium transition-all duration-500 
                       ${step >= s 
                         ? 'bg-gradient-to-r from-payment-purple to-payment-teal text-white' 
                         : 'bg-gray-100 text-gray-400'}`}
          >
            {s}
          </div>
        ))}
        
        {/* Progress bar */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100">
          <div 
            className="h-0.5 bg-gradient-to-r from-payment-purple to-payment-teal transition-all duration-500"
            style={{ width: `${(step - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
