
import React, { useState } from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Calendar, User, Shield } from 'lucide-react';

const CardPaymentForm: React.FC = () => {
  const { 
    cardDetails, 
    updateCardDetails, 
    amount, 
    currency, 
    prevStep,
    setProcessing,
    completeTransaction
  } = usePayment();
  
  const [errors, setErrors] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Split into groups of 4 and join with spaces
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiry = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Split after first 2 digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };
  
  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    
    updateCardDetails(field, formattedValue);
    
    // Clear error when user types
    setErrors(prev => ({ ...prev, [field]: '' }));
  };
  
  const validateForm = (): boolean => {
    const newErrors = {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
    };
    
    let isValid = true;
    
    // Card number validation (16 digits)
    if (cardDetails.number.replace(/\s/g, '').length !== 16) {
      newErrors.number = 'Please enter a valid 16-digit card number';
      isValid = false;
    }
    
    // Card name validation
    if (!cardDetails.name.trim()) {
      newErrors.name = 'Please enter the cardholder name';
      isValid = false;
    }
    
    // Expiry validation (MM/YY)
    const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryPattern.test(cardDetails.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    } else {
      // Check if card is not expired
      const [month, year] = cardDetails.expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiryDate < new Date()) {
        newErrors.expiry = 'This card has expired';
        isValid = false;
      }
    }
    
    // CVC validation (3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvc)) {
      newErrors.cvc = 'Please enter a valid 3-digit CVC';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Process payment
      setProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        completeTransaction();
      }, 2000);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-4 bg-primary-50 rounded-lg">
        <p className="text-sm font-medium">
          Amount: <span className="font-bold">{currency} {amount.toFixed(2)}</span>
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Card Number Input */}
        <div className="space-y-2">
          <label htmlFor="cardNumber" className="block text-sm font-medium">
            Card Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CreditCard size={18} className="text-gray-400" />
            </div>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="pl-10 payment-input"
              value={cardDetails.number}
              onChange={(e) => handleInputChange('number', e.target.value)}
              autoComplete="cc-number"
            />
          </div>
          {errors.number && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.number}</p>}
        </div>
        
        {/* Card Name Input */}
        <div className="space-y-2">
          <label htmlFor="cardName" className="block text-sm font-medium">
            Cardholder Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <Input
              id="cardName"
              type="text"
              placeholder="John Doe"
              className="pl-10 payment-input"
              value={cardDetails.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              autoComplete="cc-name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.name}</p>}
        </div>
        
        {/* Expiry Date and CVC */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="expiry" className="block text-sm font-medium">
              Expiry Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                className="pl-10 payment-input"
                value={cardDetails.expiry}
                onChange={(e) => handleInputChange('expiry', e.target.value)}
                autoComplete="cc-exp"
              />
            </div>
            {errors.expiry && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.expiry}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cvc" className="block text-sm font-medium">
              CVC
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield size={18} className="text-gray-400" />
              </div>
              <Input
                id="cvc"
                type="text"
                placeholder="123"
                className="pl-10 payment-input"
                value={cardDetails.cvc}
                onChange={(e) => handleInputChange('cvc', e.target.value)}
                autoComplete="cc-csc"
              />
            </div>
            {errors.cvc && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.cvc}</p>}
          </div>
        </div>
      </div>
      
      <div className="pt-4 space-y-3">
        <Button 
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
        >
          Pay {currency} {amount.toFixed(2)}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="w-full"
        >
          Back
        </Button>
      </div>
      
      <div className="flex items-center justify-center space-x-2 pt-2">
        <ShieldCheckIcon size={16} className="text-gray-500" />
        <p className="text-xs text-gray-500">
          Your payment information is secure with SSL encryption
        </p>
      </div>
    </div>
  );
};

// Icon component for shield check
const ShieldCheckIcon = ({ size = 24, className = '' }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default CardPaymentForm;
