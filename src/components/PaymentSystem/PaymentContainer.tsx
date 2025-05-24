
import React from 'react';
import { usePayment } from './PaymentContext';
import PaymentHeader from './PaymentHeader';
import PaymentDetails from './PaymentDetails';
import PaymentMethodSelection from './PaymentMethodSelection';
import AlternativePaymentMethods from './AlternativePaymentMethods';
import PaymentProcessing from './PaymentProcessing';
import PaymentConfirmation from './PaymentConfirmation';

const PaymentContainer: React.FC = () => {
  const { step, processing, transactionComplete } = usePayment();
  
  const renderStepContent = () => {
    if (processing) {
      return <PaymentProcessing />;
    }
    
    if (transactionComplete) {
      return <PaymentConfirmation />;
    }
    
    switch (step) {
      case 1:
        return <PaymentDetails />;
      case 2:
        return <PaymentMethodSelection />;
      case 3:
        return <AlternativePaymentMethods />;
      default:
        return <PaymentDetails />;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full mx-auto border border-gray-100">
      <div className="p-6">
        <PaymentHeader />
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PaymentContainer;
