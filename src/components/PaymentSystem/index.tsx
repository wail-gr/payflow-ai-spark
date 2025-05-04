
import React from 'react';
import { PaymentProvider } from './PaymentContext';
import PaymentContainer from './PaymentContainer';

const PaymentSystem: React.FC = () => {
  return (
    <PaymentProvider>
      <PaymentContainer />
    </PaymentProvider>
  );
};

export default PaymentSystem;
