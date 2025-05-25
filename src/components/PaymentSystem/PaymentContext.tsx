
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our payment context
type PaymentMethod = 'google-pay' | 'apple-pay' | 'crypto' | 'paypal';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  date: Date;
  anonymous: boolean;
  transactionId: string;
}

interface PaymentContextType {
  amount: number;
  setAmount: (amount: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  selectedPaymentMethod: PaymentMethod | null;
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void;
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
  // Anonymous donation history
  donations: Donation[];
  showShareButton: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

// Simple encryption utility for sensitive data
const encryptData = (data: string): string => {
  // Simple Base64 encoding with salt for demo purposes
  // In production, use proper encryption libraries
  const salt = 'payment_salt_2024';
  return btoa(salt + data);
};

const decryptData = (encryptedData: string): string => {
  try {
    const salt = 'payment_salt_2024';
    const decoded = atob(encryptedData);
    return decoded.replace(salt, '');
  } catch {
    return '';
  }
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
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showShareButton, setShowShareButton] = useState<boolean>(false);

  // Load donation history from encrypted localStorage on mount
  useEffect(() => {
    const savedDonations = localStorage.getItem('encrypted_payment_donations');
    if (savedDonations) {
      try {
        const decryptedData = decryptData(savedDonations);
        const parsed = JSON.parse(decryptedData);
        // Convert date strings back to Date objects
        const donationsWithDates = parsed.map((donation: any) => ({
          ...donation,
          date: new Date(donation.date)
        }));
        setDonations(donationsWithDates);
      } catch (error) {
        console.error('Error loading donations from localStorage:', error);
      }
    }
  }, []);

  // Save donations to encrypted localStorage whenever donations change
  const saveDonationsToCache = (newDonations: Donation[]) => {
    try {
      const encryptedData = encryptData(JSON.stringify(newDonations));
      localStorage.setItem('encrypted_payment_donations', encryptedData);
    } catch (error) {
      console.error('Error saving donations to localStorage:', error);
    }
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
    setProcessing(false);
    setTransactionComplete(false);
    setTransactionId(null);
    setShowShareButton(false);
  };

  const completeTransaction = () => {
    // Generate a random transaction ID
    const randomId = 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase();
    setTransactionId(randomId);
    setTransactionComplete(true);
    setShowShareButton(true);
    
    // Add to donation history and save to encrypted cache
    if (selectedPaymentMethod) {
      const newDonation: Donation = {
        id: randomId,
        amount,
        currency,
        method: selectedPaymentMethod,
        date: new Date(),
        anonymous: true, // Always anonymous now
        transactionId: randomId
      };
      const updatedDonations = [newDonation, ...donations];
      setDonations(updatedDonations);
      saveDonationsToCache(updatedDonations);
    }
    
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
      
      setTimeout(() => {
        setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
      }, 800);
    }
  }, [amount, selectedPaymentMethod]);

  useEffect(() => {
    setIsSecure(true);
    const securityCheck = setInterval(() => {
      setIsSecure(Math.random() > 0.02);
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
        donations,
        showShareButton,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
