
import React, { useState } from 'react';
import { usePayment } from './PaymentContext';
import PaymentHeader from './PaymentHeader';
import PaymentDetails from './PaymentDetails';
import PaymentMethodSelection from './PaymentMethodSelection';
import AlternativePaymentMethods from './AlternativePaymentMethods';
import PaymentProcessing from './PaymentProcessing';
import PaymentConfirmation from './PaymentConfirmation';
import UserAuth from './UserAuth';
import DonationHistory from './DonationHistory';
import UserMenu from './UserMenu';

const PaymentContainer: React.FC = () => {
  const { step, processing, transactionComplete } = usePayment();
  const [showAuth, setShowAuth] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const renderStepContent = () => {
    if (showAuth) {
      return <UserAuth onClose={() => setShowAuth(false)} />;
    }
    
    if (showHistory) {
      return <DonationHistory onClose={() => setShowHistory(false)} />;
    }
    
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
      {/* User Menu - Fixed position at top */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <UserMenu 
          onShowAuth={() => setShowAuth(true)}
          onShowHistory={() => setShowHistory(true)}
        />
      </div>
      
      <div className="p-6">
        {!showAuth && !showHistory && <PaymentHeader />}
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PaymentContainer;
