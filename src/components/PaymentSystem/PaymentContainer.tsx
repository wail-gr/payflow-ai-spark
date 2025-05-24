
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
import { Button } from '@/components/ui/button';
import { User, History, LogOut } from 'lucide-react';

const PaymentContainer: React.FC = () => {
  const { step, processing, transactionComplete, user, logout } = usePayment();
  const [showAuth, setShowAuth] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const renderStepContent = () => {
    if (showAuth) {
      return <UserAuth />;
    }
    
    if (showHistory) {
      return <DonationHistory />;
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
      <div className="p-6">
        {!showAuth && !showHistory && (
          <div className="flex justify-between items-center mb-6">
            <PaymentHeader />
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowHistory(true)}
                    className="flex items-center space-x-1"
                  >
                    <History size={14} />
                    <span className="hidden sm:inline">History</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuth(true)}
                  className="flex items-center space-x-1"
                >
                  <User size={14} />
                  <span>Login</span>
                </Button>
              )}
            </div>
          </div>
        )}
        
        {(showAuth || showHistory) && (
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAuth(false);
                setShowHistory(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Payment
            </Button>
          </div>
        )}
        
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PaymentContainer;
