
import React, { useState } from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign } from 'lucide-react';

const PaymentDetails: React.FC = () => {
  const { amount, setAmount, currency, setCurrency, nextStep } = usePayment();
  const [amountError, setAmountError] = useState<string | null>(null);
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value) || value <= 0) {
      setAmountError('Please enter a valid amount');
    } else {
      setAmountError(null);
    }
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleContinue = () => {
    if (amount <= 0) {
      setAmountError('Please enter a valid amount');
      return;
    }
    nextStep();
  };

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'BTC', 'ETH'];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium">
            Payment Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign size={18} className="text-gray-400" />
            </div>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              className="pl-10 text-lg payment-input"
              value={amount || ''}
              onChange={handleAmountChange}
              autoComplete="off"
            />
          </div>
          {amountError && (
            <p className="text-red-500 text-xs mt-1 animate-fade-in">{amountError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="currency" className="block text-sm font-medium">
            Currency
          </label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="payment-input">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr}>
                  {curr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4">
        <Button 
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentDetails;
