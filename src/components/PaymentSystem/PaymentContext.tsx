
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our payment context
type PaymentMethod = 'card' | 'google-pay' | 'apple-pay' | 'crypto';

interface PaymentContextType {
  amount: number;
  setAmount: (amount: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  selectedPaymentMethod: PaymentMethod | null;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
  cardDetails: {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  };
  updateCardDetails: (field: string, value: string) => void;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  resetPayment: () => void;
  processing: boolean;
  setProcessing: (processing: boolean) => void;
  transactionComplete: boolean;
  completeTransaction: () => void;
  transactionId: string | null;
  aiSuggestion: string | null;
  isSecure: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('USD');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<number>(1);
  const [processing, setProcessing] = useState<boolean>(false);
  const [transactionComplete, setTransactionComplete] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isSecure, setIsSecure] = useState<boolean>(true);
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const updateCardDetails = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetPayment = () => {
    setStep(1);
    setSelectedPaymentMethod(null);
    setCardDetails({
      number: '',
      name: '',
      expiry: '',
      cvc: '',
    });
    setProcessing(false);
    setTransactionComplete(false);
    setTransactionId(null);
  };

  const completeTransaction = () => {
    // Generate a random transaction ID
    const randomId = 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase();
    setTransactionId(randomId);
    setTransactionComplete(true);
    toast.success("Payment successful!", {
      description: `Transaction ID: ${randomId}`,
    });
  };

  // Simulate AI suggestions based on payment amount and method
  useEffect(() => {
    if (amount > 0 && selectedPaymentMethod) {
      const suggestions = [
        "This transaction appears to be for a subscription service.",
        "Based on this amount, this might be a utility payment.",
        "This payment looks like a regular monthly expense.",
        "This could be categorized as a retail purchase.",
        "This amount suggests this is a premium service payment.",
      ];
      
      // Simulating AI analysis
      setTimeout(() => {
        setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      }, 800);
    }
  }, [amount, selectedPaymentMethod]);

  // Simulating SSL security check
  useEffect(() => {
    setIsSecure(true);
    const securityCheck = setInterval(() => {
      // This simulates periodic security checks
      setIsSecure(Math.random() > 0.02); // 98% chance of being secure
    }, 30000);

    return () => clearInterval(securityCheck);
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        amount,
        setAmount,
        currency,
        setCurrency,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        cardDetails,
        updateCardDetails,
        step,
        nextStep,
        prevStep,
        resetPayment,
        processing,
        setProcessing,
        transactionComplete,
        completeTransaction,
        transactionId,
        aiSuggestion,
        isSecure,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
