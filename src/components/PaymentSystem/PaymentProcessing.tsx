
import React, { useEffect } from 'react';
import { usePayment } from './PaymentContext';

const PaymentProcessing: React.FC = () => {
  const { setProcessing } = usePayment();
  
  useEffect(() => {
    // This component will be unmounted when payment is complete
    // We're just centralizing the processing animation here
    return () => {
      setProcessing(false);
    };
  }, [setProcessing]);
  
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10 animate-fade-in">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-payment-purple rounded-full animate-spin border-t-transparent"></div>
      </div>
      
      <h3 className="text-xl font-medium">Processing Payment</h3>
      <p className="text-gray-500 text-center max-w-xs">
        Please don't close this window while we process your payment. This will only take a moment.
      </p>
      
      <div className="w-full max-w-xs h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full loader-bar animate-loader"></div>
      </div>
      
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-payment-purple animate-pulse-slow"></div>
          <span className="text-sm text-gray-500">Verifying payment details</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
          <span className="text-sm text-gray-400">Processing transaction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
          <span className="text-sm text-gray-400">Finalizing payment</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
