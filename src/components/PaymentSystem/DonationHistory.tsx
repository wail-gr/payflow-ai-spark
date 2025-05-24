
import React from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, DollarSign } from 'lucide-react';

interface DonationHistoryProps {
  onClose?: () => void;
}

const DonationHistory: React.FC<DonationHistoryProps> = ({ onClose }) => {
  const { donations, user, resetPayment } = usePayment();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'google-pay': return 'Google Pay';
      case 'apple-pay': return 'Apple Pay';
      case 'paypal': return 'PayPal';
      case 'crypto': return 'Cryptocurrency';
      default: return method;
    }
  };

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose || resetPayment}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        <div>
          <h3 className="text-xl font-semibold">Donation History</h3>
          <p className="text-gray-500 text-sm">Welcome back, {user?.name}!</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-payment-purple/10 to-payment-teal/10 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <DollarSign className="text-payment-purple" size={20} />
          <span className="font-medium">Total Donated</span>
        </div>
        <p className="text-2xl font-bold text-payment-purple">
          ${totalDonated.toFixed(2)} USD
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Recent Donations</h4>
        
        {donations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No donations yet</p>
            <Button
              onClick={resetPayment}
              className="mt-4 bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90"
            >
              Make Your First Donation
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        ${donation.amount.toFixed(2)} {donation.currency}
                      </span>
                      {donation.anonymous && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          Anonymous
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{formatDate(donation.date)}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      via {getMethodName(donation.method)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-50 text-payment-success px-2 py-1 rounded-full text-xs font-medium">
                      Completed
                    </span>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {donation.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
