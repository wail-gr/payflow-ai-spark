
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define types for our payment context
type PaymentMethod = 'google-pay' | 'apple-pay' | 'crypto' | 'paypal';

interface User {
  id: string;
  email: string;
  name: string;
}

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
  // User authentication
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  // Anonymous donation
  donateAnonymously: boolean;
  setDonateAnonymously: (anonymous: boolean) => void;
  // Donation history
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
  const [user, setUser] = useState<User | null>(null);
  const [donateAnonymously, setDonateAnonymously] = useState<boolean>(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [showShareButton, setShowShareButton] = useState<boolean>(false);

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
    setDonateAnonymously(false);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - replace with actual authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      setUser(mockUser);
      
      // Load mock donation history
      const mockDonations: Donation[] = [
        {
          id: 'TXN001',
          amount: 25.00,
          currency: 'USD',
          method: 'paypal',
          date: new Date('2024-05-20'),
          anonymous: false,
          transactionId: 'TXN001ABC'
        },
        {
          id: 'TXN002',
          amount: 50.00,
          currency: 'USD',
          method: 'google-pay',
          date: new Date('2024-05-15'),
          anonymous: true,
          transactionId: 'TXN002DEF'
        }
      ];
      setDonations(mockDonations);
      
      toast.success('Login successful!');
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate registration - replace with actual registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name
      };
      setUser(newUser);
      setDonations([]);
      toast.success('Registration successful!');
      return true;
    }
    
    toast.error('Registration failed');
    return false;
  };

  const logout = () => {
    setUser(null);
    setDonations([]);
    toast.success('Logged out successfully');
  };

  const completeTransaction = () => {
    // Generate a random transaction ID
    const randomId = 'TXN' + Math.random().toString(36).substring(2, 12).toUpperCase();
    setTransactionId(randomId);
    setTransactionComplete(true);
    setShowShareButton(true);
    
    // Add to donation history if user is logged in
    if (user && selectedPaymentMethod) {
      const newDonation: Donation = {
        id: randomId,
        amount,
        currency,
        method: selectedPaymentMethod,
        date: new Date(),
        anonymous: donateAnonymously,
        transactionId: randomId
      };
      setDonations(prev => [newDonation, ...prev]);
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
        user,
        login,
        logout,
        register,
        donateAnonymously,
        setDonateAnonymously,
        donations,
        showShareButton,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
