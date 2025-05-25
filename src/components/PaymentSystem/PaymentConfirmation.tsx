
import React, { useEffect } from 'react';
import { usePayment } from './PaymentContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';

const PaymentConfirmation: React.FC = () => {
  const { 
    amount, 
    currency, 
    transactionId, 
    resetPayment,
    selectedPaymentMethod,
    aiSuggestion,
    showShareButton
  } = usePayment();

  useEffect(() => {
    const createConfetti = () => {
      const confettiCount = 100;
      const colors = ['#8B5CF6', '#0EA5E9', '#10B981', '#F97316'];
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.setProperty('--confetti-x', Math.random() * 100 + 'vw');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.position = 'fixed';
        confetti.style.top = '-20px';
        confetti.style.left = confetti.style.getPropertyValue('--confetti-x');
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.opacity = `${Math.random() * 0.8 + 0.2}`;
        confetti.style.zIndex = '9999';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, (Math.random() * 3 + 2) * 1000);
      }
    };
    
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes confetti-fall {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    createConfetti();
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const copyToClipboard = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      toast.success('Transaction ID copied to clipboard');
    }
  };

  const handleShare = () => {
    const shareText = `I just supported this! 💝 ${currency} ${amount.toFixed(2)} donated successfully!`;
    
    if (navigator.share) {
      navigator.share({
        title: 'I just made a donation!',
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Share message copied to clipboard!');
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  const paymentMethodName = () => {
    switch (selectedPaymentMethod) {
      case 'google-pay': return 'Google Pay';
      case 'apple-pay': return 'Apple Pay';
      case 'paypal': return 'PayPal';
      case 'crypto': return 'Cryptocurrency';
      default: return 'Payment Method';
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col items-center space-y-4 pb-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle className="text-payment-success" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-center">Payment Successful!</h3>
        <p className="text-gray-500 text-center">
          Your payment of {currency} {amount.toFixed(2)} has been successfully processed.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
        <h4 className="font-medium text-lg">Payment Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">{currency} {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{formatDate(new Date())}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Payment Method</span>
            <span className="font-medium">{paymentMethodName()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <span className="bg-green-50 text-payment-success px-2 py-1 rounded-full text-xs font-medium">
              Completed
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Donation Type</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
              Anonymous
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Transaction ID</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-mono">{transactionId}</span>
              <button 
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-payment-purple transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showShareButton && (
        <div className="space-y-3">
          <Button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-all flex items-center justify-center space-x-2"
          >
            <Share2 size={16} />
            <span>Share: "I just supported this!" 🎉</span>
          </Button>
        </div>
      )}
      
      {aiSuggestion && (
        <div className="bg-payment-purple/5 p-4 rounded-lg border border-payment-purple/20 animate-fade-in">
          <div className="flex items-start space-x-3">
            <div className="bg-payment-purple/10 rounded-full p-2 mt-1">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#8B5CF6" strokeWidth="2" className="ai-icon">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-payment-purple">AI Insight</h4>
              <p className="text-sm text-gray-600 mt-1">{aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="pt-4">
        <Button 
          onClick={resetPayment}
          className="w-full bg-gradient-to-r from-payment-purple to-payment-teal hover:opacity-90 transition-all"
        >
          Make Another Payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
