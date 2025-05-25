
import React, { useState, useEffect } from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, Euro, PoundSterling } from 'lucide-react';

const PaymentDetails: React.FC = () => {
  const { 
    amount, 
    setAmount, 
    currency, 
    setCurrency, 
    nextStep
  } = usePayment();
  
  const [inputAmount, setInputAmount] = useState<string>(amount > 0 ? amount.toString() : '');
  
  useEffect(() => {
    const numAmount = parseFloat(inputAmount) || 0;
    setAmount(numAmount);
  }, [inputAmount, setAmount]);
  
  const quickAmounts = [10, 25, 50, 100];
  
  const handleQuickAmount = (quickAmount: number) => {
    setInputAmount(quickAmount.toString());
  };
  
  const handleContinue = () => {
    if (amount > 0) {
      nextStep();
    }
  };
  
  const getCurrencyIcon = () => {
    switch (currency) {
      case 'USD':
        return <DollarSign size={18} className="text-gray-500" />;
      case 'EUR':
        return <Euro size={18} className="text-gray-500" />;
      case 'GBP':
        return <PoundSterling size={18} className="text-gray-500" />;
      default:
        return <DollarSign size={18} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="amount" className="text-base font-medium">
            Payment Amount
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {getCurrencyIcon()}
            </div>
            <Input
              id="amount"
              type="number"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
              placeholder="0.00"
              className="pl-10 pr-20 text-lg font-semibold payment-input"
              min="0"
              step="0.01"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label className="text-sm text-gray-600">Quick amounts</Label>
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                onClick={() => handleQuickAmount(quickAmount)}
                className="text-sm py-2 hover:bg-payment-purple hover:text-white hover:border-payment-purple transition-all"
              >
                {currency === 'USD' && '$'}{currency === 'EUR' && '€'}{currency === 'GBP' && '£'}{quickAmount}
              </Button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">
              Anonymous Payment
            </Label>
            <p className="text-xs text-gray-500">
              All payments are processed anonymously for your privacy
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          disabled={amount <= 0}
          className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
        >
          Continue to Payment Method
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
