
import React from 'react';
import PaymentSystem from '@/components/PaymentSystem';
import { ShieldCheckIcon } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-payment-purple to-payment-teal bg-clip-text text-transparent animate-fade-in">
            AI-Powered Payment System
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto animate-fade-in">
            A secure, modern payment gateway with multiple payment options and SSL encryption.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-fade-in">
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <ShieldCheckIcon size={14} className="text-payment-success" />
              <span className="text-xs font-medium">SSL Secure</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <CreditCardIcon size={14} className="text-payment-purple" />
              <span className="text-xs font-medium">Card Payments</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <WalletIcon size={14} className="text-payment-purple" />
              <span className="text-xs font-medium">Digital Wallets</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <BitcoinIcon size={14} className="text-payment-purple" />
              <span className="text-xs font-medium">Cryptocurrency</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <AiIcon size={14} className="text-payment-teal" />
              <span className="text-xs font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
        
        <PaymentSystem />
        
        <div className="mt-10 text-center text-gray-500 text-xs">
          <p>This is a demonstration of a payment system UI. No real transactions are processed.</p>
          <p>© {new Date().getFullYear()} PayFlow AI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

// Custom icons
const CreditCardIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const WalletIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const BitcoinIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M11.767 19.089c4.924.868 9.646-2.525 10.514-7.545.868-5.02-2.525-9.82-7.449-10.688-4.924-.868-9.646 2.525-10.514 7.545-.868 5.02 2.525 9.82 7.449 10.688z" />
    <path d="M15.429 9.17l-2.94-3.322" />
    <path d="M8.571 14.83l2.94 3.322" />
    <path d="M14.118 15.806l-4.235-7.612" />
  </svg>
);

const AiIcon = ({ size = 24, className = '' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z" />
    <path d="M8.8 10a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0" />
    <path d="M12.8 10a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0" />
  </svg>
);

export default Index;
